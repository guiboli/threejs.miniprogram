!function(){var e,t;e=this,t=function(e,t){"use strict";class o extends t.LineSegmentsGeometry{constructor(){super(),this.type="LineGeometry"}setPositions(e){const t=e.length-3,o=new Float32Array(2*t);for(let r=0;r<t;r+=3)o[2*r]=e[r],o[2*r+1]=e[r+1],o[2*r+2]=e[r+2],o[2*r+3]=e[r+3],o[2*r+4]=e[r+4],o[2*r+5]=e[r+5];return super.setPositions(o),this}setColors(e){const t=e.length-3,o=new Float32Array(2*t);for(let r=0;r<t;r+=3)o[2*r]=e[r],o[2*r+1]=e[r+1],o[2*r+2]=e[r+2],o[2*r+3]=e[r+3],o[2*r+4]=e[r+4],o[2*r+5]=e[r+5];return super.setColors(o),this}fromLine(e){const t=e.geometry;if(!t.isGeometry)return t.isBufferGeometry&&this.setPositions(t.attributes.position.array),this;console.error("THREE.LineGeometry no longer supports Geometry. Use THREE.BufferGeometry instead.")}}o.prototype.isLineGeometry=!0,e.LineGeometry=o,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("./LineSegmentsGeometry.js")):"function"==typeof define&&define.amd?define(["exports","./LineSegmentsGeometry"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();
