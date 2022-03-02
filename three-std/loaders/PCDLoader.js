!function(){var e,t;e=this,t=function(e,t){"use strict";class i extends t.Loader{constructor(e){super(e),this.littleEndian=!0}load(e,i,n,s){const r=this,o=new t.FileLoader(r.manager);o.setPath(r.path),o.setResponseType("arraybuffer"),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,(function(t){try{i(r.parse(t,e))}catch(t){s?s(t):console.error(t),r.manager.itemError(e)}}),n,s)}parse(e,i){const n=t.LoaderUtils.decodeText(new Uint8Array(e)),s=function(e){const t={},i=e.search(/[\r\n]DATA\s(\S*)\s/i),n=/[\r\n]DATA\s(\S*)\s/i.exec(e.slice(i-1));if(t.data=n[1],t.headerLen=n[0].length+i,t.str=e.slice(0,t.headerLen),t.str=t.str.replace(/\#.*/gi,""),t.version=/VERSION (.*)/i.exec(t.str),t.fields=/FIELDS (.*)/i.exec(t.str),t.size=/SIZE (.*)/i.exec(t.str),t.type=/TYPE (.*)/i.exec(t.str),t.count=/COUNT (.*)/i.exec(t.str),t.width=/WIDTH (.*)/i.exec(t.str),t.height=/HEIGHT (.*)/i.exec(t.str),t.viewpoint=/VIEWPOINT (.*)/i.exec(t.str),t.points=/POINTS (.*)/i.exec(t.str),null!==t.version&&(t.version=parseFloat(t.version[1])),t.fields=null!==t.fields?t.fields[1].split(" "):[],null!==t.type&&(t.type=t.type[1].split(" ")),null!==t.width&&(t.width=parseInt(t.width[1])),null!==t.height&&(t.height=parseInt(t.height[1])),null!==t.viewpoint&&(t.viewpoint=t.viewpoint[1]),null!==t.points&&(t.points=parseInt(t.points[1],10)),null===t.points&&(t.points=t.width*t.height),null!==t.size&&(t.size=t.size[1].split(" ").map((function(e){return parseInt(e,10)}))),null!==t.count)t.count=t.count[1].split(" ").map((function(e){return parseInt(e,10)}));else{t.count=[];for(let e=0,i=t.fields.length;e<i;e++)t.count.push(1)}t.offset={};let s=0;for(let e=0,i=t.fields.length;e<i;e++)"ascii"===t.data?t.offset[t.fields[e]]=e:(t.offset[t.fields[e]]=s,s+=t.size[e]*t.count[e]);return t.rowSize=s,t}(n),r=[],o=[],l=[];if("ascii"===s.data){const e=s.offset,t=n.slice(s.headerLen).split("\n");for(let i=0,n=t.length;i<n;i++){if(""===t[i])continue;const n=t[i].split(" ");if(void 0!==e.x&&(r.push(parseFloat(n[e.x])),r.push(parseFloat(n[e.y])),r.push(parseFloat(n[e.z]))),void 0!==e.rgb){const t=parseFloat(n[e.rgb]),i=t>>16&255,s=t>>8&255,r=t>>0&255;l.push(i/255,s/255,r/255)}void 0!==e.normal_x&&(o.push(parseFloat(n[e.normal_x])),o.push(parseFloat(n[e.normal_y])),o.push(parseFloat(n[e.normal_z])))}}if("binary_compressed"===s.data){const t=new Uint32Array(e.slice(s.headerLen,s.headerLen+8)),i=t[0],n=t[1],a=function(e,t){const i=e.length,n=new Uint8Array(t);let s,r,o,l=0,a=0;do{if(s=e[l++],s<32){if(s++,a+s>t)throw new Error("Output buffer is not large enough");if(l+s>i)throw new Error("Invalid compressed data");do{n[a++]=e[l++]}while(--s)}else{if(r=s>>5,o=a-((31&s)<<8)-1,l>=i)throw new Error("Invalid compressed data");if(7===r&&(r+=e[l++],l>=i))throw new Error("Invalid compressed data");if(o-=e[l++],a+r+2>t)throw new Error("Output buffer is not large enough");if(o<0)throw new Error("Invalid compressed data");if(o>=a)throw new Error("Invalid compressed data");do{n[a++]=n[o++]}while(2+--r)}}while(l<i);return n}(new Uint8Array(e,s.headerLen+8,i),n),p=new DataView(a.buffer),h=s.offset;for(let e=0;e<s.points;e++)void 0!==h.x&&(r.push(p.getFloat32(s.points*h.x+s.size[0]*e,this.littleEndian)),r.push(p.getFloat32(s.points*h.y+s.size[1]*e,this.littleEndian)),r.push(p.getFloat32(s.points*h.z+s.size[2]*e,this.littleEndian))),void 0!==h.rgb&&(l.push(p.getUint8(s.points*h.rgb+s.size[3]*e+2)/255),l.push(p.getUint8(s.points*h.rgb+s.size[3]*e+1)/255),l.push(p.getUint8(s.points*h.rgb+s.size[3]*e+0)/255)),void 0!==h.normal_x&&(o.push(p.getFloat32(s.points*h.normal_x+s.size[4]*e,this.littleEndian)),o.push(p.getFloat32(s.points*h.normal_y+s.size[5]*e,this.littleEndian)),o.push(p.getFloat32(s.points*h.normal_z+s.size[6]*e,this.littleEndian)))}if("binary"===s.data){const t=new DataView(e,s.headerLen),i=s.offset;for(let e=0,n=0;e<s.points;e++,n+=s.rowSize)void 0!==i.x&&(r.push(t.getFloat32(n+i.x,this.littleEndian)),r.push(t.getFloat32(n+i.y,this.littleEndian)),r.push(t.getFloat32(n+i.z,this.littleEndian))),void 0!==i.rgb&&(l.push(t.getUint8(n+i.rgb+2)/255),l.push(t.getUint8(n+i.rgb+1)/255),l.push(t.getUint8(n+i.rgb+0)/255)),void 0!==i.normal_x&&(o.push(t.getFloat32(n+i.normal_x,this.littleEndian)),o.push(t.getFloat32(n+i.normal_y,this.littleEndian)),o.push(t.getFloat32(n+i.normal_z,this.littleEndian)))}const a=new t.BufferGeometry;r.length>0&&a.setAttribute("position",new t.Float32BufferAttribute(r,3)),o.length>0&&a.setAttribute("normal",new t.Float32BufferAttribute(o,3)),l.length>0&&a.setAttribute("color",new t.Float32BufferAttribute(l,3)),a.computeBoundingSphere();const p=new t.PointsMaterial({size:.005});l.length>0?p.vertexColors=!0:p.color.setHex(16777215*Math.random());const h=new t.Points(a,p);let d=i.split("").reverse().join("");return d=/([^\/]*)/.exec(d),d=d[1].split("").reverse().join(""),h.name=d,h}}e.PCDLoader=i,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();
