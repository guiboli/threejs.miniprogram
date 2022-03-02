( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE ) );

	} )( this, ( function ( exports, three ) {

		'use strict';

		/**
	 * Luminosity
	 * http://en.wikipedia.org/wiki/Luminosity
	 */

		const LuminosityHighPassShader = {
	  shaderID: 'luminosityHighPass',
	  uniforms: {
	    'tDiffuse': {
	      value: null
	    },
	    'luminosityThreshold': {
	      value: 1.0
	    },
	    'smoothWidth': {
	      value: 1.0
	    },
	    'defaultColor': {
	      value: new three.Color( 0x000000 )
	    },
	    'defaultOpacity': {
	      value: 0.0
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
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
		};

		exports.LuminosityHighPassShader = LuminosityHighPassShader;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
