!function(){var e,t;e=this,t=function(e,t){"use strict";class s extends t.Loader{constructor(e){super(e)}load(e,s,r,a){const i=this,o=""===this.path?t.LoaderUtils.extractUrlBase(e):this.path,n=new t.FileLoader(this.manager);n.setPath(this.path),n.setRequestHeader(this.requestHeader),n.setWithCredentials(this.withCredentials),n.load(e,(function(t){try{s(i.parse(t,o))}catch(t){a?a(t):console.error(t),i.manager.itemError(e)}}),r,a)}setMaterialOptions(e){return this.materialOptions=e,this}parse(e,t){const s=e.split("\n");let a={};const i=/\s+/,o={};for(let e=0;e<s.length;e++){let t=s[e];if(t=t.trim(),0===t.length||"#"===t.charAt(0))continue;const r=t.indexOf(" ");let n=r>=0?t.substring(0,r):t;n=n.toLowerCase();let l=r>=0?t.substring(r+1):"";if(l=l.trim(),"newmtl"===n)a={name:l},o[l]=a;else if("ka"===n||"kd"===n||"ks"===n||"ke"===n){const e=l.split(i,3);a[n]=[parseFloat(e[0]),parseFloat(e[1]),parseFloat(e[2])]}else a[n]=l}const n=new r(this.resourcePath||t,this.materialOptions);return n.setCrossOrigin(this.crossOrigin),n.setManager(this.manager),n.setMaterials(o),n}}class r{constructor(e="",s={}){this.baseUrl=e,this.options=s,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.side=void 0!==this.options.side?this.options.side:t.FrontSide,this.wrap=void 0!==this.options.wrap?this.options.wrap:t.RepeatWrapping}setCrossOrigin(e){return this.crossOrigin=e,this}setManager(e){this.manager=e}setMaterials(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}}convert(e){if(!this.options)return e;const t={};for(const s in e){const r=e[s],a={};t[s]=a;for(const e in r){let t=!0,s=r[e];const i=e.toLowerCase();switch(i){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(s=[s[0]/255,s[1]/255,s[2]/255]),this.options&&this.options.ignoreZeroRGBs&&0===s[0]&&0===s[1]&&0===s[2]&&(t=!1)}t&&(a[i]=s)}}return t}preload(){for(const e in this.materialsInfo)this.create(e)}getIndex(e){return this.nameLookup[e]}getAsArray(){let e=0;for(const t in this.materialsInfo)this.materialsArray[e]=this.create(t),this.nameLookup[t]=e,e++;return this.materialsArray}create(e){return void 0===this.materials[e]&&this.createMaterial_(e),this.materials[e]}createMaterial_(e){const s=this,r=this.materialsInfo[e],a={name:e,side:this.side};function i(e,r){if(a[e])return;const i=s.getTextureParams(r,a),o=s.loadTexture((n=s.baseUrl,"string"!=typeof(l=i.url)||""===l?"":/^https?:\/\//i.test(l)?l:n+l));var n,l;o.repeat.copy(i.scale),o.offset.copy(i.offset),o.wrapS=s.wrap,o.wrapT=s.wrap,"map"!==e&&"emissiveMap"!==e||(o.encoding=t.sRGBEncoding),a[e]=o}for(const e in r){const s=r[e];let o;if(""!==s)switch(e.toLowerCase()){case"kd":a.color=(new t.Color).fromArray(s).convertSRGBToLinear();break;case"ks":a.specular=(new t.Color).fromArray(s).convertSRGBToLinear();break;case"ke":a.emissive=(new t.Color).fromArray(s).convertSRGBToLinear();break;case"map_kd":i("map",s);break;case"map_ks":i("specularMap",s);break;case"map_ke":i("emissiveMap",s);break;case"norm":i("normalMap",s);break;case"map_bump":case"bump":i("bumpMap",s);break;case"map_d":i("alphaMap",s),a.transparent=!0;break;case"ns":a.shininess=parseFloat(s);break;case"d":o=parseFloat(s),o<1&&(a.opacity=o,a.transparent=!0);break;case"tr":o=parseFloat(s),this.options&&this.options.invertTrProperty&&(o=1-o),o>0&&(a.opacity=1-o,a.transparent=!0)}}return this.materials[e]=new t.MeshPhongMaterial(a),this.materials[e]}getTextureParams(e,s){const r={scale:new t.Vector2(1,1),offset:new t.Vector2(0,0)},a=e.split(/\s+/);let i;return i=a.indexOf("-bm"),i>=0&&(s.bumpScale=parseFloat(a[i+1]),a.splice(i,2)),i=a.indexOf("-s"),i>=0&&(r.scale.set(parseFloat(a[i+1]),parseFloat(a[i+2])),a.splice(i,4)),i=a.indexOf("-o"),i>=0&&(r.offset.set(parseFloat(a[i+1]),parseFloat(a[i+2])),a.splice(i,4)),r.url=a.join(" ").trim(),r}loadTexture(e,s,r,a,i){const o=void 0!==this.manager?this.manager:t.DefaultLoadingManager;let n=o.getHandler(e);null===n&&(n=new t.TextureLoader(o)),n.setCrossOrigin&&n.setCrossOrigin(this.crossOrigin);const l=n.load(e,r,a,i);return void 0!==s&&(l.mapping=s),l}}e.MTLLoader=s,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();