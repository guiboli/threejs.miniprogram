( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./Pass.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './Pass'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE));
})(this, (function (exports, three, Pass_js) { 'use strict';

	class ClearPass extends Pass_js.Pass {
	  constructor(clearColor, clearAlpha) {
	    super();
	    this.needsSwap = false;
	    this.clearColor = clearColor !== undefined ? clearColor : 0x000000;
	    this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;
	    this._oldClearColor = new three.Color();
	  }

	  render(renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive */
	  ) {
	    let oldClearAlpha;

	    if (this.clearColor) {
	      renderer.getClearColor(this._oldClearColor);
	      oldClearAlpha = renderer.getClearAlpha();
	      renderer.setClearColor(this.clearColor, this.clearAlpha);
	    }

	    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
	    renderer.clear();

	    if (this.clearColor) {
	      renderer.setClearColor(this._oldClearColor, oldClearAlpha);
	    }
	  }

	}

	exports.ClearPass = ClearPass;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
