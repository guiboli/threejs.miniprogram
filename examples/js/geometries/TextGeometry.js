( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE ) );

	} )( this, ( function ( exports, three ) {

		'use strict';

		/**
	 * Text = 3D Text
	 *
	 * parameters = {
	 *  font: <THREE.Font>, // font
	 *
	 *  size: <float>, // size of the text
	 *  height: <float>, // thickness to extrude text
	 *  curveSegments: <int>, // number of points on the curves
	 *
	 *  bevelEnabled: <bool>, // turn on bevel
	 *  bevelThickness: <float>, // how deep into text bevel goes
	 *  bevelSize: <float>, // how far from text outline (including bevelOffset) is bevel
	 *  bevelOffset: <float> // how far from text outline does bevel start
	 * }
	 */

		class TextGeometry extends three.ExtrudeGeometry {

	  constructor( text, parameters = {} ) {

	    const font = parameters.font;

	    if ( font === undefined ) {

	      super(); // generate default extrude geometry

				} else {

	      const shapes = font.generateShapes( text, parameters.size ); // translate parameters to ExtrudeGeometry API

	      parameters.depth = parameters.height !== undefined ? parameters.height : 50; // defaults

	      if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
	      if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
	      if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;
	      super( shapes, parameters );

				}

	    this.type = 'TextGeometry';

			}

		}

		exports.TextGeometry = TextGeometry;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
