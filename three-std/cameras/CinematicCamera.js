( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('../shaders/BokehShader2.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', '../shaders/BokehShader2'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE));
})(this, (function (exports, three, BokehShader2_js) { 'use strict';

	class CinematicCamera extends three.PerspectiveCamera {
	  constructor(fov, aspect, near, far) {
	    super(fov, aspect, near, far);
	    this.type = 'CinematicCamera';
	    this.postprocessing = {
	      enabled: true
	    };
	    this.shaderSettings = {
	      rings: 3,
	      samples: 4
	    };
	    const depthShader = BokehShader2_js.BokehDepthShader;
	    this.materialDepth = new three.ShaderMaterial({
	      uniforms: depthShader.uniforms,
	      vertexShader: depthShader.vertexShader,
	      fragmentShader: depthShader.fragmentShader
	    });
	    this.materialDepth.uniforms['mNear'].value = near;
	    this.materialDepth.uniforms['mFar'].value = far; // In case of cinematicCamera, having a default lens set is important

	    this.setLens();
	    this.initPostProcessing();
	  } // providing fnumber and coc(Circle of Confusion) as extra arguments
	  // In case of cinematicCamera, having a default lens set is important
	  // if fnumber and coc are not provided, cinematicCamera tries to act as a basic PerspectiveCamera


	  setLens(focalLength = 35, filmGauge = 35, fNumber = 8, coc = 0.019) {
	    this.filmGauge = filmGauge;
	    this.setFocalLength(focalLength);
	    this.fNumber = fNumber;
	    this.coc = coc; // fNumber is focalLength by aperture

	    this.aperture = focalLength / this.fNumber; // hyperFocal is required to calculate depthOfField when a lens tries to focus at a distance with given fNumber and focalLength

	    this.hyperFocal = focalLength * focalLength / (this.aperture * this.coc);
	  }

	  linearize(depth) {
	    const zfar = this.far;
	    const znear = this.near;
	    return -zfar * znear / (depth * (zfar - znear) - zfar);
	  }

	  smoothstep(near, far, depth) {
	    const x = this.saturate((depth - near) / (far - near));
	    return x * x * (3 - 2 * x);
	  }

	  saturate(x) {
	    return Math.max(0, Math.min(1, x));
	  } // function for focusing at a distance from the camera


	  focusAt(focusDistance = 20) {
	    const focalLength = this.getFocalLength(); // distance from the camera (normal to frustrum) to focus on

	    this.focus = focusDistance; // the nearest point from the camera which is in focus (unused)

	    this.nearPoint = this.hyperFocal * this.focus / (this.hyperFocal + (this.focus - focalLength)); // the farthest point from the camera which is in focus (unused)

	    this.farPoint = this.hyperFocal * this.focus / (this.hyperFocal - (this.focus - focalLength)); // the gap or width of the space in which is everything is in focus (unused)

	    this.depthOfField = this.farPoint - this.nearPoint; // Considering minimum distance of focus for a standard lens (unused)

	    if (this.depthOfField < 0) this.depthOfField = 0;
	    this.sdistance = this.smoothstep(this.near, this.far, this.focus);
	    this.ldistance = this.linearize(1 - this.sdistance);
	    this.postprocessing.bokeh_uniforms['focalDepth'].value = this.ldistance;
	  }

	  initPostProcessing() {
	    if (this.postprocessing.enabled) {
	      this.postprocessing.scene = new three.Scene();
	      this.postprocessing.camera = new three.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -10000, 10000);
	      this.postprocessing.scene.add(this.postprocessing.camera);
	      this.postprocessing.rtTextureDepth = new three.WebGLRenderTarget(window.innerWidth, window.innerHeight);
	      this.postprocessing.rtTextureColor = new three.WebGLRenderTarget(window.innerWidth, window.innerHeight);
	      const bokeh_shader = BokehShader2_js.BokehShader;
	      this.postprocessing.bokeh_uniforms = three.UniformsUtils.clone(bokeh_shader.uniforms);
	      this.postprocessing.bokeh_uniforms['tColor'].value = this.postprocessing.rtTextureColor.texture;
	      this.postprocessing.bokeh_uniforms['tDepth'].value = this.postprocessing.rtTextureDepth.texture;
	      this.postprocessing.bokeh_uniforms['manualdof'].value = 0;
	      this.postprocessing.bokeh_uniforms['shaderFocus'].value = 0;
	      this.postprocessing.bokeh_uniforms['fstop'].value = 2.8;
	      this.postprocessing.bokeh_uniforms['showFocus'].value = 1;
	      this.postprocessing.bokeh_uniforms['focalDepth'].value = 0.1; //console.log( this.postprocessing.bokeh_uniforms[ "focalDepth" ].value );

	      this.postprocessing.bokeh_uniforms['znear'].value = this.near;
	      this.postprocessing.bokeh_uniforms['zfar'].value = this.near;
	      this.postprocessing.bokeh_uniforms['textureWidth'].value = window.innerWidth;
	      this.postprocessing.bokeh_uniforms['textureHeight'].value = window.innerHeight;
	      this.postprocessing.materialBokeh = new three.ShaderMaterial({
	        uniforms: this.postprocessing.bokeh_uniforms,
	        vertexShader: bokeh_shader.vertexShader,
	        fragmentShader: bokeh_shader.fragmentShader,
	        defines: {
	          RINGS: this.shaderSettings.rings,
	          SAMPLES: this.shaderSettings.samples,
	          DEPTH_PACKING: 1
	        }
	      });
	      this.postprocessing.quad = new three.Mesh(new three.PlaneGeometry(window.innerWidth, window.innerHeight), this.postprocessing.materialBokeh);
	      this.postprocessing.quad.position.z = -500;
	      this.postprocessing.scene.add(this.postprocessing.quad);
	    }
	  }

	  renderCinematic(scene, renderer) {
	    if (this.postprocessing.enabled) {
	      const currentRenderTarget = renderer.getRenderTarget();
	      renderer.clear(); // Render scene into texture

	      scene.overrideMaterial = null;
	      renderer.setRenderTarget(this.postprocessing.rtTextureColor);
	      renderer.clear();
	      renderer.render(scene, this); // Render depth into texture

	      scene.overrideMaterial = this.materialDepth;
	      renderer.setRenderTarget(this.postprocessing.rtTextureDepth);
	      renderer.clear();
	      renderer.render(scene, this); // Render bokeh composite

	      renderer.setRenderTarget(null);
	      renderer.render(this.postprocessing.scene, this.postprocessing.camera);
	      renderer.setRenderTarget(currentRenderTarget);
	    }
	  }

	}

	exports.CinematicCamera = CinematicCamera;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
