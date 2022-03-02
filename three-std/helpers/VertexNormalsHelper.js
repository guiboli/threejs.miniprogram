( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE));
})(this, (function (exports, three) { 'use strict';

	const _v1 = new three.Vector3();

	const _v2 = new three.Vector3();

	const _normalMatrix = new three.Matrix3();

	class VertexNormalsHelper extends three.LineSegments {
	  constructor(object, size = 1, color = 0xff0000) {
	    const geometry = new three.BufferGeometry();
	    const nNormals = object.geometry.attributes.normal.count;
	    const positions = new three.Float32BufferAttribute(nNormals * 2 * 3, 3);
	    geometry.setAttribute('position', positions);
	    super(geometry, new three.LineBasicMaterial({
	      color,
	      toneMapped: false
	    }));
	    this.object = object;
	    this.size = size;
	    this.type = 'VertexNormalsHelper'; //

	    this.matrixAutoUpdate = false;
	    this.update();
	  }

	  update() {
	    this.object.updateMatrixWorld(true);

	    _normalMatrix.getNormalMatrix(this.object.matrixWorld);

	    const matrixWorld = this.object.matrixWorld;
	    const position = this.geometry.attributes.position; //

	    const objGeometry = this.object.geometry;

	    if (objGeometry && objGeometry.isGeometry) {
	      console.error('THREE.VertexNormalsHelper no longer supports Geometry. Use BufferGeometry instead.');
	      return;
	    } else if (objGeometry && objGeometry.isBufferGeometry) {
	      const objPos = objGeometry.attributes.position;
	      const objNorm = objGeometry.attributes.normal;
	      let idx = 0; // for simplicity, ignore index and drawcalls, and render every normal

	      for (let j = 0, jl = objPos.count; j < jl; j++) {
	        _v1.set(objPos.getX(j), objPos.getY(j), objPos.getZ(j)).applyMatrix4(matrixWorld);

	        _v2.set(objNorm.getX(j), objNorm.getY(j), objNorm.getZ(j));

	        _v2.applyMatrix3(_normalMatrix).normalize().multiplyScalar(this.size).add(_v1);

	        position.setXYZ(idx, _v1.x, _v1.y, _v1.z);
	        idx = idx + 1;
	        position.setXYZ(idx, _v2.x, _v2.y, _v2.z);
	        idx = idx + 1;
	      }
	    }

	    position.needsUpdate = true;
	  }

	}

	exports.VertexNormalsHelper = VertexNormalsHelper;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
