!function(){var e,t;e=this,t=function(e,t,r,n){"use strict";const i=new t.Vector3,s=new t.Vector3;class o extends t.Mesh{constructor(e=new r.LineSegmentsGeometry,t=new n.LineMaterial({color:16777215*Math.random()})){super(e,t),this.type="Wireframe"}computeLineDistances(){const e=this.geometry,r=e.attributes.instanceStart,n=e.attributes.instanceEnd,o=new Float32Array(2*r.count);for(let e=0,t=0,a=r.count;e<a;e++,t+=2)i.fromBufferAttribute(r,e),s.fromBufferAttribute(n,e),o[t]=0===t?0:o[t-1],o[t+1]=o[t]+i.distanceTo(s);const a=new t.InstancedInterleavedBuffer(o,2,1);return e.setAttribute("instanceDistanceStart",new t.InterleavedBufferAttribute(a,1,0)),e.setAttribute("instanceDistanceEnd",new t.InterleavedBufferAttribute(a,1,1)),this}}o.prototype.isWireframe=!0,e.Wireframe=o,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three"),require("./LineSegmentsGeometry.js"),require("./LineMaterial.js")):"function"==typeof define&&define.amd?define(["exports","three","./LineSegmentsGeometry","./LineMaterial"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE,e.THREE,e.THREE)}();
