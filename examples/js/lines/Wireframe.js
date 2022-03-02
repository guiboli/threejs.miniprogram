( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ), require( './LineSegmentsGeometry.js' ), require( './LineMaterial.js' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three', './LineSegmentsGeometry', './LineMaterial' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE ) );

	} )( this, ( function ( exports, three, LineSegmentsGeometry_js, LineMaterial_js ) {

		'use strict';

		const _start = new three.Vector3();

		const _end = new three.Vector3();

		class Wireframe extends three.Mesh {

	  constructor( geometry = new LineSegmentsGeometry_js.LineSegmentsGeometry(), material = new LineMaterial_js.LineMaterial( {
	    color: Math.random() * 0xffffff
	  } ) ) {

	    super( geometry, material );
	    this.type = 'Wireframe';

			} // for backwards-compatability, but could be a method of LineSegmentsGeometry...


	  computeLineDistances() {

	    const geometry = this.geometry;
	    const instanceStart = geometry.attributes.instanceStart;
	    const instanceEnd = geometry.attributes.instanceEnd;
	    const lineDistances = new Float32Array( 2 * instanceStart.count );

	    for ( let i = 0, j = 0, l = instanceStart.count; i < l; i ++, j += 2 ) {

	      _start.fromBufferAttribute( instanceStart, i );

	      _end.fromBufferAttribute( instanceEnd, i );

	      lineDistances[ j ] = j === 0 ? 0 : lineDistances[ j - 1 ];
	      lineDistances[ j + 1 ] = lineDistances[ j ] + _start.distanceTo( _end );

				}

	    const instanceDistanceBuffer = new three.InstancedInterleavedBuffer( lineDistances, 2, 1 ); // d0, d1

	    geometry.setAttribute( 'instanceDistanceStart', new three.InterleavedBufferAttribute( instanceDistanceBuffer, 1, 0 ) ); // d0

	    geometry.setAttribute( 'instanceDistanceEnd', new three.InterleavedBufferAttribute( instanceDistanceBuffer, 1, 1 ) ); // d1

	    return this;

			}

		}

		Wireframe.prototype.isWireframe = true;

		exports.Wireframe = Wireframe;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
