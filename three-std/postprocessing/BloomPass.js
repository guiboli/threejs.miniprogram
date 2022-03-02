( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./Pass.js'), require('../shaders/CopyShader.js'), require('../shaders/ConvolutionShader.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './Pass', '../shaders/CopyShader', '../shaders/ConvolutionShader'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE, global.THREE, global.THREE));
})(this, (function (exports, three, Pass_js, CopyShader_js, ConvolutionShader_js) { 'use strict';

	class BloomPass extends Pass_js.Pass {
	  constructor(strength = 1, kernelSize = 25, sigma = 4, resolution = 256) {
	    super(); // render targets

	    const pars = {
	      minFilter: three.LinearFilter,
	      magFilter: three.LinearFilter,
	      format: three.RGBAFormat
	    };
	    this.renderTargetX = new three.WebGLRenderTarget(resolution, resolution, pars);
	    this.renderTargetX.texture.name = 'BloomPass.x';
	    this.renderTargetY = new three.WebGLRenderTarget(resolution, resolution, pars);
	    this.renderTargetY.texture.name = 'BloomPass.y'; // copy material

	    if (CopyShader_js.CopyShader === undefined) console.error('THREE.BloomPass relies on CopyShader');
	    const copyShader = CopyShader_js.CopyShader;
	    this.copyUniforms = three.UniformsUtils.clone(copyShader.uniforms);
	    this.copyUniforms['opacity'].value = strength;
	    this.materialCopy = new three.ShaderMaterial({
	      uniforms: this.copyUniforms,
	      vertexShader: copyShader.vertexShader,
	      fragmentShader: copyShader.fragmentShader,
	      blending: three.AdditiveBlending,
	      transparent: true
	    }); // convolution material

	    if (ConvolutionShader_js.ConvolutionShader === undefined) console.error('THREE.BloomPass relies on ConvolutionShader');
	    const convolutionShader = ConvolutionShader_js.ConvolutionShader;
	    this.convolutionUniforms = three.UniformsUtils.clone(convolutionShader.uniforms);
	    this.convolutionUniforms['uImageIncrement'].value = BloomPass.blurX;
	    this.convolutionUniforms['cKernel'].value = ConvolutionShader_js.ConvolutionShader.buildKernel(sigma);
	    this.materialConvolution = new three.ShaderMaterial({
	      uniforms: this.convolutionUniforms,
	      vertexShader: convolutionShader.vertexShader,
	      fragmentShader: convolutionShader.fragmentShader,
	      defines: {
	        'KERNEL_SIZE_FLOAT': kernelSize.toFixed(1),
	        'KERNEL_SIZE_INT': kernelSize.toFixed(0)
	      }
	    });
	    this.needsSwap = false;
	    this.fsQuad = new Pass_js.FullScreenQuad(null);
	  }

	  render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
	    if (maskActive) renderer.state.buffers.stencil.setTest(false); // Render quad with blured scene into texture (convolution pass 1)

	    this.fsQuad.material = this.materialConvolution;
	    this.convolutionUniforms['tDiffuse'].value = readBuffer.texture;
	    this.convolutionUniforms['uImageIncrement'].value = BloomPass.blurX;
	    renderer.setRenderTarget(this.renderTargetX);
	    renderer.clear();
	    this.fsQuad.render(renderer); // Render quad with blured scene into texture (convolution pass 2)

	    this.convolutionUniforms['tDiffuse'].value = this.renderTargetX.texture;
	    this.convolutionUniforms['uImageIncrement'].value = BloomPass.blurY;
	    renderer.setRenderTarget(this.renderTargetY);
	    renderer.clear();
	    this.fsQuad.render(renderer); // Render original scene with superimposed blur to texture

	    this.fsQuad.material = this.materialCopy;
	    this.copyUniforms['tDiffuse'].value = this.renderTargetY.texture;
	    if (maskActive) renderer.state.buffers.stencil.setTest(true);
	    renderer.setRenderTarget(readBuffer);
	    if (this.clear) renderer.clear();
	    this.fsQuad.render(renderer);
	  }

	}

	BloomPass.blurX = new three.Vector2(0.001953125, 0.0);
	BloomPass.blurY = new three.Vector2(0.0, 0.001953125);

	exports.BloomPass = BloomPass;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
