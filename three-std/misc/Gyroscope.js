( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE));
})(this, (function (exports, three) { 'use strict';

	const _translationObject = new three.Vector3();

	const _quaternionObject = new three.Quaternion();

	const _scaleObject = new three.Vector3();

	const _translationWorld = new three.Vector3();

	const _quaternionWorld = new three.Quaternion();

	const _scaleWorld = new three.Vector3();

	class Gyroscope extends three.Object3D {
	  constructor() {
	    super();
	  }

	  updateMatrixWorld(force) {
	    this.matrixAutoUpdate && this.updateMatrix(); // update matrixWorld

	    if (this.matrixWorldNeedsUpdate || force) {
	      if (this.parent !== null) {
	        this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
	        this.matrixWorld.decompose(_translationWorld, _quaternionWorld, _scaleWorld);
	        this.matrix.decompose(_translationObject, _quaternionObject, _scaleObject);
	        this.matrixWorld.compose(_translationWorld, _quaternionObject, _scaleWorld);
	      } else {
	        this.matrixWorld.copy(this.matrix);
	      }

	      this.matrixWorldNeedsUpdate = false;
	      force = true;
	    } // update children


	    for (let i = 0, l = this.children.length; i < l; i++) {
	      this.children[i].updateMatrixWorld(force);
	    }
	  }

	}

	exports.Gyroscope = Gyroscope;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
