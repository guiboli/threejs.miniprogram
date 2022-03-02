( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports ) :
			typeof define === 'function' && define.amd ? define( [ 'exports' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {} ) );

	} )( this, ( function ( exports ) {

		'use strict';

		/**
	 * Gamma Correction Shader
	 * http://en.wikipedia.org/wiki/gamma_correction
	 */
		const GammaCorrectionShader = {
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

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 tex = texture2D( tDiffuse, vUv );

			gl_FragColor = LinearTosRGB( tex );

		}`
		};

		exports.GammaCorrectionShader = GammaCorrectionShader;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
