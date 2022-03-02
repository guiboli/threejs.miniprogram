!function(){var e,t;e=this,t=function(e,t){"use strict";const n=new t.Color;class s extends t.Loader{constructor(e){super(e),this.propertyNameMapping={}}load(e,n,s,r){const o=this,i=new t.FileLoader(this.manager);i.setPath(this.path),i.setResponseType("arraybuffer"),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials),i.load(e,(function(t){try{n(o.parse(t))}catch(t){r?r(t):console.error(t),o.manager.itemError(e)}}),s,r)}setPropertyNameMapping(e){this.propertyNameMapping=e}parse(e){function s(e){let t="",n=0;const s=/^ply([\s\S]*)end_header\r?\n/.exec(e);null!==s&&(t=s[1],n=new Blob([s[0]]).size);const r={comments:[],elements:[],headerLength:n,objInfo:""},o=t.split("\n");let i;function a(e,t){const n={type:e[0]};return"list"===n.type?(n.name=e[3],n.countType=e[1],n.itemType=e[2]):n.name=e[1],n.name in t&&(n.name=t[n.name]),n}for(let e=0;e<o.length;e++){let t=o[e];if(t=t.trim(),""===t)continue;const n=t.split(/\s+/),s=n.shift();switch(t=n.join(" "),s){case"format":r.format=n[0],r.version=n[1];break;case"comment":r.comments.push(t);break;case"element":void 0!==i&&r.elements.push(i),i={},i.name=n[0],i.count=parseInt(n[1]),i.properties=[];break;case"property":i.properties.push(a(n,p.propertyNameMapping));break;case"obj_info":r.objInfo=t;break;default:console.log("unhandled",s,n)}}return void 0!==i&&r.elements.push(i),r}function r(e,t){switch(t){case"char":case"uchar":case"short":case"ushort":case"int":case"uint":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":return parseInt(e);case"float":case"double":case"float32":case"float64":return parseFloat(e)}}function o(e,t){const n=t.split(/\s+/),s={};for(let t=0;t<e.length;t++)if("list"===e[t].type){const o=[],i=r(n.shift(),e[t].countType);for(let s=0;s<i;s++)o.push(r(n.shift(),e[t].itemType));s[e[t].name]=o}else s[e[t].name]=r(n.shift(),e[t].type);return s}function i(e,t){const n={indices:[],vertices:[],normals:[],uvs:[],faceVertexUvs:[],colors:[]};let s,r="";null!==(s=/end_header\s([\s\S]*)$/.exec(e))&&(r=s[1]);const i=r.split("\n");let c=0,l=0;for(let e=0;e<i.length;e++){let s=i[e];if(s=s.trim(),""===s)continue;l>=t.elements[c].count&&(c++,l=0);const r=o(t.elements[c].properties,s);u(n,t.elements[c].name,r),l++}return a(n)}function a(e){let n=new t.BufferGeometry;return e.indices.length>0&&n.setIndex(e.indices),n.setAttribute("position",new t.Float32BufferAttribute(e.vertices,3)),e.normals.length>0&&n.setAttribute("normal",new t.Float32BufferAttribute(e.normals,3)),e.uvs.length>0&&n.setAttribute("uv",new t.Float32BufferAttribute(e.uvs,2)),e.colors.length>0&&n.setAttribute("color",new t.Float32BufferAttribute(e.colors,3)),e.faceVertexUvs.length>0&&(n=n.toNonIndexed(),n.setAttribute("uv",new t.Float32BufferAttribute(e.faceVertexUvs,2))),n.computeBoundingSphere(),n}function u(e,t,s){function r(e){for(let t=0,n=e.length;t<n;t++){const n=e[t];if(n in s)return n}return null}const o=r(["x","px","posx"])||"x",i=r(["y","py","posy"])||"y",a=r(["z","pz","posz"])||"z",u=r(["nx","normalx"]),c=r(["ny","normaly"]),l=r(["nz","normalz"]),f=r(["s","u","texture_u","tx"]),p=r(["t","v","texture_v","ty"]),h=r(["red","diffuse_red","r","diffuse_r"]),d=r(["green","diffuse_green","g","diffuse_g"]),m=r(["blue","diffuse_blue","b","diffuse_b"]);if("vertex"===t)e.vertices.push(s[o],s[i],s[a]),null!==u&&null!==c&&null!==l&&e.normals.push(s[u],s[c],s[l]),null!==f&&null!==p&&e.uvs.push(s[f],s[p]),null!==h&&null!==d&&null!==m&&(n.setRGB(s[h]/255,s[d]/255,s[m]/255).convertSRGBToLinear(),e.colors.push(n.r,n.g,n.b));else if("face"===t){const t=s.vertex_indices||s.vertex_index,n=s.texcoord;3===t.length?(e.indices.push(t[0],t[1],t[2]),n&&6===n.length&&(e.faceVertexUvs.push(n[0],n[1]),e.faceVertexUvs.push(n[2],n[3]),e.faceVertexUvs.push(n[4],n[5]))):4===t.length&&(e.indices.push(t[0],t[1],t[3]),e.indices.push(t[1],t[2],t[3]))}}function c(e,t,n,s){switch(n){case"int8":case"char":return[e.getInt8(t),1];case"uint8":case"uchar":return[e.getUint8(t),1];case"int16":case"short":return[e.getInt16(t,s),2];case"uint16":case"ushort":return[e.getUint16(t,s),2];case"int32":case"int":return[e.getInt32(t,s),4];case"uint32":case"uint":return[e.getUint32(t,s),4];case"float32":case"float":return[e.getFloat32(t,s),4];case"float64":case"double":return[e.getFloat64(t,s),8]}}function l(e,t,n,s){const r={};let o,i=0;for(let a=0;a<n.length;a++)if("list"===n[a].type){const u=[];o=c(e,t+i,n[a].countType,s);const l=o[0];i+=o[1];for(let r=0;r<l;r++)o=c(e,t+i,n[a].itemType,s),u.push(o[0]),i+=o[1];r[n[a].name]=u}else o=c(e,t+i,n[a].type,s),r[n[a].name]=o[0],i+=o[1];return[r,i]}let f;const p=this;if(e instanceof ArrayBuffer){const n=t.LoaderUtils.decodeText(new Uint8Array(e)),r=s(n);f="ascii"===r.format?i(n,r):function(e,t){const n={indices:[],vertices:[],normals:[],uvs:[],faceVertexUvs:[],colors:[]},s="binary_little_endian"===t.format,r=new DataView(e,t.headerLength);let o,i=0;for(let e=0;e<t.elements.length;e++)for(let a=0;a<t.elements[e].count;a++){o=l(r,i,t.elements[e].properties,s),i+=o[1];const a=o[0];u(n,t.elements[e].name,a)}return a(n)}(e,r)}else f=i(e,s(e));return f}}e.PLYLoader=s,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();
