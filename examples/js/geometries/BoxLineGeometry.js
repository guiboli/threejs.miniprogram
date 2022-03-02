( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE ) );

	} )( this, ( function ( exports, three ) {

		'use strict';

		class BoxLineGeometry extends three.BufferGeometry {

	  constructor( width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1 ) {

	    super();
	    widthSegments = Math.floor( widthSegments );
	    heightSegments = Math.floor( heightSegments );
	    depthSegments = Math.floor( depthSegments );
	    const widthHalf = width / 2;
	    const heightHalf = height / 2;
	    const depthHalf = depth / 2;
	    const segmentWidth = width / widthSegments;
	    const segmentHeight = height / heightSegments;
	    const segmentDepth = depth / depthSegments;
	    const vertices = [];
	    let x = - widthHalf;
	    let y = - heightHalf;
	    let z = - depthHalf;

	    for ( let i = 0; i <= widthSegments; i ++ ) {

	      vertices.push( x, - heightHalf, - depthHalf, x, heightHalf, - depthHalf );
	      vertices.push( x, heightHalf, - depthHalf, x, heightHalf, depthHalf );
	      vertices.push( x, heightHalf, depthHalf, x, - heightHalf, depthHalf );
	      vertices.push( x, - heightHalf, depthHalf, x, - heightHalf, - depthHalf );
	      x += segmentWidth;

				}

	    for ( let i = 0; i <= heightSegments; i ++ ) {

	      vertices.push( - widthHalf, y, - depthHalf, widthHalf, y, - depthHalf );
	      vertices.push( widthHalf, y, - depthHalf, widthHalf, y, depthHalf );
	      vertices.push( widthHalf, y, depthHalf, - widthHalf, y, depthHalf );
	      vertices.push( - widthHalf, y, depthHalf, - widthHalf, y, - depthHalf );
	      y += segmentHeight;

				}

	    for ( let i = 0; i <= depthSegments; i ++ ) {

	      vertices.push( - widthHalf, - heightHalf, z, - widthHalf, heightHalf, z );
	      vertices.push( - widthHalf, heightHalf, z, widthHalf, heightHalf, z );
	      vertices.push( widthHalf, heightHalf, z, widthHalf, - heightHalf, z );
	      vertices.push( widthHalf, - heightHalf, z, - widthHalf, - heightHalf, z );
	      z += segmentDepth;

				}

	    this.setAttribute( 'position', new three.Float32BufferAttribute( vertices, 3 ) );

			}

		}

		exports.BoxLineGeometry = BoxLineGeometry;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
