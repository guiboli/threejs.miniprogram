( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE));
})(this, (function (exports, three) { 'use strict';

	/**
	 * Colorify shader
	 */

	const ColorifyShader = {
	  uniforms: {
	    'tDiffuse': {
	      value: null
	    },
	    'color': {
	      value: new three.Color(0xffffff)
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

		uniform vec3 color;
		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );
			float v = dot( texel.xyz, luma );

			gl_FragColor = vec4( v * color, texel.w );

		}`
	};

	exports.ColorifyShader = ColorifyShader;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
