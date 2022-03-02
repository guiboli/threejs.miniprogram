( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE));
})(this, (function (exports, three) { 'use strict';

	/**
	 * `PackedPhongMaterial` inherited from THREE.MeshPhongMaterial
	 *
	 * @param {Object} parameters
	 */

	class PackedPhongMaterial extends three.MeshPhongMaterial {
	  constructor(parameters) {
	    super();
	    this.defines = {};
	    this.type = 'PackedPhongMaterial';
	    this.uniforms = three.UniformsUtils.merge([three.ShaderLib.phong.uniforms, {
	      quantizeMatPos: {
	        value: null
	      },
	      quantizeMatUV: {
	        value: null
	      }
	    }]);
	    this.vertexShader = ['#define PHONG', 'varying vec3 vViewPosition;', three.ShaderChunk.common, three.ShaderChunk.uv_pars_vertex, three.ShaderChunk.uv2_pars_vertex, three.ShaderChunk.displacementmap_pars_vertex, three.ShaderChunk.envmap_pars_vertex, three.ShaderChunk.color_pars_vertex, three.ShaderChunk.fog_pars_vertex, three.ShaderChunk.normal_pars_vertex, three.ShaderChunk.morphtarget_pars_vertex, three.ShaderChunk.skinning_pars_vertex, three.ShaderChunk.shadowmap_pars_vertex, three.ShaderChunk.logdepthbuf_pars_vertex, three.ShaderChunk.clipping_planes_pars_vertex, `#ifdef USE_PACKED_NORMAL
					#if USE_PACKED_NORMAL == 0
						vec3 decodeNormal(vec3 packedNormal)
						{
							float x = packedNormal.x * 2.0 - 1.0;
							float y = packedNormal.y * 2.0 - 1.0;
							vec2 scth = vec2(sin(x * PI), cos(x * PI));
							vec2 scphi = vec2(sqrt(1.0 - y * y), y);
							return normalize( vec3(scth.y * scphi.x, scth.x * scphi.x, scphi.y) );
						}
					#endif

					#if USE_PACKED_NORMAL == 1
						vec3 decodeNormal(vec3 packedNormal)
						{
							vec3 v = vec3(packedNormal.xy, 1.0 - abs(packedNormal.x) - abs(packedNormal.y));
							if (v.z < 0.0)
							{
								v.xy = (1.0 - abs(v.yx)) * vec2((v.x >= 0.0) ? +1.0 : -1.0, (v.y >= 0.0) ? +1.0 : -1.0);
							}
							return normalize(v);
						}
					#endif

					#if USE_PACKED_NORMAL == 2
						vec3 decodeNormal(vec3 packedNormal)
						{
							vec3 v = (packedNormal * 2.0) - 1.0;
							return normalize(v);
						}
					#endif
				#endif`, `#ifdef USE_PACKED_POSITION
					#if USE_PACKED_POSITION == 0
						uniform mat4 quantizeMatPos;
					#endif
				#endif`, `#ifdef USE_PACKED_UV
					#if USE_PACKED_UV == 1
						uniform mat3 quantizeMatUV;
					#endif
				#endif`, `#ifdef USE_PACKED_UV
					#if USE_PACKED_UV == 0
						vec2 decodeUV(vec2 packedUV)
						{
							vec2 uv = (packedUV * 2.0) - 1.0;
							return uv;
						}
					#endif

					#if USE_PACKED_UV == 1
						vec2 decodeUV(vec2 packedUV)
						{
							vec2 uv = ( vec3(packedUV, 1.0) * quantizeMatUV ).xy;
							return uv;
						}
					#endif
				#endif`, 'void main() {', three.ShaderChunk.uv_vertex, `#ifdef USE_UV
					#ifdef USE_PACKED_UV
						vUv = decodeUV(vUv);
					#endif
				#endif`, three.ShaderChunk.uv2_vertex, three.ShaderChunk.color_vertex, three.ShaderChunk.beginnormal_vertex, `#ifdef USE_PACKED_NORMAL
					objectNormal = decodeNormal(objectNormal);
				#endif

				#ifdef USE_TANGENT
					vec3 objectTangent = vec3( tangent.xyz );
				#endif
				`, three.ShaderChunk.morphnormal_vertex, three.ShaderChunk.skinbase_vertex, three.ShaderChunk.skinnormal_vertex, three.ShaderChunk.defaultnormal_vertex, three.ShaderChunk.normal_vertex, three.ShaderChunk.begin_vertex, `#ifdef USE_PACKED_POSITION
					#if USE_PACKED_POSITION == 0
						transformed = ( vec4(transformed, 1.0) * quantizeMatPos ).xyz;
					#endif
				#endif`, three.ShaderChunk.morphtarget_vertex, three.ShaderChunk.skinning_vertex, three.ShaderChunk.displacementmap_vertex, three.ShaderChunk.project_vertex, three.ShaderChunk.logdepthbuf_vertex, three.ShaderChunk.clipping_planes_vertex, 'vViewPosition = - mvPosition.xyz;', three.ShaderChunk.worldpos_vertex, three.ShaderChunk.envmap_vertex, three.ShaderChunk.shadowmap_vertex, three.ShaderChunk.fog_vertex, '}'].join('\n'); // Use the original MeshPhongMaterial's fragmentShader.

	    this.fragmentShader = ['#define PHONG', 'uniform vec3 diffuse;', 'uniform vec3 emissive;', 'uniform vec3 specular;', 'uniform float shininess;', 'uniform float opacity;', three.ShaderChunk.common, three.ShaderChunk.packing, three.ShaderChunk.dithering_pars_fragment, three.ShaderChunk.color_pars_fragment, three.ShaderChunk.uv_pars_fragment, three.ShaderChunk.uv2_pars_fragment, three.ShaderChunk.map_pars_fragment, three.ShaderChunk.alphamap_pars_fragment, three.ShaderChunk.aomap_pars_fragment, three.ShaderChunk.lightmap_pars_fragment, three.ShaderChunk.emissivemap_pars_fragment, three.ShaderChunk.envmap_common_pars_fragment, three.ShaderChunk.envmap_pars_fragment, three.ShaderChunk.cube_uv_reflection_fragment, three.ShaderChunk.fog_pars_fragment, three.ShaderChunk.bsdfs, three.ShaderChunk.lights_pars_begin, three.ShaderChunk.normal_pars_fragment, three.ShaderChunk.lights_phong_pars_fragment, three.ShaderChunk.shadowmap_pars_fragment, three.ShaderChunk.bumpmap_pars_fragment, three.ShaderChunk.normalmap_pars_fragment, three.ShaderChunk.specularmap_pars_fragment, three.ShaderChunk.logdepthbuf_pars_fragment, three.ShaderChunk.clipping_planes_pars_fragment, 'void main() {', three.ShaderChunk.clipping_planes_fragment, 'vec4 diffuseColor = vec4( diffuse, opacity );', 'ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );', 'vec3 totalEmissiveRadiance = emissive;', three.ShaderChunk.logdepthbuf_fragment, three.ShaderChunk.map_fragment, three.ShaderChunk.color_fragment, three.ShaderChunk.alphamap_fragment, three.ShaderChunk.alphatest_fragment, three.ShaderChunk.specularmap_fragment, three.ShaderChunk.normal_fragment_begin, three.ShaderChunk.normal_fragment_maps, three.ShaderChunk.emissivemap_fragment, // accumulation
	    three.ShaderChunk.lights_phong_fragment, three.ShaderChunk.lights_fragment_begin, three.ShaderChunk.lights_fragment_maps, three.ShaderChunk.lights_fragment_end, // modulation
	    three.ShaderChunk.aomap_fragment, 'vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;', three.ShaderChunk.envmap_fragment, 'gl_FragColor = vec4( outgoingLight, diffuseColor.a );', three.ShaderChunk.tonemapping_fragment, three.ShaderChunk.encodings_fragment, three.ShaderChunk.fog_fragment, three.ShaderChunk.premultiplied_alpha_fragment, three.ShaderChunk.dithering_fragment, '}'].join('\n');
	    this.setValues(parameters);
	  }

	}

	exports.PackedPhongMaterial = PackedPhongMaterial;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
