( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ), require( './Pass.js' ), require( '../shaders/BokehShader.js' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three', './Pass', '../shaders/BokehShader' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE ) );

	} )( this, ( function ( exports, three, Pass_js, BokehShader_js ) {

		'use strict';

		/**
	 * Depth-of-field post-process with bokeh shader
	 */

		class BokehPass extends Pass_js.Pass {

	  constructor( scene, camera, params ) {

	    super();
	    this.scene = scene;
	    this.camera = camera;
	    const focus = params.focus !== undefined ? params.focus : 1.0;
	    const aspect = params.aspect !== undefined ? params.aspect : camera.aspect;
	    const aperture = params.aperture !== undefined ? params.aperture : 0.025;
	    const maxblur = params.maxblur !== undefined ? params.maxblur : 1.0; // render targets

	    const width = params.width || window.innerWidth || 1;
	    const height = params.height || window.innerHeight || 1;
	    this.renderTargetDepth = new three.WebGLRenderTarget( width, height, {
	      minFilter: three.NearestFilter,
	      magFilter: three.NearestFilter
	    } );
	    this.renderTargetDepth.texture.name = 'BokehPass.depth'; // depth material

	    this.materialDepth = new three.MeshDepthMaterial();
	    this.materialDepth.depthPacking = three.RGBADepthPacking;
	    this.materialDepth.blending = three.NoBlending; // bokeh material

	    if ( BokehShader_js.BokehShader === undefined ) {

	      console.error( 'THREE.BokehPass relies on BokehShader' );

				}

	    const bokehShader = BokehShader_js.BokehShader;
	    const bokehUniforms = three.UniformsUtils.clone( bokehShader.uniforms );
	    bokehUniforms[ 'tDepth' ].value = this.renderTargetDepth.texture;
	    bokehUniforms[ 'focus' ].value = focus;
	    bokehUniforms[ 'aspect' ].value = aspect;
	    bokehUniforms[ 'aperture' ].value = aperture;
	    bokehUniforms[ 'maxblur' ].value = maxblur;
	    bokehUniforms[ 'nearClip' ].value = camera.near;
	    bokehUniforms[ 'farClip' ].value = camera.far;
	    this.materialBokeh = new three.ShaderMaterial( {
	      defines: Object.assign( {}, bokehShader.defines ),
	      uniforms: bokehUniforms,
	      vertexShader: bokehShader.vertexShader,
	      fragmentShader: bokehShader.fragmentShader
	    } );
	    this.uniforms = bokehUniforms;
	    this.needsSwap = false;
	    this.fsQuad = new Pass_js.FullScreenQuad( this.materialBokeh );
	    this._oldClearColor = new three.Color();

			}

	  render( renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive*/
	  ) {

	    // Render depth into texture
	    this.scene.overrideMaterial = this.materialDepth;
	    renderer.getClearColor( this._oldClearColor );
	    const oldClearAlpha = renderer.getClearAlpha();
	    const oldAutoClear = renderer.autoClear;
	    renderer.autoClear = false;
	    renderer.setClearColor( 0xffffff );
	    renderer.setClearAlpha( 1.0 );
	    renderer.setRenderTarget( this.renderTargetDepth );
	    renderer.clear();
	    renderer.render( this.scene, this.camera ); // Render bokeh composite

	    this.uniforms[ 'tColor' ].value = readBuffer.texture;
	    this.uniforms[ 'nearClip' ].value = this.camera.near;
	    this.uniforms[ 'farClip' ].value = this.camera.far;

	    if ( this.renderToScreen ) {

	      renderer.setRenderTarget( null );
	      this.fsQuad.render( renderer );

				} else {

	      renderer.setRenderTarget( writeBuffer );
	      renderer.clear();
	      this.fsQuad.render( renderer );

				}

	    this.scene.overrideMaterial = null;
	    renderer.setClearColor( this._oldClearColor );
	    renderer.setClearAlpha( oldClearAlpha );
	    renderer.autoClear = oldAutoClear;

			}

		}

		exports.BokehPass = BokehPass;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
