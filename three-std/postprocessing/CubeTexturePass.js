( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./Pass.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './Pass'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE));
})(this, (function (exports, three, Pass_js) { 'use strict';

	class CubeTexturePass extends Pass_js.Pass {
	  constructor(camera, envMap, opacity = 1) {
	    super();
	    this.camera = camera;
	    this.needsSwap = false;
	    this.cubeShader = three.ShaderLib['cube'];
	    this.cubeMesh = new three.Mesh(new three.BoxGeometry(10, 10, 10), new three.ShaderMaterial({
	      uniforms: three.UniformsUtils.clone(this.cubeShader.uniforms),
	      vertexShader: this.cubeShader.vertexShader,
	      fragmentShader: this.cubeShader.fragmentShader,
	      depthTest: false,
	      depthWrite: false,
	      side: three.BackSide
	    }));
	    Object.defineProperty(this.cubeMesh.material, 'envMap', {
	      get: function () {
	        return this.uniforms.envMap.value;
	      }
	    });
	    this.envMap = envMap;
	    this.opacity = opacity;
	    this.cubeScene = new three.Scene();
	    this.cubeCamera = new three.PerspectiveCamera();
	    this.cubeScene.add(this.cubeMesh);
	  }

	  render(renderer, writeBuffer, readBuffer
	  /*, deltaTime, maskActive*/
	  ) {
	    const oldAutoClear = renderer.autoClear;
	    renderer.autoClear = false;
	    this.cubeCamera.projectionMatrix.copy(this.camera.projectionMatrix);
	    this.cubeCamera.quaternion.setFromRotationMatrix(this.camera.matrixWorld);
	    this.cubeMesh.material.uniforms.envMap.value = this.envMap;
	    this.cubeMesh.material.uniforms.flipEnvMap.value = this.envMap.isCubeTexture && this.envMap.isRenderTargetTexture === false ? -1 : 1;
	    this.cubeMesh.material.uniforms.opacity.value = this.opacity;
	    this.cubeMesh.material.transparent = this.opacity < 1.0;
	    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
	    if (this.clear) renderer.clear();
	    renderer.render(this.cubeScene, this.cubeCamera);
	    renderer.autoClear = oldAutoClear;
	  }

	}

	exports.CubeTexturePass = CubeTexturePass;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
