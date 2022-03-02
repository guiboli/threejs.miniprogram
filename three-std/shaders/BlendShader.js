( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}));
})(this, (function (exports) { 'use strict';

	/**
	 * Blend two textures
	 */
	const BlendShader = {
	  uniforms: {
	    'tDiffuse1': {
	      value: null
	    },
	    'tDiffuse2': {
	      value: null
	    },
	    'mixRatio': {
	      value: 0.5
	    },
	    'opacity': {
	      value: 1.0
	    }
	  },
	  vertexShader:
	  /* glsl */
	  `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	  fragmentShader:
	  /* glsl */
	  `

		uniform float opacity;
		uniform float mixRatio;

		uniform sampler2D tDiffuse1;
		uniform sampler2D tDiffuse2;

		varying vec2 vUv;

		void main() {

			vec4 texel1 = texture2D( tDiffuse1, vUv );
			vec4 texel2 = texture2D( tDiffuse2, vUv );
			gl_FragColor = opacity * mix( texel1, texel2, mixRatio );

		}`
	};

	exports.BlendShader = BlendShader;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
