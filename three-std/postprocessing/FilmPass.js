( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./Pass.js'), require('../shaders/FilmShader.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './Pass', '../shaders/FilmShader'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE, global.THREE));
})(this, (function (exports, three, Pass_js, FilmShader_js) { 'use strict';

	class FilmPass extends Pass_js.Pass {
	  constructor(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale) {
	    super();
	    if (FilmShader_js.FilmShader === undefined) console.error('THREE.FilmPass relies on FilmShader');
	    const shader = FilmShader_js.FilmShader;
	    this.uniforms = three.UniformsUtils.clone(shader.uniforms);
	    this.material = new three.ShaderMaterial({
	      uniforms: this.uniforms,
	      vertexShader: shader.vertexShader,
	      fragmentShader: shader.fragmentShader
	    });
	    if (grayscale !== undefined) this.uniforms.grayscale.value = grayscale;
	    if (noiseIntensity !== undefined) this.uniforms.nIntensity.value = noiseIntensity;
	    if (scanlinesIntensity !== undefined) this.uniforms.sIntensity.value = scanlinesIntensity;
	    if (scanlinesCount !== undefined) this.uniforms.sCount.value = scanlinesCount;
	    this.fsQuad = new Pass_js.FullScreenQuad(this.material);
	  }

	  render(renderer, writeBuffer, readBuffer, deltaTime
	  /*, maskActive */
	  ) {
	    this.uniforms['tDiffuse'].value = readBuffer.texture;
	    this.uniforms['time'].value += deltaTime;

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

	exports.FilmPass = FilmPass;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
