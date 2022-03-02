!function(){var e,t;e=this,t=function(e,t,a){"use strict";let s;class r extends t.Loader{constructor(e,t={}){super(e),this.resourcePath=void 0!==t.resourcePath?t.resourcePath:""}load(e,a,s,r){const i=this,o=""===i.path?function(e,t){const a=e.indexOf(t);return-1===a?"./":e.slice(0,a)}(e,"Objects"):i.path,n=e.split(o).pop().split(".")[0],p=new t.FileLoader(this.manager);p.setPath(i.path),p.setResponseType("arraybuffer"),p.load(e,(function(t){try{a(i.parse(t,o,n))}catch(t){r?r(t):console.error(t),i.manager.itemError(e)}}),s,r)}parse(e,r,o){s=(new a.IFFParser).parse(e);const n=new t.TextureLoader(this.manager).setPath(this.resourcePath||r).setCrossOrigin(this.crossOrigin);return new i(n).parse(o)}}class i{constructor(e){this.textureLoader=e}parse(e){return this.materials=new o(this.textureLoader).parse(),this.defaultLayerName=e,this.meshes=this.parseLayers(),{materials:this.materials,meshes:this.meshes}}parseLayers(){const e=[],t=[],a=new n,r=this;return s.layers.forEach((function(s){const i=a.parse(s.geometry,s),o=r.parseMesh(i,s);e[s.number]=o,-1===s.parent?t.push(o):e[s.parent].add(o)})),this.applyPivots(t),t}parseMesh(e,a){let s;const r=this.getMaterials(e.userData.matNames,a.geometry.type);return this.duplicateUVs(e,r),s="points"===a.geometry.type?new t.Points(e,r):"lines"===a.geometry.type?new t.LineSegments(e,r):new t.Mesh(e,r),a.name?s.name=a.name:s.name=this.defaultLayerName+"_layer_"+a.number,s.userData.pivot=a.pivot,s}applyPivots(e){e.forEach((function(e){e.traverse((function(e){const t=e.userData.pivot;if(e.position.x+=t[0],e.position.y+=t[1],e.position.z+=t[2],e.parent){const t=e.parent.userData.pivot;e.position.x-=t[0],e.position.y-=t[1],e.position.z-=t[2]}}))}))}getMaterials(e,a){const s=[],r=this;e.forEach((function(e,t){s[t]=r.getMaterialByName(e)})),"points"!==a&&"lines"!==a||s.forEach((function(e,r){const i={color:e.color};"points"===a?(i.size=.1,i.map=e.map,s[r]=new t.PointsMaterial(i)):"lines"===a&&(s[r]=new t.LineBasicMaterial(i))}));const i=s.filter(Boolean);return 1===i.length?i[0]:s}getMaterialByName(e){return this.materials.filter((function(t){return t.name===e}))[0]}duplicateUVs(e,a){let s=!1;Array.isArray(a)?a.forEach((function(e){e.aoMap&&(s=!0)})):a.aoMap&&(s=!0),s&&e.setAttribute("uv2",new t.BufferAttribute(e.attributes.uv.array,2))}}class o{constructor(e){this.textureLoader=e}parse(){const e=[];this.textures={};for(const t in s.materials)"LWO3"===s.format?e.push(this.parseMaterial(s.materials[t],t,s.textures)):"LWO2"===s.format&&e.push(this.parseMaterialLwo2(s.materials[t],t,s.textures));return e}parseMaterial(e,t,a){let s={name:t,side:this.getSide(e.attributes),flatShading:this.getSmooth(e.attributes)};const r=this.parseConnections(e.connections,e.nodes),i=this.parseTextureNodes(r.maps);this.parseAttributeImageMaps(r.attributes,a,i,e.maps);const o=this.parseAttributes(r.attributes,i);return this.parseEnvMap(r,i,o),s=Object.assign(i,s),s=Object.assign(s,o),new(this.getMaterialType(r.attributes))(s)}parseMaterialLwo2(e,a){let s={name:a,side:this.getSide(e.attributes),flatShading:this.getSmooth(e.attributes)};const r=this.parseAttributes(e.attributes,{});return s=Object.assign(s,r),new t.MeshPhongMaterial(s)}getSide(e){if(!e.side)return t.BackSide;switch(e.side){case 0:case 1:return t.BackSide;case 2:return t.FrontSide;case 3:return t.DoubleSide}}getSmooth(e){return!e.smooth||!e.smooth}parseConnections(e,t){const a={maps:{}},s=e.inputName,r=e.inputNodeName,i=e.nodeName,o=this;return s.forEach((function(e,s){if("Material"===e){const e=o.getNodeByRefName(r[s],t);a.attributes=e.attributes,a.envMap=e.fileName,a.name=r[s]}})),i.forEach((function(e,i){e===a.name&&(a.maps[s[i]]=o.getNodeByRefName(r[i],t))})),a}getNodeByRefName(e,t){for(const a in t)if(t[a].refName===e)return t[a]}parseTextureNodes(e){const a={};for(const s in e){const r=e[s],i=r.fileName;if(!i)return;const o=this.loadTexture(i);switch(void 0!==r.widthWrappingMode&&(o.wrapS=this.getWrappingType(r.widthWrappingMode)),void 0!==r.heightWrappingMode&&(o.wrapT=this.getWrappingType(r.heightWrappingMode)),s){case"Color":a.map=o;break;case"Roughness":a.roughnessMap=o,a.roughness=1;break;case"Specular":a.specularMap=o,a.specular=16777215;break;case"Luminous":a.emissiveMap=o,a.emissive=8421504;break;case"Luminous Color":a.emissive=8421504;break;case"Metallic":a.metalnessMap=o,a.metalness=1;break;case"Transparency":case"Alpha":a.alphaMap=o,a.transparent=!0;break;case"Normal":a.normalMap=o,void 0!==r.amplitude&&(a.normalScale=new t.Vector2(r.amplitude,r.amplitude));break;case"Bump":a.bumpMap=o}}return a.roughnessMap&&a.specularMap&&delete a.specularMap,a}parseAttributeImageMaps(e,t,a){for(const s in e){const r=e[s];if(r.maps){const e=r.maps[0],i=this.getTexturePathByIndex(e.imageIndex,t);if(!i)return;const o=this.loadTexture(i);switch(void 0!==e.wrap&&(o.wrapS=this.getWrappingType(e.wrap.w)),void 0!==e.wrap&&(o.wrapT=this.getWrappingType(e.wrap.h)),s){case"Color":a.map=o;break;case"Diffuse":a.aoMap=o;break;case"Roughness":a.roughnessMap=o,a.roughness=1;break;case"Specular":a.specularMap=o,a.specular=16777215;break;case"Luminosity":a.emissiveMap=o,a.emissive=8421504;break;case"Metallic":a.metalnessMap=o,a.metalness=1;break;case"Transparency":case"Alpha":a.alphaMap=o,a.transparent=!0;break;case"Normal":a.normalMap=o;break;case"Bump":a.bumpMap=o}}}}parseAttributes(e,a){const s={};return e.Color&&!a.map?s.color=(new t.Color).fromArray(e.Color.value):s.color=new t.Color,e.Transparency&&0!==e.Transparency.value&&(s.opacity=1-e.Transparency.value,s.transparent=!0),e["Bump Height"]&&(s.bumpScale=.1*e["Bump Height"].value),e["Refraction Index"]&&(s.refractionRatio=.98/e["Refraction Index"].value),this.parsePhysicalAttributes(s,e,a),this.parseStandardAttributes(s,e,a),this.parsePhongAttributes(s,e,a),s}parsePhysicalAttributes(e,t){t.Clearcoat&&t.Clearcoat.value>0&&(e.clearcoat=t.Clearcoat.value,t["Clearcoat Gloss"]&&(e.clearcoatRoughness=.5*(1-t["Clearcoat Gloss"].value)))}parseStandardAttributes(e,a,s){a.Luminous&&(e.emissiveIntensity=a.Luminous.value,a["Luminous Color"]&&!s.emissive?e.emissive=(new t.Color).fromArray(a["Luminous Color"].value):e.emissive=new t.Color(8421504)),a.Roughness&&!s.roughnessMap&&(e.roughness=a.Roughness.value),a.Metallic&&!s.metalnessMap&&(e.metalness=a.Metallic.value)}parsePhongAttributes(e,a,s){a.Diffuse&&e.color.multiplyScalar(a.Diffuse.value),a.Reflection&&(e.reflectivity=a.Reflection.value,e.combine=t.AddOperation),a.Luminosity&&(e.emissiveIntensity=a.Luminosity.value,s.emissiveMap||s.map?e.emissive=new t.Color(8421504):e.emissive=e.color),a.Roughness||!a.Specular||s.specularMap||(a["Color Highlight"]?e.specular=(new t.Color).setScalar(a.Specular.value).lerp(e.color.clone().multiplyScalar(a.Specular.value),a["Color Highlight"].value):e.specular=(new t.Color).setScalar(a.Specular.value)),e.specular&&a.Glossiness&&(e.shininess=7+Math.pow(2,12*a.Glossiness.value+2))}parseEnvMap(e,a,s){if(e.envMap){const r=this.loadTexture(e.envMap);s.transparent&&s.opacity<.999?(r.mapping=t.EquirectangularRefractionMapping,void 0!==s.reflectivity&&(delete s.reflectivity,delete s.combine),void 0!==s.metalness&&(s.metalness=1),s.opacity=1):r.mapping=t.EquirectangularReflectionMapping,a.envMap=r}}getTexturePathByIndex(e){let t="";return s.textures?(s.textures.forEach((function(a){a.index===e&&(t=a.fileName)})),t):t}loadTexture(e){return e?this.textureLoader.load(e,void 0,void 0,(function(){console.warn("LWOLoader: non-standard resource hierarchy. Use `resourcePath` parameter to specify root content directory.")})):null}getWrappingType(e){switch(e){case 0:return console.warn('LWOLoader: "Reset" texture wrapping type is not supported in three.js'),t.ClampToEdgeWrapping;case 1:return t.RepeatWrapping;case 2:return t.MirroredRepeatWrapping;case 3:return t.ClampToEdgeWrapping}}getMaterialType(e){return e.Clearcoat&&e.Clearcoat.value>0?t.MeshPhysicalMaterial:e.Roughness?t.MeshStandardMaterial:t.MeshPhongMaterial}}class n{parse(e,a){const s=new t.BufferGeometry;s.setAttribute("position",new t.Float32BufferAttribute(e.points,3));const r=this.splitIndices(e.vertexIndices,e.polygonDimensions);return s.setIndex(r),this.parseGroups(s,e),s.computeVertexNormals(),this.parseUVs(s,a,r),this.parseMorphTargets(s,a,r),s.translate(-a.pivot[0],-a.pivot[1],-a.pivot[2]),s}splitIndices(e,t){const a=[];let s=0;return t.forEach((function(t){if(t<4)for(let r=0;r<t;r++)a.push(e[s+r]);else if(4===t)a.push(e[s],e[s+1],e[s+2],e[s],e[s+2],e[s+3]);else if(t>4){for(let r=1;r<t-1;r++)a.push(e[s],e[s+r],e[s+r+1]);console.warn("LWOLoader: polygons with greater than 4 sides are not supported")}s+=t})),a}parseGroups(e,t){const a=s.tags,r=[];let i=3;"lines"===t.type&&(i=2),"points"===t.type&&(i=1);const o=this.splitMaterialIndices(t.polygonDimensions,t.materialIndices);let n=0;const p={};let u,l,c=0,h=0;for(let t=0;t<o.length;t+=2){if(l=o[t+1],0===t&&(r[n]=a[l]),void 0===u&&(u=l),l!==u){let t;p[a[u]]?t=p[a[u]]:(t=n,p[a[u]]=n,r[n]=a[u],n++),e.addGroup(c,h,t),c+=h,u=l,h=0}h+=i}if(e.groups.length>0){let t;p[a[l]]?t=p[a[l]]:(t=n,p[a[l]]=n,r[n]=a[l]),e.addGroup(c,h,t)}e.userData.matNames=r}splitMaterialIndices(e,t){const a=[];return e.forEach((function(e,s){if(e<=3)a.push(t[2*s],t[2*s+1]);else if(4===e)a.push(t[2*s],t[2*s+1],t[2*s],t[2*s+1]);else for(let r=0;r<e-2;r++)a.push(t[2*s],t[2*s+1])})),a}parseUVs(e,a){const s=Array.from(Array(2*e.attributes.position.count),(function(){return 0}));for(const e in a.uvs){const t=a.uvs[e].uvs;a.uvs[e].uvIndices.forEach((function(e,a){s[2*e]=t[2*a],s[2*e+1]=t[2*a+1]}))}e.setAttribute("uv",new t.Float32BufferAttribute(s,2))}parseMorphTargets(e,a){let s=0;for(const r in a.morphTargets){const i=e.attributes.position.array.slice();e.morphAttributes.position||(e.morphAttributes.position=[]);const o=a.morphTargets[r].points,n=a.morphTargets[r].indices,p=a.morphTargets[r].type;n.forEach((function(e,t){"relative"===p?(i[3*e]+=o[3*t],i[3*e+1]+=o[3*t+1],i[3*e+2]+=o[3*t+2]):(i[3*e]=o[3*t],i[3*e+1]=o[3*t+1],i[3*e+2]=o[3*t+2])})),e.morphAttributes.position[s]=new t.Float32BufferAttribute(i,3),e.morphAttributes.position[s].name=r,s++}e.morphTargetsRelative=!1}}e.LWOLoader=r,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three"),require("./lwo/IFFParser.js")):"function"==typeof define&&define.amd?define(["exports","three","./lwo/IFFParser"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE,e.THREE)}();
