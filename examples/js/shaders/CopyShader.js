( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports ) :
			typeof define === 'function' && define.amd ? define( [ 'exports' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {} ) );

	} )( this, ( function ( exports ) {

		'use strict';

		/**
	 * Full-screen textured quad shader
	 */
		const CopyShader = {
	  uniforms: {
	    'tDiffuse': {
	      value: null
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

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;

		}`
		};

		exports.CopyShader = CopyShader;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
