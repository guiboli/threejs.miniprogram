( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports ) :
			typeof define === 'function' && define.amd ? define( [ 'exports' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {} ) );

	} )( this, ( function ( exports ) {

		'use strict';

		/**
	 * Unpack RGBA depth shader
	 * - show RGBA encoded depth as monochrome color
	 */
		const UnpackDepthRGBAShader = {
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

		#include <packing>

		void main() {

			float depth = 1.0 - unpackRGBAToDepth( texture2D( tDiffuse, vUv ) );
			gl_FragColor = vec4( vec3( depth ), opacity );

		}`
		};

		exports.UnpackDepthRGBAShader = UnpackDepthRGBAShader;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
