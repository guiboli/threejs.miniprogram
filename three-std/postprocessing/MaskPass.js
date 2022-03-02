( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./Pass.js')) :
	typeof define === 'function' && define.amd ? define(['exports', './Pass'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE));
})(this, (function (exports, Pass_js) { 'use strict';

	class MaskPass extends Pass_js.Pass {
	  constructor(scene, camera) {
	    super();
	    this.scene = scene;
	    this.camera = camera;
	    this.clear = true;
	    this.needsSwap = false;
	    this.inverse = false;
	  }

	  render(renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive */
	  ) {
	    const context = renderer.getContext();
	    const state = renderer.state; // don't update color or depth

	    state.buffers.color.setMask(false);
	    state.buffers.depth.setMask(false); // lock buffers

	    state.buffers.color.setLocked(true);
	    state.buffers.depth.setLocked(true); // set up stencil

	    let writeValue, clearValue;

	    if (this.inverse) {
	      writeValue = 0;
	      clearValue = 1;
	    } else {
	      writeValue = 1;
	      clearValue = 0;
	    }

	    state.buffers.stencil.setTest(true);
	    state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
	    state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
	    state.buffers.stencil.setClear(clearValue);
	    state.buffers.stencil.setLocked(true); // draw into the stencil buffer

	    renderer.setRenderTarget(readBuffer);
	    if (this.clear) renderer.clear();
	    renderer.render(this.scene, this.camera);
	    renderer.setRenderTarget(writeBuffer);
	    if (this.clear) renderer.clear();
	    renderer.render(this.scene, this.camera); // unlock color and depth buffer for subsequent rendering

	    state.buffers.color.setLocked(false);
	    state.buffers.depth.setLocked(false); // only render where stencil is set to 1

	    state.buffers.stencil.setLocked(false);
	    state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff); // draw if == 1

	    state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
	    state.buffers.stencil.setLocked(true);
	  }

	}

	class ClearMaskPass extends Pass_js.Pass {
	  constructor() {
	    super();
	    this.needsSwap = false;
	  }

	  render(renderer
	  /*, writeBuffer, readBuffer, deltaTime, maskActive */
	  ) {
	    renderer.state.buffers.stencil.setLocked(false);
	    renderer.state.buffers.stencil.setTest(false);
	  }

	}

	exports.ClearMaskPass = ClearMaskPass;
	exports.MaskPass = MaskPass;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
