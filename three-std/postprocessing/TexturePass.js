( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./Pass.js'), require('../shaders/CopyShader.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './Pass', '../shaders/CopyShader'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE, global.THREE));
})(this, (function (exports, three, Pass_js, CopyShader_js) { 'use strict';

	class TexturePass extends Pass_js.Pass {
	  constructor(map, opacity) {
	    super();
	    if (CopyShader_js.CopyShader === undefined) console.error('THREE.TexturePass relies on CopyShader');
	    const shader = CopyShader_js.CopyShader;
	    this.map = map;
	    this.opacity = opacity !== undefined ? opacity : 1.0;
	    this.uniforms = three.UniformsUtils.clone(shader.uniforms);
	    this.material = new three.ShaderMaterial({
	      uniforms: this.uniforms,
	      vertexShader: shader.vertexShader,
	      fragmentShader: shader.fragmentShader,
	      depthTest: false,
	      depthWrite: false
	    });
	    this.needsSwap = false;
	    this.fsQuad = new Pass_js.FullScreenQuad(null);
	  }

	  render(renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive */
	  ) {
	    const oldAutoClear = renderer.autoClear;
	    renderer.autoClear = false;
	    this.fsQuad.material = this.material;
	    this.uniforms['opacity'].value = this.opacity;
	    this.uniforms['tDiffuse'].value = this.map;
	    this.material.transparent = this.opacity < 1.0;
	    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
	    if (this.clear) renderer.clear();
	    this.fsQuad.render(renderer);
	    renderer.autoClear = oldAutoClear;
	  }

	}

	exports.TexturePass = TexturePass;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
