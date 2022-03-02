( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE ) );

	} )( this, ( function ( exports, three ) {

		'use strict';

		class StereoEffect {

	  constructor( renderer ) {

	    const _stereo = new three.StereoCamera();

	    _stereo.aspect = 0.5;
	    const size = new three.Vector2();

	    this.setEyeSeparation = function ( eyeSep ) {

	      _stereo.eyeSep = eyeSep;

				};

	    this.setSize = function ( width, height ) {

	      renderer.setSize( width, height );

				};

	    this.render = function ( scene, camera ) {

	      scene.updateMatrixWorld();
	      if ( camera.parent === null ) camera.updateMatrixWorld();

	      _stereo.update( camera );

	      renderer.getSize( size );
	      if ( renderer.autoClear ) renderer.clear();
	      renderer.setScissorTest( true );
	      renderer.setScissor( 0, 0, size.width / 2, size.height );
	      renderer.setViewport( 0, 0, size.width / 2, size.height );
	      renderer.render( scene, _stereo.cameraL );
	      renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
	      renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
	      renderer.render( scene, _stereo.cameraR );
	      renderer.setScissorTest( false );

				};

			}

		}

		exports.StereoEffect = StereoEffect;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
