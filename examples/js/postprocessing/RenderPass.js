( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ), require( './Pass.js' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three', './Pass' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE, global.THREE ) );

	} )( this, ( function ( exports, three, Pass_js ) {

		'use strict';

		class RenderPass extends Pass_js.Pass {

	  constructor( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

	    super();
	    this.scene = scene;
	    this.camera = camera;
	    this.overrideMaterial = overrideMaterial;
	    this.clearColor = clearColor;
	    this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;
	    this.clear = true;
	    this.clearDepth = false;
	    this.needsSwap = false;
	    this._oldClearColor = new three.Color();

			}

	  render( renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive */
	  ) {

	    const oldAutoClear = renderer.autoClear;
	    renderer.autoClear = false;
	    let oldClearAlpha, oldOverrideMaterial;

	    if ( this.overrideMaterial !== undefined ) {

	      oldOverrideMaterial = this.scene.overrideMaterial;
	      this.scene.overrideMaterial = this.overrideMaterial;

				}

	    if ( this.clearColor ) {

	      renderer.getClearColor( this._oldClearColor );
	      oldClearAlpha = renderer.getClearAlpha();
	      renderer.setClearColor( this.clearColor, this.clearAlpha );

				}

	    if ( this.clearDepth ) {

	      renderer.clearDepth();

				}

	    renderer.setRenderTarget( this.renderToScreen ? null : readBuffer ); // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600

	    if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
	    renderer.render( this.scene, this.camera );

	    if ( this.clearColor ) {

	      renderer.setClearColor( this._oldClearColor, oldClearAlpha );

				}

	    if ( this.overrideMaterial !== undefined ) {

	      this.scene.overrideMaterial = oldOverrideMaterial;

				}

	    renderer.autoClear = oldAutoClear;

			}

		}

		exports.RenderPass = RenderPass;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
