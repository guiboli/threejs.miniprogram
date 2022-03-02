( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./Pass.js'), require('../shaders/DotScreenShader.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './Pass', '../shaders/DotScreenShader'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE, global.THREE));
})(this, (function (exports, three, Pass_js, DotScreenShader_js) { 'use strict';

	class DotScreenPass extends Pass_js.Pass {
	  constructor(center, angle, scale) {
	    super();
	    if (DotScreenShader_js.DotScreenShader === undefined) console.error('THREE.DotScreenPass relies on DotScreenShader');
	    const shader = DotScreenShader_js.DotScreenShader;
	    this.uniforms = three.UniformsUtils.clone(shader.uniforms);
	    if (center !== undefined) this.uniforms['center'].value.copy(center);
	    if (angle !== undefined) this.uniforms['angle'].value = angle;
	    if (scale !== undefined) this.uniforms['scale'].value = scale;
	    this.material = new three.ShaderMaterial({
	      uniforms: this.uniforms,
	      vertexShader: shader.vertexShader,
	      fragmentShader: shader.fragmentShader
	    });
	    this.fsQuad = new Pass_js.FullScreenQuad(this.material);
	  }

	  render(renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive */
	  ) {
	    this.uniforms['tDiffuse'].value = readBuffer.texture;
	    this.uniforms['tSize'].value.set(readBuffer.width, readBuffer.height);

	    if (this.renderToScreen) {
	      renderer.setRenderTarget(null);
	      this.fsQuad.render(renderer);
	    } else {
	      renderer.setRenderTarget(writeBuffer);
	      if (this.clear) renderer.clear();
	      this.fsQuad.render(renderer);
	    }
	  }

	}

	exports.DotScreenPass = DotScreenPass;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
