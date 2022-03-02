( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}));
})(this, (function (exports) { 'use strict';

	/**
	 * Luminosity
	 * http://en.wikipedia.org/wiki/Luminosity
	 */
	const LuminosityShader = {
	  uniforms: {
	    'tDiffuse': {
	      value: null
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

		#include <common>

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float l = linearToRelativeLuminance( texel.rgb );

			gl_FragColor = vec4( l, l, l, texel.w );

		}`
	};

	exports.LuminosityShader = LuminosityShader;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
