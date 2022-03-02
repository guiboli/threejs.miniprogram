( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ), require( '../math/ConvexHull.js' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three', '../math/ConvexHull' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE, global.THREE ) );

	} )( this, ( function ( exports, three, ConvexHull_js ) {

		'use strict';

		class ConvexGeometry extends three.BufferGeometry {

	  constructor( points = [] ) {

	    super(); // buffers

	    const vertices = [];
	    const normals = [];

	    if ( ConvexHull_js.ConvexHull === undefined ) {

	      console.error( 'THREE.ConvexBufferGeometry: ConvexBufferGeometry relies on ConvexHull' );

				}

	    const convexHull = new ConvexHull_js.ConvexHull().setFromPoints( points ); // generate vertices and normals

	    const faces = convexHull.faces;

	    for ( let i = 0; i < faces.length; i ++ ) {

	      const face = faces[ i ];
	      let edge = face.edge; // we move along a doubly-connected edge list to access all face points (see HalfEdge docs)

	      do {

	        const point = edge.head().point;
	        vertices.push( point.x, point.y, point.z );
	        normals.push( face.normal.x, face.normal.y, face.normal.z );
	        edge = edge.next;

					} while ( edge !== face.edge );

				} // build geometry


	    this.setAttribute( 'position', new three.Float32BufferAttribute( vertices, 3 ) );
	    this.setAttribute( 'normal', new three.Float32BufferAttribute( normals, 3 ) );

			}

		}

		exports.ConvexGeometry = ConvexGeometry;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
