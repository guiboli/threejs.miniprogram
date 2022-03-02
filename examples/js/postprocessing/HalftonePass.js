( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ), require( './Pass.js' ), require( '../shaders/HalftoneShader.js' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three', './Pass', '../shaders/HalftoneShader' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE ) );

	} )( this, ( function ( exports, three, Pass_js, HalftoneShader_js ) {

		'use strict';

		/**
	 * RGB Halftone pass for three.js effects composer. Requires HalftoneShader.
	 */

		class HalftonePass extends Pass_js.Pass {

	  constructor( width, height, params ) {

	    super();

	    if ( HalftoneShader_js.HalftoneShader === undefined ) {

	      console.error( 'THREE.HalftonePass requires HalftoneShader' );

				}

	    this.uniforms = three.UniformsUtils.clone( HalftoneShader_js.HalftoneShader.uniforms );
	    this.material = new three.ShaderMaterial( {
	      uniforms: this.uniforms,
	      fragmentShader: HalftoneShader_js.HalftoneShader.fragmentShader,
	      vertexShader: HalftoneShader_js.HalftoneShader.vertexShader
	    } ); // set params

	    this.uniforms.width.value = width;
	    this.uniforms.height.value = height;

	    for ( const key in params ) {

	      if ( params.hasOwnProperty( key ) && this.uniforms.hasOwnProperty( key ) ) {

	        this.uniforms[ key ].value = params[ key ];

					}

				}

	    this.fsQuad = new Pass_js.FullScreenQuad( this.material );

			}

	  render( renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive*/
	  ) {

	    this.material.uniforms[ 'tDiffuse' ].value = readBuffer.texture;

	    if ( this.renderToScreen ) {

	      renderer.setRenderTarget( null );
	      this.fsQuad.render( renderer );

				} else {

	      renderer.setRenderTarget( writeBuffer );
	      if ( this.clear ) renderer.clear();
	      this.fsQuad.render( renderer );

				}

			}

	  setSize( width, height ) {

	    this.uniforms.width.value = width;
	    this.uniforms.height.value = height;

			}

		}

		exports.HalftonePass = HalftonePass;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
