( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports ) :
			typeof define === 'function' && define.amd ? define( [ 'exports' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {} ) );

	} )( this, ( function ( exports ) {

		'use strict';

		/**
	 * Pixelation shader
	 */
		const PixelShader = {
	  uniforms: {
	    'tDiffuse': {
	      value: null
	    },
	    'resolution': {
	      value: null
	    },
	    'pixelSize': {
	      value: 1
	    }
	  },
	  vertexShader:
	  /* glsl */
	  `

		varying highp vec2 vUv;

			void main() {

				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	  fragmentShader:
	  /* glsl */
	  `

		uniform sampler2D tDiffuse;
		uniform float pixelSize;
		uniform vec2 resolution;

		varying highp vec2 vUv;

		void main(){

			vec2 dxy = pixelSize / resolution;
			vec2 coord = dxy * floor( vUv / dxy );
			gl_FragColor = texture2D(tDiffuse, coord);

		}`
		};

		exports.PixelShader = PixelShader;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
