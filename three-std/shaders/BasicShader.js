( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}));
})(this, (function (exports) { 'use strict';

	/**
	 * Simple test shader
	 */
	const BasicShader = {
	  uniforms: {},
	  vertexShader:
	  /* glsl */
	  `

		void main() {

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	  fragmentShader:
	  /* glsl */
	  `

		void main() {

			gl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );

		}`
	};

	exports.BasicShader = BasicShader;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
