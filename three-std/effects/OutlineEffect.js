!function(){var e,t;e=this,t=function(e,t){"use strict";e.OutlineEffect=class{constructor(e,i={}){this.enabled=!0;const n=void 0!==i.defaultThickness?i.defaultThickness:.003,a=(new t.Color).fromArray(void 0!==i.defaultColor?i.defaultColor:[0,0,0]),r=void 0!==i.defaultAlpha?i.defaultAlpha:1,l=void 0!==i.defaultKeepAlive&&i.defaultKeepAlive,o={},s={},u={},d={outlineThickness:{value:n},outlineColor:{value:a},outlineAlpha:{value:r}},c=["#include <common>","#include <uv_pars_vertex>","#include <displacementmap_pars_vertex>","#include <fog_pars_vertex>","#include <morphtarget_pars_vertex>","#include <skinning_pars_vertex>","#include <logdepthbuf_pars_vertex>","#include <clipping_planes_pars_vertex>","uniform float outlineThickness;","vec4 calculateOutline( vec4 pos, vec3 normal, vec4 skinned ) {","\tfloat thickness = outlineThickness;","\tconst float ratio = 1.0;","\tvec4 pos2 = projectionMatrix * modelViewMatrix * vec4( skinned.xyz + normal, 1.0 );","\tvec4 norm = normalize( pos - pos2 );","\treturn pos + norm * thickness * pos.w * ratio;","}","void main() {","\t#include <uv_vertex>","\t#include <beginnormal_vertex>","\t#include <morphnormal_vertex>","\t#include <skinbase_vertex>","\t#include <skinnormal_vertex>","\t#include <begin_vertex>","\t#include <morphtarget_vertex>","\t#include <skinning_vertex>","\t#include <displacementmap_vertex>","\t#include <project_vertex>","\tvec3 outlineNormal = - objectNormal;","\tgl_Position = calculateOutline( gl_Position, outlineNormal, vec4( transformed, 1.0 ) );","\t#include <logdepthbuf_vertex>","\t#include <clipping_planes_vertex>","\t#include <fog_vertex>","}"].join("\n"),p=["#include <common>","#include <fog_pars_fragment>","#include <logdepthbuf_pars_fragment>","#include <clipping_planes_pars_fragment>","uniform vec3 outlineColor;","uniform float outlineAlpha;","void main() {","\t#include <clipping_planes_fragment>","\t#include <logdepthbuf_fragment>","\tgl_FragColor = vec4( outlineColor, outlineAlpha );","\t#include <tonemapping_fragment>","\t#include <encodings_fragment>","\t#include <fog_fragment>","\t#include <premultiplied_alpha_fragment>","}"].join("\n");function f(e){const i=function(e){let i=o[e.uuid];return void 0===i&&(i={material:new t.ShaderMaterial({type:"OutlineEffect",uniforms:t.UniformsUtils.merge([t.UniformsLib.fog,t.UniformsLib.displacementmap,d]),vertexShader:c,fragmentShader:p,side:t.BackSide}),used:!0,keepAlive:l,count:0},o[e.uuid]=i),i.used=!0,i.material}(e);return s[i.uuid]=e,function(e,t){if("invisible"===e.name)return;const i=t.userData.outlineParameters;e.fog=t.fog,e.toneMapped=t.toneMapped,e.premultipliedAlpha=t.premultipliedAlpha,e.displacementMap=t.displacementMap,void 0!==i?(!1===t.visible?e.visible=!1:e.visible=void 0===i.visible||i.visible,e.transparent=void 0!==i.alpha&&i.alpha<1||t.transparent,void 0!==i.keepAlive&&(o[t.uuid].keepAlive=i.keepAlive)):(e.transparent=t.transparent,e.visible=t.visible),!0!==t.wireframe&&!1!==t.depthTest||(e.visible=!1),t.clippingPlanes&&(e.clipping=!0,e.clippingPlanes=t.clippingPlanes,e.clipIntersection=t.clipIntersection,e.clipShadows=t.clipShadows),e.version=t.version}(i,e),i}function m(e){const t=e.geometry;let i=!1;return void 0!==e.geometry&&(i=!t.isBufferGeometry||void 0!==t.attributes.normal),!0===e.isMesh&&void 0!==e.material&&!0===i}function v(e){if(!1!==m(e)){if(Array.isArray(e.material))for(let t=0,i=e.material.length;t<i;t++)e.material[t]=f(e.material[t]);else e.material=f(e.material);u[e.uuid]=e.onBeforeRender,e.onBeforeRender=g}}function h(e){if(!1!==m(e)){if(Array.isArray(e.material))for(let t=0,i=e.material.length;t<i;t++)e.material[t]=s[e.material[t].uuid];else e.material=s[e.material.uuid];e.onBeforeRender=u[e.uuid]}}function g(e,t,i,n,a){const r=s[a.uuid];void 0!==r&&function(e,t){const i=t.userData.outlineParameters;e.uniforms.outlineAlpha.value=t.opacity,void 0!==i&&(void 0!==i.thickness&&(e.uniforms.outlineThickness.value=i.thickness),void 0!==i.color&&e.uniforms.outlineColor.value.fromArray(i.color),void 0!==i.alpha&&(e.uniforms.outlineAlpha.value=i.alpha)),t.displacementMap&&(e.uniforms.displacementMap.value=t.displacementMap,e.uniforms.displacementScale.value=t.displacementScale,e.uniforms.displacementBias.value=t.displacementBias)}(a,r)}this.render=function(t,i){let n,a=!1;if(void 0!==arguments[2]&&(console.warn("THREE.OutlineEffect.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."),n=arguments[2]),void 0!==arguments[3]&&(console.warn("THREE.OutlineEffect.render(): the forceClear argument has been removed. Use .clear() instead."),a=arguments[3]),void 0!==n&&e.setRenderTarget(n),a&&e.clear(),!1===this.enabled)return void e.render(t,i);const r=e.autoClear;e.autoClear=this.autoClear,e.render(t,i),e.autoClear=r,this.renderOutline(t,i)},this.renderOutline=function(t,i){const n=e.autoClear,a=t.autoUpdate,r=t.background,l=e.shadowMap.enabled;t.autoUpdate=!1,t.background=null,e.autoClear=!1,e.shadowMap.enabled=!1,t.traverse(v),e.render(t,i),t.traverse(h),function(){let e;e=Object.keys(s);for(let t=0,i=e.length;t<i;t++)s[e[t]]=void 0;e=Object.keys(u);for(let t=0,i=e.length;t<i;t++)u[e[t]]=void 0;e=Object.keys(o);for(let t=0,i=e.length;t<i;t++){const i=e[t];!1===o[i].used?(o[i].count++,!1===o[i].keepAlive&&o[i].count>60&&delete o[i]):(o[i].used=!1,o[i].count=0)}}(),t.autoUpdate=a,t.background=r,e.autoClear=n,e.shadowMap.enabled=l},this.autoClear=e.autoClear,this.domElement=e.domElement,this.shadowMap=e.shadowMap,this.clear=function(t,i,n){e.clear(t,i,n)},this.getPixelRatio=function(){return e.getPixelRatio()},this.setPixelRatio=function(t){e.setPixelRatio(t)},this.getSize=function(t){return e.getSize(t)},this.setSize=function(t,i,n){e.setSize(t,i,n)},this.setViewport=function(t,i,n,a){e.setViewport(t,i,n,a)},this.setScissor=function(t,i,n,a){e.setScissor(t,i,n,a)},this.setScissorTest=function(t){e.setScissorTest(t)},this.setRenderTarget=function(t){e.setRenderTarget(t)}}},Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();