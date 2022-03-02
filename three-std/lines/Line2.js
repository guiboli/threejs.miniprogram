( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./LineSegments2.js'), require('./LineGeometry.js'), require('./LineMaterial.js')) :
	typeof define === 'function' && define.amd ? define(['exports', './LineSegments2', './LineGeometry', './LineMaterial'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE, global.THREE));
})(this, (function (exports, LineSegments2_js, LineGeometry_js, LineMaterial_js) { 'use strict';

	class Line2 extends LineSegments2_js.LineSegments2 {
	  constructor(geometry = new LineGeometry_js.LineGeometry(), material = new LineMaterial_js.LineMaterial({
	    color: Math.random() * 0xffffff
	  })) {
	    super(geometry, material);
	    this.type = 'Line2';
	  }

	}

	Line2.prototype.isLine2 = true;

	exports.Line2 = Line2;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
