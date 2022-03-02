( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE ) );

	} )( this, ( function ( exports, three ) {

		'use strict';

		class Pass {

	  constructor() {

	    // if set to true, the pass is processed by the composer
	    this.enabled = true; // if set to true, the pass indicates to swap read and write buffer after rendering

	    this.needsSwap = true; // if set to true, the pass clears its buffer before rendering

	    this.clear = false; // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.

	    this.renderToScreen = false;

			}

	  setSize() {}

	  render() {

	    console.error( 'THREE.Pass: .render() must be implemented in derived pass.' );

			}

		} // Helper for passes that need to fill the viewport with a single quad.


		const _camera = new three.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 ); // https://github.com/mrdoob/three.js/pull/21358


		const _geometry = new three.BufferGeometry();

		_geometry.setAttribute( 'position', new three.Float32BufferAttribute( [ - 1, 3, 0, - 1, - 1, 0, 3, - 1, 0 ], 3 ) );

		_geometry.setAttribute( 'uv', new three.Float32BufferAttribute( [ 0, 2, 0, 0, 2, 0 ], 2 ) );

		class FullScreenQuad {

	  constructor( material ) {

	    this._mesh = new three.Mesh( _geometry, material );

			}

	  dispose() {

	    this._mesh.geometry.dispose();

			}

	  render( renderer ) {

	    renderer.render( this._mesh, _camera );

			}

	  get material() {

	    return this._mesh.material;

			}

	  set material( value ) {

	    this._mesh.material = value;

			}

		}

		exports.FullScreenQuad = FullScreenQuad;
		exports.Pass = Pass;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
