( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE ) );

	} )( this, ( function ( exports, three ) {

		'use strict';

		const _v1 = new three.Vector3();

		const _v2 = new three.Vector3();

		class VertexTangentsHelper extends three.LineSegments {

	  constructor( object, size = 1, color = 0x00ffff ) {

	    const geometry = new three.BufferGeometry();
	    const nTangents = object.geometry.attributes.tangent.count;
	    const positions = new three.Float32BufferAttribute( nTangents * 2 * 3, 3 );
	    geometry.setAttribute( 'position', positions );
	    super( geometry, new three.LineBasicMaterial( {
	      color,
	      toneMapped: false
	    } ) );
	    this.object = object;
	    this.size = size;
	    this.type = 'VertexTangentsHelper'; //

	    this.matrixAutoUpdate = false;
	    this.update();

			}

	  update() {

	    this.object.updateMatrixWorld( true );
	    const matrixWorld = this.object.matrixWorld;
	    const position = this.geometry.attributes.position; //

	    const objGeometry = this.object.geometry;
	    const objPos = objGeometry.attributes.position;
	    const objTan = objGeometry.attributes.tangent;
	    let idx = 0; // for simplicity, ignore index and drawcalls, and render every tangent

	    for ( let j = 0, jl = objPos.count; j < jl; j ++ ) {

	      _v1.set( objPos.getX( j ), objPos.getY( j ), objPos.getZ( j ) ).applyMatrix4( matrixWorld );

	      _v2.set( objTan.getX( j ), objTan.getY( j ), objTan.getZ( j ) );

	      _v2.transformDirection( matrixWorld ).multiplyScalar( this.size ).add( _v1 );

	      position.setXYZ( idx, _v1.x, _v1.y, _v1.z );
	      idx = idx + 1;
	      position.setXYZ( idx, _v2.x, _v2.y, _v2.z );
	      idx = idx + 1;

				}

	    position.needsUpdate = true;

			}

		}

		exports.VertexTangentsHelper = VertexTangentsHelper;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
