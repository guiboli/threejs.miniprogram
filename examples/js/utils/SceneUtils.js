( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE ) );

	} )( this, ( function ( exports, three ) {

		'use strict';

		function createMeshesFromInstancedMesh( instancedMesh ) {

	  const group = new three.Group();
	  const count = instancedMesh.count;
	  const geometry = instancedMesh.geometry;
	  const material = instancedMesh.material;

	  for ( let i = 0; i < count; i ++ ) {

	    const mesh = new three.Mesh( geometry, material );
	    instancedMesh.getMatrixAt( i, mesh.matrix );
	    mesh.matrix.decompose( mesh.position, mesh.quaternion, mesh.scale );
	    group.add( mesh );

			}

	  group.copy( instancedMesh );
	  group.updateMatrixWorld(); // ensure correct world matrices of meshes

	  return group;

		}

		function createMultiMaterialObject( geometry, materials ) {

	  const group = new three.Group();

	  for ( let i = 0, l = materials.length; i < l; i ++ ) {

	    group.add( new three.Mesh( geometry, materials[ i ] ) );

			}

	  return group;

		}

		function detach( child, parent, scene ) {

	  console.warn( 'THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead.' );
	  scene.attach( child );

		}

		function attach( child, scene, parent ) {

	  console.warn( 'THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead.' );
	  parent.attach( child );

		}

		exports.attach = attach;
		exports.createMeshesFromInstancedMesh = createMeshesFromInstancedMesh;
		exports.createMultiMaterialObject = createMultiMaterialObject;
		exports.detach = detach;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
