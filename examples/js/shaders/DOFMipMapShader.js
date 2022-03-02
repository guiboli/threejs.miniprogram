( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports ) :
			typeof define === 'function' && define.amd ? define( [ 'exports' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {} ) );

	} )( this, ( function ( exports ) {

		'use strict';

		/**
	 * Depth-of-field shader using mipmaps
	 * - from Matt Handley @applmak
	 * - requires power-of-2 sized render target with enabled mipmaps
	 */
		const DOFMipMapShader = {
	  uniforms: {
	    'tColor': {
	      value: null
	    },
	    'tDepth': {
	      value: null
	    },
	    'focus': {
	      value: 1.0
	    },
	    'maxblur': {
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

		uniform float focus;
		uniform float maxblur;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		varying vec2 vUv;

		void main() {

			vec4 depth = texture2D( tDepth, vUv );

			float factor = depth.x - focus;

			vec4 col = texture2D( tColor, vUv, 2.0 * maxblur * abs( focus - depth.x ) );

			gl_FragColor = col;
			gl_FragColor.a = 1.0;

		}`
		};

		exports.DOFMipMapShader = DOFMipMapShader;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
