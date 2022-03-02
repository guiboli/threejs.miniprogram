( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ), require( './Pass.js' ), require( '../shaders/SSRrShader.js' ), require( '../shaders/CopyShader.js' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three', './Pass', '../shaders/SSRrShader', '../shaders/CopyShader' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE, global.THREE ) );

	} )( this, ( function ( exports, three, Pass_js, SSRrShader_js, CopyShader_js ) {

		'use strict';

		class SSRrPass extends Pass_js.Pass {

	  constructor( {
	    renderer,
	    scene,
	    camera,
	    width,
	    height,
	    selects
	  } ) {

	    super();
	    this.width = width !== undefined ? width : 512;
	    this.height = height !== undefined ? height : 512;
	    this.clear = true;
	    this.renderer = renderer;
	    this.scene = scene;
	    this.camera = camera;
	    this.output = 0; // this.output = 1;

	    this.ior = SSRrShader_js.SSRrShader.uniforms.ior.value;
	    this.maxDistance = SSRrShader_js.SSRrShader.uniforms.maxDistance.value;
	    this.surfDist = SSRrShader_js.SSRrShader.uniforms.surfDist.value;
	    this.tempColor = new three.Color();
	    this.selects = selects;
	    this._specular = SSRrShader_js.SSRrShader.defines.SPECULAR;
	    Object.defineProperty( this, 'specular', {
	      get() {

	        return this._specular;

					},

	      set( val ) {

	        if ( this._specular === val ) return;
	        this._specular = val;
	        this.ssrrMaterial.defines.SPECULAR = val;
	        this.ssrrMaterial.needsUpdate = true;

					}

	    } );
	    this._fillHole = SSRrShader_js.SSRrShader.defines.FILL_HOLE;
	    Object.defineProperty( this, 'fillHole', {
	      get() {

	        return this._fillHole;

					},

	      set( val ) {

	        if ( this._fillHole === val ) return;
	        this._fillHole = val;
	        this.ssrrMaterial.defines.FILL_HOLE = val;
	        this.ssrrMaterial.needsUpdate = true;

					}

	    } );
	    this._infiniteThick = SSRrShader_js.SSRrShader.defines.INFINITE_THICK;
	    Object.defineProperty( this, 'infiniteThick', {
	      get() {

	        return this._infiniteThick;

					},

	      set( val ) {

	        if ( this._infiniteThick === val ) return;
	        this._infiniteThick = val;
	        this.ssrrMaterial.defines.INFINITE_THICK = val;
	        this.ssrrMaterial.needsUpdate = true;

					}

	    } ); // beauty render target with depth buffer

	    const depthTexture = new three.DepthTexture();
	    depthTexture.type = three.UnsignedShortType;
	    depthTexture.minFilter = three.NearestFilter;
	    depthTexture.magFilter = three.NearestFilter;
	    this.beautyRenderTarget = new three.WebGLRenderTarget( this.width, this.height, {
	      minFilter: three.NearestFilter,
	      magFilter: three.NearestFilter,
	      format: three.RGBAFormat,
	      depthTexture: depthTexture,
	      depthBuffer: true
	    } );
	    this.specularRenderTarget = new three.WebGLRenderTarget( this.width, this.height, {
	      // TODO: Can merge with refractiveRenderTarget?
	      minFilter: three.NearestFilter,
	      magFilter: three.NearestFilter,
	      format: three.RGBAFormat
	    } ); // normalSelects render target

	    const depthTextureSelects = new three.DepthTexture();
	    depthTextureSelects.type = three.UnsignedShortType;
	    depthTextureSelects.minFilter = three.NearestFilter;
	    depthTextureSelects.magFilter = three.NearestFilter;
	    this.normalSelectsRenderTarget = new three.WebGLRenderTarget( this.width, this.height, {
	      minFilter: three.NearestFilter,
	      magFilter: three.NearestFilter,
	      format: three.RGBAFormat,
	      type: three.HalfFloatType,
	      depthTexture: depthTextureSelects,
	      depthBuffer: true
	    } ); // refractive render target

	    this.refractiveRenderTarget = new three.WebGLRenderTarget( this.width, this.height, {
	      minFilter: three.NearestFilter,
	      magFilter: three.NearestFilter,
	      format: three.RGBAFormat
	    } ); // ssrr render target

	    this.ssrrRenderTarget = new three.WebGLRenderTarget( this.width, this.height, {
	      minFilter: three.NearestFilter,
	      magFilter: three.NearestFilter,
	      format: three.RGBAFormat
	    } ); // ssrr material

	    if ( SSRrShader_js.SSRrShader === undefined ) {

	      console.error( 'THREE.SSRrPass: The pass relies on SSRrShader.' );

				}

	    this.ssrrMaterial = new three.ShaderMaterial( {
	      defines: Object.assign( {}, SSRrShader_js.SSRrShader.defines, {
	        MAX_STEP: Math.sqrt( this.width * this.width + this.height * this.height )
	      } ),
	      uniforms: three.UniformsUtils.clone( SSRrShader_js.SSRrShader.uniforms ),
	      vertexShader: SSRrShader_js.SSRrShader.vertexShader,
	      fragmentShader: SSRrShader_js.SSRrShader.fragmentShader,
	      blending: three.NoBlending
	    } );
	    this.ssrrMaterial.uniforms[ 'tDiffuse' ].value = this.beautyRenderTarget.texture;
	    this.ssrrMaterial.uniforms[ 'tSpecular' ].value = this.specularRenderTarget.texture;
	    this.ssrrMaterial.uniforms[ 'tNormalSelects' ].value = this.normalSelectsRenderTarget.texture;
	    this.ssrrMaterial.needsUpdate = true;
	    this.ssrrMaterial.uniforms[ 'tRefractive' ].value = this.refractiveRenderTarget.texture;
	    this.ssrrMaterial.uniforms[ 'tDepth' ].value = this.beautyRenderTarget.depthTexture;
	    this.ssrrMaterial.uniforms[ 'tDepthSelects' ].value = this.normalSelectsRenderTarget.depthTexture;
	    this.ssrrMaterial.uniforms[ 'cameraNear' ].value = this.camera.near;
	    this.ssrrMaterial.uniforms[ 'cameraFar' ].value = this.camera.far;
	    this.ssrrMaterial.uniforms[ 'resolution' ].value.set( this.width, this.height );
	    this.ssrrMaterial.uniforms[ 'cameraProjectionMatrix' ].value.copy( this.camera.projectionMatrix );
	    this.ssrrMaterial.uniforms[ 'cameraInverseProjectionMatrix' ].value.copy( this.camera.projectionMatrixInverse ); // normal material

	    this.normalMaterial = new three.MeshNormalMaterial();
	    this.normalMaterial.blending = three.NoBlending; // refractiveOn material

	    this.refractiveOnMaterial = new three.MeshBasicMaterial( {
	      color: 'white'
	    } ); // refractiveOff material

	    this.refractiveOffMaterial = new three.MeshBasicMaterial( {
	      color: 'black'
	    } ); // specular material

	    this.specularMaterial = new three.MeshStandardMaterial( {
	      color: 'black',
	      metalness: 0,
	      roughness: .2
	    } ); // material for rendering the depth

	    this.depthRenderMaterial = new three.ShaderMaterial( {
	      defines: Object.assign( {}, SSRrShader_js.SSRrDepthShader.defines ),
	      uniforms: three.UniformsUtils.clone( SSRrShader_js.SSRrDepthShader.uniforms ),
	      vertexShader: SSRrShader_js.SSRrDepthShader.vertexShader,
	      fragmentShader: SSRrShader_js.SSRrDepthShader.fragmentShader,
	      blending: three.NoBlending
	    } );
	    this.depthRenderMaterial.uniforms[ 'tDepth' ].value = this.beautyRenderTarget.depthTexture;
	    this.depthRenderMaterial.uniforms[ 'cameraNear' ].value = this.camera.near;
	    this.depthRenderMaterial.uniforms[ 'cameraFar' ].value = this.camera.far; // material for rendering the content of a render target

	    this.copyMaterial = new three.ShaderMaterial( {
	      uniforms: three.UniformsUtils.clone( CopyShader_js.CopyShader.uniforms ),
	      vertexShader: CopyShader_js.CopyShader.vertexShader,
	      fragmentShader: CopyShader_js.CopyShader.fragmentShader,
	      transparent: true,
	      depthTest: false,
	      depthWrite: false,
	      blendSrc: three.SrcAlphaFactor,
	      blendDst: three.OneMinusSrcAlphaFactor,
	      blendEquation: three.AddEquation,
	      blendSrcAlpha: three.SrcAlphaFactor,
	      blendDstAlpha: three.OneMinusSrcAlphaFactor,
	      blendEquationAlpha: three.AddEquation // premultipliedAlpha:true,

	    } );
	    this.fsQuad = new Pass_js.FullScreenQuad( null );
	    this.originalClearColor = new three.Color();

			}

	  dispose() {

	    // dispose render targets
	    this.beautyRenderTarget.dispose();
	    this.specularRenderTarget.dispose();
	    this.normalSelectsRenderTarget.dispose();
	    this.refractiveRenderTarget.dispose();
	    this.ssrrRenderTarget.dispose(); // dispose materials

	    this.normalMaterial.dispose();
	    this.refractiveOnMaterial.dispose();
	    this.refractiveOffMaterial.dispose();
	    this.copyMaterial.dispose();
	    this.depthRenderMaterial.dispose(); // dipsose full screen quad

	    this.fsQuad.dispose();

			}

	  render( renderer, writeBuffer
	  /*, readBuffer, deltaTime, maskActive */
	  ) {

	    // render beauty and depth
	    renderer.setRenderTarget( this.beautyRenderTarget );
	    renderer.clear();
	    this.scene.children.forEach( child => {

	      if ( this.selects.includes( child ) ) {

	        child.visible = false;

					} else {

	        child.visible = true;

					}

				} );
	    renderer.render( this.scene, this.camera );
	    renderer.setRenderTarget( this.specularRenderTarget );
	    renderer.clear();
	    this.scene.children.forEach( child => {

	      if ( this.selects.includes( child ) ) {

	        child.visible = true;
	        child._SSRrPassBackupMaterial = child.material;
	        child.material = this.specularMaterial;

					} else if ( ! child.isLight ) {

	        child.visible = false;

					}

				} );
	    renderer.render( this.scene, this.camera );
	    this.scene.children.forEach( child => {

	      if ( this.selects.includes( child ) ) {

	        child.material = child._SSRrPassBackupMaterial;

					}

				} ); // render normalSelectss

	    this.scene.children.forEach( child => {

	      if ( this.selects.includes( child ) ) {

	        child.visible = true;

					} else {

	        child.visible = false;

					}

				} );
	    this.renderOverride( renderer, this.normalMaterial, this.normalSelectsRenderTarget, 0, 0 );
	    this.renderRefractive( renderer, this.refractiveOnMaterial, this.refractiveRenderTarget, 0, 0 ); // render SSRr

	    this.ssrrMaterial.uniforms[ 'ior' ].value = this.ior;
	    this.ssrrMaterial.uniforms[ 'maxDistance' ].value = this.maxDistance;
	    this.ssrrMaterial.uniforms[ 'surfDist' ].value = this.surfDist;
	    this.ssrrMaterial.uniforms[ 'tSpecular' ].value = this.specularRenderTarget.texture;
	    this.renderPass( renderer, this.ssrrMaterial, this.ssrrRenderTarget ); // output result to screen

	    switch ( this.output ) {

	      case SSRrPass.OUTPUT.Default:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.beautyRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.ssrrRenderTarget.texture;
	        this.copyMaterial.blending = three.NormalBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSRrPass.OUTPUT.SSRr:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.ssrrRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSRrPass.OUTPUT.Beauty:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.beautyRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSRrPass.OUTPUT.Depth:
	        this.depthRenderMaterial.uniforms[ 'tDepth' ].value = this.beautyRenderTarget.depthTexture;
	        this.renderPass( renderer, this.depthRenderMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSRrPass.OUTPUT.DepthSelects:
	        this.depthRenderMaterial.uniforms[ 'tDepth' ].value = this.normalSelectsRenderTarget.depthTexture;
	        this.renderPass( renderer, this.depthRenderMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSRrPass.OUTPUT.NormalSelects:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.normalSelectsRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSRrPass.OUTPUT.Refractive:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.refractiveRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      case SSRrPass.OUTPUT.Specular:
	        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.specularRenderTarget.texture;
	        this.copyMaterial.blending = three.NoBlending;
	        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
	        break;

	      default:
	        console.warn( 'THREE.SSRrPass: Unknown output type.' );

				}

			}

	  renderPass( renderer, passMaterial, renderTarget, clearColor, clearAlpha ) {

	    // save original state
	    this.originalClearColor.copy( renderer.getClearColor( this.tempColor ) );
	    const originalClearAlpha = renderer.getClearAlpha( this.tempColor );
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

	    this.originalClearColor.copy( renderer.getClearColor( this.tempColor ) );
	    const originalClearAlpha = renderer.getClearAlpha( this.tempColor );
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

	  renderRefractive( renderer, overrideMaterial, renderTarget, clearColor, clearAlpha ) {

	    this.originalClearColor.copy( renderer.getClearColor( this.tempColor ) );
	    const originalClearAlpha = renderer.getClearAlpha( this.tempColor );
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

	    this.scene.children.forEach( child => {

	      child.visible = true;

				} );
	    this.scene.traverse( child => {

	      child._SSRrPassBackupMaterial = child.material;

	      if ( this.selects.includes( child ) ) {

	        child.material = this.refractiveOnMaterial;

					} else {

	        child.material = this.refractiveOffMaterial;

					}

				} );
	    this.scene._SSRrPassBackupBackground = this.scene.background;
	    this.scene.background = null;
	    this.scene._SSRrPassBackupFog = this.scene.fog;
	    this.scene.fog = null;
	    renderer.render( this.scene, this.camera );
	    this.scene.fog = this.scene._SSRrPassBackupFog;
	    this.scene.background = this.scene._SSRrPassBackupBackground;
	    this.scene.traverse( child => {

	      child.material = child._SSRrPassBackupMaterial;

				} ); // restore original state

	    renderer.autoClear = originalAutoClear;
	    renderer.setClearColor( this.originalClearColor );
	    renderer.setClearAlpha( originalClearAlpha );

			}

	  setSize( width, height ) {

	    this.width = width;
	    this.height = height;
	    this.ssrrMaterial.defines.MAX_STEP = Math.sqrt( width * width + height * height );
	    this.ssrrMaterial.needsUpdate = true;
	    this.beautyRenderTarget.setSize( width, height );
	    this.specularRenderTarget.setSize( width, height );
	    this.ssrrRenderTarget.setSize( width, height );
	    this.normalSelectsRenderTarget.setSize( width, height );
	    this.refractiveRenderTarget.setSize( width, height );
	    this.ssrrMaterial.uniforms[ 'resolution' ].value.set( width, height );
	    this.ssrrMaterial.uniforms[ 'cameraProjectionMatrix' ].value.copy( this.camera.projectionMatrix );
	    this.ssrrMaterial.uniforms[ 'cameraInverseProjectionMatrix' ].value.copy( this.camera.projectionMatrixInverse );

			}

		}

		SSRrPass.OUTPUT = {
	  'Default': 0,
	  'SSRr': 1,
	  'Beauty': 3,
	  'Depth': 4,
	  'DepthSelects': 9,
	  'NormalSelects': 5,
	  'Refractive': 7,
	  'Specular': 8
		};

		exports.SSRrPass = SSRrPass;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
