( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE ) );

	} )( this, ( function ( exports, three ) {

		'use strict';

		/**
	 * Normal map shader
	 * - compute normals from heightmap
	 */

		const NormalMapShader = {
	  uniforms: {
	    'heightMap': {
	      value: null
	    },
	    'resolution': {
	      value: new three.Vector2( 512, 512 )
	    },
	    'scale': {
	      value: new three.Vector2( 1, 1 )
	    },
	    'height': {
	      value: 0.05
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

		uniform float height;
		uniform vec2 resolution;
		uniform sampler2D heightMap;

		varying vec2 vUv;

		void main() {

			float val = texture2D( heightMap, vUv ).x;

			float valU = texture2D( heightMap, vUv + vec2( 1.0 / resolution.x, 0.0 ) ).x;
			float valV = texture2D( heightMap, vUv + vec2( 0.0, 1.0 / resolution.y ) ).x;

			gl_FragColor = vec4( ( 0.5 * normalize( vec3( val - valU, val - valV, height  ) ) + 0.5 ), 1.0 );

		}`
		};

		exports.NormalMapShader = NormalMapShader;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
