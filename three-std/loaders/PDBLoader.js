!function(){var e,t;e=this,t=function(e,t){"use strict";class s extends t.Loader{constructor(e){super(e)}load(e,s,r,o){const n=this,a=new t.FileLoader(n.manager);a.setPath(n.path),a.setRequestHeader(n.requestHeader),a.setWithCredentials(n.withCredentials),a.load(e,(function(t){try{s(n.parse(t))}catch(t){o?o(t):console.error(t),n.manager.itemError(e)}}),r,o)}parse(e){function s(e){return e.replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function r(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}function o(e,t,s,r){const o=parseInt(l[r].slice(e,e+t));if(o){const e=(n=s,a=o,"s"+Math.min(n,a)+"e"+Math.max(n,a));void 0===c[e]&&(i.push([s-1,o-1,1]),c[e]=i.length-1)}var n,a}const n={h:[255,255,255],he:[217,255,255],li:[204,128,255],be:[194,255,0],b:[255,181,181],c:[144,144,144],n:[48,80,248],o:[255,13,13],f:[144,224,80],ne:[179,227,245],na:[171,92,242],mg:[138,255,0],al:[191,166,166],si:[240,200,160],p:[255,128,0],s:[255,255,48],cl:[31,240,31],ar:[128,209,227],k:[143,64,212],ca:[61,255,0],sc:[230,230,230],ti:[191,194,199],v:[166,166,171],cr:[138,153,199],mn:[156,122,199],fe:[224,102,51],co:[240,144,160],ni:[80,208,80],cu:[200,128,51],zn:[125,128,176],ga:[194,143,143],ge:[102,143,143],as:[189,128,227],se:[255,161,0],br:[166,41,41],kr:[92,184,209],rb:[112,46,176],sr:[0,255,0],y:[148,255,255],zr:[148,224,224],nb:[115,194,201],mo:[84,181,181],tc:[59,158,158],ru:[36,143,143],rh:[10,125,140],pd:[0,105,133],ag:[192,192,192],cd:[255,217,143],in:[166,117,115],sn:[102,128,128],sb:[158,99,181],te:[212,122,0],i:[148,0,148],xe:[66,158,176],cs:[87,23,143],ba:[0,201,0],la:[112,212,255],ce:[255,255,199],pr:[217,255,199],nd:[199,255,199],pm:[163,255,199],sm:[143,255,199],eu:[97,255,199],gd:[69,255,199],tb:[48,255,199],dy:[31,255,199],ho:[0,255,156],er:[0,230,117],tm:[0,212,82],yb:[0,191,56],lu:[0,171,36],hf:[77,194,255],ta:[77,166,255],w:[33,148,214],re:[38,125,171],os:[38,102,150],ir:[23,84,135],pt:[208,208,224],au:[255,209,35],hg:[184,184,208],tl:[166,84,77],pb:[87,89,97],bi:[158,79,181],po:[171,92,0],at:[117,79,69],rn:[66,130,150],fr:[66,0,102],ra:[0,125,0],ac:[112,171,250],th:[0,186,255],pa:[0,161,255],u:[0,143,255],np:[0,128,255],pu:[0,107,255],am:[84,92,242],cm:[120,92,227],bk:[138,79,227],cf:[161,54,212],es:[179,31,212],fm:[179,31,186],md:[179,13,166],no:[189,13,135],lr:[199,0,102],rf:[204,0,89],db:[209,0,79],sg:[217,0,69],bh:[224,0,56],hs:[230,0,46],mt:[235,0,38],ds:[235,0,38],rg:[235,0,38],cn:[235,0,38],uut:[235,0,38],uuq:[235,0,38],uup:[235,0,38],uuh:[235,0,38],uus:[235,0,38],uuo:[235,0,38]},a=[],i=[],c={},u={},l=e.split("\n");for(let e=0,t=l.length;e<t;e++)if("ATOM"===l[e].slice(0,4)||"HETATM"===l[e].slice(0,6)){const t=parseFloat(l[e].slice(30,37)),o=parseFloat(l[e].slice(38,45)),i=parseFloat(l[e].slice(46,53)),c=parseInt(l[e].slice(6,11))-1;let f=s(l[e].slice(76,78)).toLowerCase();""===f&&(f=s(l[e].slice(12,14)).toLowerCase());const p=[t,o,i,n[f],r(f)];a.push(p),u[c]=p}else if("CONECT"===l[e].slice(0,6)){const t=parseInt(l[e].slice(6,11));o(11,5,t,e),o(16,5,t,e),o(21,5,t,e),o(26,5,t,e)}return function(){const e={geometryAtoms:new t.BufferGeometry,geometryBonds:new t.BufferGeometry,json:{atoms:a}},s=e.geometryAtoms,r=e.geometryBonds,o=[],n=[],c=[];for(let e=0,t=a.length;e<t;e++){const t=a[e],s=t[0],r=t[1],i=t[2];o.push(s,r,i);const c=t[3][0]/255,u=t[3][1]/255,l=t[3][2]/255;n.push(c,u,l)}for(let e=0,t=i.length;e<t;e++){const t=i[e],s=t[0],r=t[1],o=u[s],n=u[r];let a=o[0],l=o[1],f=o[2];c.push(a,l,f),a=n[0],l=n[1],f=n[2],c.push(a,l,f)}return s.setAttribute("position",new t.Float32BufferAttribute(o,3)),s.setAttribute("color",new t.Float32BufferAttribute(n,3)),r.setAttribute("position",new t.Float32BufferAttribute(c,3)),e}()}}e.PDBLoader=s,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();
