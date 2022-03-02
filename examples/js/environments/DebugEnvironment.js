( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE ) );

	} )( this, ( function ( exports, three ) {

		'use strict';

		class DebugEnvironment extends three.Scene {

	  constructor() {

	    super();
	    const geometry = new three.BoxGeometry();
	    geometry.deleteAttribute( 'uv' );
	    const roomMaterial = new three.MeshStandardMaterial( {
	      metalness: 0,
	      side: three.BackSide
	    } );
	    const room = new three.Mesh( geometry, roomMaterial );
	    room.scale.setScalar( 10 );
	    this.add( room );
	    const mainLight = new three.PointLight( 0xffffff, 50, 0, 2 );
	    this.add( mainLight );
	    const material1 = new three.MeshLambertMaterial( {
	      color: 0xff0000,
	      emissive: 0xffffff,
	      emissiveIntensity: 10
	    } );
	    const light1 = new three.Mesh( geometry, material1 );
	    light1.position.set( - 5, 2, 0 );
	    light1.scale.set( 0.1, 1, 1 );
	    this.add( light1 );
	    const material2 = new three.MeshLambertMaterial( {
	      color: 0x00ff00,
	      emissive: 0xffffff,
	      emissiveIntensity: 10
	    } );
	    const light2 = new three.Mesh( geometry, material2 );
	    light2.position.set( 0, 5, 0 );
	    light2.scale.set( 1, 0.1, 1 );
	    this.add( light2 );
	    const material3 = new three.MeshLambertMaterial( {
	      color: 0x0000ff,
	      emissive: 0xffffff,
	      emissiveIntensity: 10
	    } );
	    const light3 = new three.Mesh( geometry, material3 );
	    light3.position.set( 2, 1, 5 );
	    light3.scale.set( 1.5, 2, 0.1 );
	    this.add( light3 );

			}

		}

		exports.DebugEnvironment = DebugEnvironment;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
