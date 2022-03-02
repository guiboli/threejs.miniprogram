( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./Pass.js'), require('../shaders/CopyShader.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './Pass', '../shaders/CopyShader'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE, global.THREE));
})(this, (function (exports, three, Pass_js, CopyShader_js) { 'use strict';

	class SavePass extends Pass_js.Pass {
	  constructor(renderTarget) {
	    super();
	    if (CopyShader_js.CopyShader === undefined) console.error('THREE.SavePass relies on CopyShader');
	    const shader = CopyShader_js.CopyShader;
	    this.textureID = 'tDiffuse';
	    this.uniforms = three.UniformsUtils.clone(shader.uniforms);
	    this.material = new three.ShaderMaterial({
	      uniforms: this.uniforms,
	      vertexShader: shader.vertexShader,
	      fragmentShader: shader.fragmentShader
	    });
	    this.renderTarget = renderTarget;

	    if (this.renderTarget === undefined) {
	      this.renderTarget = new three.WebGLRenderTarget(window.innerWidth, window.innerHeight);
	      this.renderTarget.texture.name = 'SavePass.rt';
	    }

	    this.needsSwap = false;
	    this.fsQuad = new Pass_js.FullScreenQuad(this.material);
	  }

	  render(renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive */
	  ) {
	    if (this.uniforms[this.textureID]) {
	      this.uniforms[this.textureID].value = readBuffer.texture;
	    }

	    renderer.setRenderTarget(this.renderTarget);
	    if (this.clear) renderer.clear();
	    this.fsQuad.render(renderer);
	  }

	}

	exports.SavePass = SavePass;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
