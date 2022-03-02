( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./Pass.js'), require('../shaders/AfterimageShader.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './Pass', '../shaders/AfterimageShader'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE, global.THREE));
})(this, (function (exports, three, Pass_js, AfterimageShader_js) { 'use strict';

	class AfterimagePass extends Pass_js.Pass {
	  constructor(damp = 0.96) {
	    super();
	    if (AfterimageShader_js.AfterimageShader === undefined) console.error('THREE.AfterimagePass relies on AfterimageShader');
	    this.shader = AfterimageShader_js.AfterimageShader;
	    this.uniforms = three.UniformsUtils.clone(this.shader.uniforms);
	    this.uniforms['damp'].value = damp;
	    this.textureComp = new three.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
	      minFilter: three.LinearFilter,
	      magFilter: three.NearestFilter,
	      format: three.RGBAFormat
	    });
	    this.textureOld = new three.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
	      minFilter: three.LinearFilter,
	      magFilter: three.NearestFilter,
	      format: three.RGBAFormat
	    });
	    this.shaderMaterial = new three.ShaderMaterial({
	      uniforms: this.uniforms,
	      vertexShader: this.shader.vertexShader,
	      fragmentShader: this.shader.fragmentShader
	    });
	    this.compFsQuad = new Pass_js.FullScreenQuad(this.shaderMaterial);
	    const material = new three.MeshBasicMaterial();
	    this.copyFsQuad = new Pass_js.FullScreenQuad(material);
	  }

	  render(renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive*/
	  ) {
	    this.uniforms['tOld'].value = this.textureOld.texture;
	    this.uniforms['tNew'].value = readBuffer.texture;
	    renderer.setRenderTarget(this.textureComp);
	    this.compFsQuad.render(renderer);
	    this.copyFsQuad.material.map = this.textureComp.texture;

	    if (this.renderToScreen) {
	      renderer.setRenderTarget(null);
	      this.copyFsQuad.render(renderer);
	    } else {
	      renderer.setRenderTarget(writeBuffer);
	      if (this.clear) renderer.clear();
	      this.copyFsQuad.render(renderer);
	    } // Swap buffers.


	    const temp = this.textureOld;
	    this.textureOld = this.textureComp;
	    this.textureComp = temp; // Now textureOld contains the latest image, ready for the next frame.
	  }

	  setSize(width, height) {
	    this.textureComp.setSize(width, height);
	    this.textureOld.setSize(width, height);
	  }

	}

	exports.AfterimagePass = AfterimagePass;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
