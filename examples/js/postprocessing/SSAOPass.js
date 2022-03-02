( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ), require( './Pass.js' ), require( '../math/SimplexNoise.js' ), require( '../shaders/SSAOShader.js' ), require( '../shaders/CopyShader.js' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three', './Pass', '../math/SimplexNoise', '../shaders/SSAOShader', '../shaders/CopyShader' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE, global.THREE, global.THREE ) );

	} )( this, ( function ( exports, three, Pass_js, SimplexNoise_js, SSAOShader_js, CopyShader_js ) {

		'use strict';

		class SSAOPass extends Pass_js.Pass {

	  constructor( scene, camera, width, height ) {

	    super();
	    this.width = width !== undefined ? width : 512;
	    this.height = height !== undefined ? height : 512;
	    this.clear = true;
	    this.camera = camera;
	    this.scene = scene;
	    this.kernelRadius = 8;
	    this.kernelSize = 32;
	    this.kernel = [];
	    this.noiseTexture = null;
	    this.output = 0;
	    this.minDistance = 0.005;
	    this.maxDistance = 0.1;
	    this._visibilityCache = new Map(); //

	    this.generateSampleKernel();
	    this.generateRandomKernelRotations(); // beauty render target

	    const depthTexture = new three.DepthTexture();
	    depthTexture.format = three.DepthStencilFormat;
	    depthTexture.type = three.UnsignedInt248Type;
	    this.beautyRenderTarget = new three.WebGLRenderTarget( this.width, this.height ); // normal render target with depth buffer

	    this.normalRenderTarget = new three.WebGLRenderTarget( this.width, this.height, {
	      minFilter: three.NearestFilter,
	      magFilter: three.NearestFilter,
	      depthTexture: depthTexture
	    } ); // ssao render target

	    this.ssaoRenderTarget = new three.WebGLRenderTarget( this.width, this.height );
	    this.blurRenderTarget = this.ssaoRenderTarget.clone(); // ssao material

	    if ( SSAOShader_js.SSAOShader === undefined ) {

	      console.error( 'THREE.SSAOPass: The pass relies on SSAOShader.' );

				}

	    this.ssaoMaterial = new three.ShaderMaterial( {
	      defines: Object.assign( {}, SSAOShader_js.SSAOShader.defines ),
	      uniforms: three.UniformsUtils.clone( SSAOShader_js.SSAOShader.uniforms ),
	      vertexShader: SSAOShader_js.SSAOShader.vertexShader,
	      fragmentShader: SSAOShader_js.SSAOShader.fragmentShader,
	      blending: three.NoBlending
	    } );
	    this.ssaoMaterial.uniforms[ 'tDiffuse' ].value = this.beautyRenderTarget.texture;
	    this.ssaoMaterial.uniforms[ 'tNormal' ].value = this.normalRenderTarget.texture;
	    this.ssaoMaterial.uniforms[ 'tDepth' ].value = this.normalRenderTarget.depthTexture;
	    this.ssaoMaterial.uniforms[ 'tNoise' ].value = this.noiseTexture;
	    this.ssaoMaterial.uniforms[ 'kernel' ].value = this.kernel;
	    this.ssaoMaterial.uniforms[ 'cameraNear' ].value = this.camera.near;
	    this.ssaoMaterial.uniforms[ 'cameraFar' ].value = this.camera.far;
	    this.ssaoMaterial.uniforms[ 'resolution' ].value.set( this.width, this.height );
	    this.ssaoMaterial.uniforms[ 'cameraProjectionMatrix' ].value.copy( this.camera.projectionMatrix );
	    this.ssaoMaterial.uniforms[ 'cameraInverseProjectionMatrix' ].value.copy( this.camera.projectionMatrixInverse ); // normal material

	    this.normalMaterial = new three.MeshNormalMaterial();
	    this.normalMaterial.blending = three.NoBlending; // blur material

	    this.blurMaterial = new three.ShaderMaterial( {
	      defines: Object.assign( {}, SSAOShader_js.SSAOBlurShader.defines ),
	      uniforms: three.UniformsUtils.clone( SSAOShader_js.SSAOBlurShader.uniforms ),
	      vertexShader: SSAOShader_js.SSAOBlurShader.vertexShader,
	      fragmentShader: SSAOShader_js.SSAOBlurShader.fragmentShader
	    } );
	    this.blurMaterial.uniforms[ 'tDiffuse' ].value = this.ssaoRenderTarget.texture;
	    this.blurMaterial.uniforms[ 'resolution' ].value.set( this.width, this.height ); // material for rendering the depth

	    this.depthRenderMaterial = new three.ShaderMaterial( {
	      defines: Object.assign( {}, SSAOShader_js.SSAODepthShader.defines ),
	      uniforms: three.UniformsUtils.clone( SSAOShader_js.SSAODepthShader.uniforms ),
	      vertexShader: SSAOShader_js.SSAODepthShader.vertexShader,
	      fragmentShader: SSAOShader_js.SSAODepthShader.fragmentShader,
	      blending: three.NoBlending
	    } );
	    this.depthRenderMaterial.uniforms[ 'tDepth' ].value = this.normalRenderTarget.depthTexture;
	    this.depthRenderMaterial.uniforms[ 'cameraNear' ].value = this.camera.near;
	    this.depthRenderMaterial.uniforms[ 'cameraFar' ].value = this.camera.far; // material for rendering the content of a render target

	    this.copyMaterial = new three.ShaderMaterial( {
	      uniforms: three.UniformsUtils.clone( CopyShader_js.CopyShader.uniforms ),
	      vertexShader: CopyShader_js.CopyShader.vertexShader,
	      fragmentShader: CopyShader_js.CopyShader.fragmentShader,
	      transparent: true,
	      depthTest: false,
	      depthWrite: false,
	      blendSrc: three.DstColorFactor,
	      blendDst: three.ZeroFactor,
	      blendEquation: three.AddEquation,
	      blendSrcAlpha: three.DstAlphaFactor,
	      blendDstAlpha: three.ZeroFactor,
	      blendEquationAlpha: three.AddEquation
	    } );
	    this.fsQuad = new Pass_js.FullScreenQuad( null );
	    this.originalClearColor = new three.Color();

			}

	  dispose() {

	    // dispose render targets
	    this.beautyRenderTarget.dispose();
	    this.normalRenderTarget.dispose();
	    this.ssaoRenderTarget.dispose();
	    this.blurRenderTarget.dispose(); // dispose materials

	    this.normalMaterial.dispose();
	    this.blurMaterial.dispose();
	    this.copyMaterial.dispose();
	    this.depthRenderMaterial.dispose(); // dipsose full screen quad

	    this.fsQuad.dispose();

			}

	  render( renderer, writeBuffer
	  /*, readBuffer, deltaTime, maskActive */
	  ) {

	    if ( renderer.capabilities.isWebGL2 === false ) this.noiseTexture.format = three.LuminanceFormat; // render beauty

	    renderer.setRenderTarget( this.beautyRenderTarget );
	    renderer.clear();
	    renderer.render( this.scene, this.camera ); // render normals and depth (honor only meshes, points and lines do not contribute to SSAO)

	    this.overrideVisibility();
	    this.renderOverride( renderer, this.normalMaterial, this.normalRenderTarget, 0x7777ff, 1.0 );
	    this.restoreVisibility(); // render SSAO

	    this.ssaoMaterial.uniforms[ 'kernelRadius' ].value = this.kernelRadius;
	    this.ssaoMaterial.uniforms[ 'minDistance' ].value = this.minDistance;
	    this.ssaoMaterial.uniforms[ 'maxDistance' ].value = this.maxDistance;
	    this.renderPass( renderer, this.ssaoMaterial, this.ssaoRenderTarget ); // render blur

	    this.renderPass( renderer, this.blurMaterial, this.blurRenderTarget ); // output result to screen

	    switch ( this.output ) {

	      case SSAOPass.OUTPUT.SSAO:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.ssaoRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSAOPass.OUTPUT.Blur:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.blurRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSAOPass.OUTPUT.Beauty:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.beautyRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSAOPass.OUTPUT.Depth:
	        this.renderPass( renderer, this.depthRenderMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSAOPass.OUTPUT.Normal:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.normalRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSAOPass.OUTPUT.Default:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.beautyRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.blurRenderTarget.texture;
	        this.copyMaterial.blending = three.CustomBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      default:
	        console.warn( 'THREE.SSAOPass: Unknown output type.' );

				}

			}

	  renderPass( renderer, passMaterial, renderTarget, clearColor, clearAlpha ) {

	    // save original state
	    renderer.getClearColor( this.originalClearColor );
	    const originalClearAlpha = renderer.getClearAlpha();
	    const originalAutoClear = renderer.autoClear;
	    renderer.setRenderTarget( renderTarget ); // setup pass state

	    renderer.autoClear = false;

	    if ( clearColor !== undefined && clearColor !== null ) {

	      renderer.setClearColor( clearColor );
	      renderer.setClearAlpha( clearAlpha || 0.0 );
	      renderer.clear();

				}

	    this.fsQuad.material = passMaterial;
	    this.fsQuad.render( renderer ); // restore original state

	    renderer.autoClear = originalAutoClear;
	    renderer.setClearColor( this.originalClearColor );
	    renderer.setClearAlpha( originalClearAlpha );

			}

	  renderOverride( renderer, overrideMaterial, renderTarget, clearColor, clearAlpha ) {

	    renderer.getClearColor( this.originalClearColor );
	    const originalClearAlpha = renderer.getClearAlpha();
	    const originalAutoClear = renderer.autoClear;
	    renderer.setRenderTarget( renderTarget );
	    renderer.autoClear = false;
	    clearColor = overrideMaterial.clearColor || clearColor;
	    clearAlpha = overrideMaterial.clearAlpha || clearAlpha;

	    if ( clearColor !== undefined && clearColor !== null ) {

	      renderer.setClearColor( clearColor );
	      renderer.setClearAlpha( clearAlpha || 0.0 );
	      renderer.clear();

				}

	    this.scene.overrideMaterial = overrideMaterial;
	    renderer.render( this.scene, this.camera );
	    this.scene.overrideMaterial = null; // restore original state

	    renderer.autoClear = originalAutoClear;
	    renderer.setClearColor( this.originalClearColor );
	    renderer.setClearAlpha( originalClearAlpha );

			}

	  setSize( width, height ) {

	    this.width = width;
	    this.height = height;
	    this.beautyRenderTarget.setSize( width, height );
	    this.ssaoRenderTarget.setSize( width, height );
	    this.normalRenderTarget.setSize( width, height );
	    this.blurRenderTarget.setSize( width, height );
	    this.ssaoMaterial.uniforms[ 'resolution' ].value.set( width, height );
	    this.ssaoMaterial.uniforms[ 'cameraProjectionMatrix' ].value.copy( this.camera.projectionMatrix );
	    this.ssaoMaterial.uniforms[ 'cameraInverseProjectionMatrix' ].value.copy( this.camera.projectionMatrixInverse );
	    this.blurMaterial.uniforms[ 'resolution' ].value.set( width, height );

			}

	  generateSampleKernel() {

	    const kernelSize = this.kernelSize;
	    const kernel = this.kernel;

	    for ( let i = 0; i < kernelSize; i ++ ) {

	      const sample = new three.Vector3();
	      sample.x = Math.random() * 2 - 1;
	      sample.y = Math.random() * 2 - 1;
	      sample.z = Math.random();
	      sample.normalize();
	      let scale = i / kernelSize;
	      scale = three.MathUtils.lerp( 0.1, 1, scale * scale );
	      sample.multiplyScalar( scale );
	      kernel.push( sample );

				}

			}

	  generateRandomKernelRotations() {

	    const width = 4,
	          height = 4;

	    if ( SimplexNoise_js.SimplexNoise === undefined ) {

	      console.error( 'THREE.SSAOPass: The pass relies on SimplexNoise.' );

				}

	    const simplex = new SimplexNoise_js.SimplexNoise();
	    const size = width * height;
	    const data = new Float32Array( size );

	    for ( let i = 0; i < size; i ++ ) {

	      const x = Math.random() * 2 - 1;
	      const y = Math.random() * 2 - 1;
	      const z = 0;
	      data[ i ] = simplex.noise3d( x, y, z );

				}

	    this.noiseTexture = new three.DataTexture( data, width, height, three.RedFormat, three.FloatType );
	    this.noiseTexture.wrapS = three.RepeatWrapping;
	    this.noiseTexture.wrapT = three.RepeatWrapping;
	    this.noiseTexture.needsUpdate = true;

			}

	  overrideVisibility() {

	    const scene = this.scene;
	    const cache = this._visibilityCache;
	    scene.traverse( function ( object ) {

	      cache.set( object, object.visible );
	      if ( object.isPoints || object.isLine ) object.visible = false;

				} );

			}

	  restoreVisibility() {

	    const scene = this.scene;
	    const cache = this._visibilityCache;
	    scene.traverse( function ( object ) {

	      const visible = cache.get( object );
	      object.visible = visible;

				} );
	    cache.clear();

			}

		}

		SSAOPass.OUTPUT = {
	  'Default': 0,
	  'SSAO': 1,
	  'Blur': 2,
	  'Beauty': 3,
	  'Depth': 4,
	  'Normal': 5
		};

		exports.SSAOPass = SSAOPass;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
