( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./Pass.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './Pass'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE));
})(this, (function (exports, three, Pass_js) { 'use strict';

	class ShaderPass extends Pass_js.Pass {
	  constructor(shader, textureID) {
	    super();
	    this.textureID = textureID !== undefined ? textureID : 'tDiffuse';

	    if (shader instanceof three.ShaderMaterial) {
	      this.uniforms = shader.uniforms;
	      this.material = shader;
	    } else if (shader) {
	      this.uniforms = three.UniformsUtils.clone(shader.uniforms);
	      this.material = new three.ShaderMaterial({
	        defines: Object.assign({}, shader.defines),
	        uniforms: this.uniforms,
	        vertexShader: shader.vertexShader,
	        fragmentShader: shader.fragmentShader
	      });
	    }

	    this.fsQuad = new Pass_js.FullScreenQuad(this.material);
	  }

	  render(renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive */
	  ) {
	    if (this.uniforms[this.textureID]) {
	      this.uniforms[this.textureID].value = readBuffer.texture;
	    }

	    this.fsQuad.material = this.material;

	    if (this.renderToScreen) {
	      renderer.setRenderTarget(null);
	      this.fsQuad.render(renderer);
	    } else {
	      renderer.setRenderTarget(writeBuffer); // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600

	      if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
	      this.fsQuad.render(renderer);
	    }
	  }

	}

	exports.ShaderPass = ShaderPass;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
