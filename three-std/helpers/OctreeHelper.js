!function(){var e,s;e=this,s=function(e,s){"use strict";class t extends s.LineSegments{constructor(e,t=16776960){const u=[];!function e(s){for(let t=0;t<s.length;t++){const p=s[t].box.min,o=s[t].box.max;u.push(o.x,o.y,o.z),u.push(p.x,o.y,o.z),u.push(p.x,o.y,o.z),u.push(p.x,p.y,o.z),u.push(p.x,p.y,o.z),u.push(o.x,p.y,o.z),u.push(o.x,p.y,o.z),u.push(o.x,o.y,o.z),u.push(o.x,o.y,p.z),u.push(p.x,o.y,p.z),u.push(p.x,o.y,p.z),u.push(p.x,p.y,p.z),u.push(p.x,p.y,p.z),u.push(o.x,p.y,p.z),u.push(o.x,p.y,p.z),u.push(o.x,o.y,p.z),u.push(o.x,o.y,o.z),u.push(o.x,o.y,p.z),u.push(p.x,o.y,o.z),u.push(p.x,o.y,p.z),u.push(p.x,p.y,o.z),u.push(p.x,p.y,p.z),u.push(o.x,p.y,o.z),u.push(o.x,p.y,p.z),e(s[t].subTrees)}}(e.subTrees);const p=new s.BufferGeometry;p.setAttribute("position",new s.Float32BufferAttribute(u,3)),super(p,new s.LineBasicMaterial({color:t,toneMapped:!1})),this.octree=e,this.color=t,this.type="OctreeHelper"}}e.OctreeHelper=t,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?s(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],s):s((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();