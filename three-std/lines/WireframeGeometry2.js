( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./LineSegmentsGeometry.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './LineSegmentsGeometry'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE));
})(this, (function (exports, three, LineSegmentsGeometry_js) { 'use strict';

	class WireframeGeometry2 extends LineSegmentsGeometry_js.LineSegmentsGeometry {
	  constructor(geometry) {
	    super();
	    this.type = 'WireframeGeometry2';
	    this.fromWireframeGeometry(new three.WireframeGeometry(geometry)); // set colors, maybe
	  }

	}

	WireframeGeometry2.prototype.isWireframeGeometry2 = true;

	exports.WireframeGeometry2 = WireframeGeometry2;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
