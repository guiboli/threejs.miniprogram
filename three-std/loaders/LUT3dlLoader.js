!function(){var e,t;e=this,t=function(e,t){"use strict";class a extends t.Loader{load(e,a,r,i){const n=new t.FileLoader(this.manager);n.setPath(this.path),n.setResponseType("text"),n.load(e,(t=>{try{a(this.parse(t))}catch(t){i?i(t):console.error(t),this.manager.itemError(e)}}),r,i)}parse(e){const a=(e=e.replace(/^#.*?(\n|\r)/gm,"").replace(/^\s*?(\n|\r)/gm,"").trim()).split(/[\n\r]+/g),r=a[0].trim().split(/\s+/g).map((e=>parseFloat(e))),i=r[1]-r[0],n=r.length;for(let e=1,t=r.length;e<t;e++)if(i!==r[e]-r[e-1])throw new Error("LUT3dlLoader: Inconsistent grid size not supported.");const o=new Array(n*n*n*4);let p=0,s=0;for(let e=1,t=a.length;e<t;e++){const t=a[e].trim().split(/\s/g),r=parseFloat(t[0]),i=parseFloat(t[1]),l=parseFloat(t[2]);s=Math.max(s,r,i,l);const g=p%n*n*n+Math.floor(p/n)%n*n+Math.floor(p/(n*n))%n;o[4*g+0]=r,o[4*g+1]=i,o[4*g+2]=l,o[4*g+3]=1,p+=1}const l=Math.ceil(Math.log2(s)),g=Math.pow(2,l);for(let e=0,t=o.length;e<t;e+=4){const t=o[e+0],a=o[e+1],r=o[e+2];o[e+0]=255*t/g,o[e+1]=255*a/g,o[e+2]=255*r/g}const d=new Uint8Array(o),m=new t.DataTexture;m.image.data=d,m.image.width=n,m.image.height=n*n,m.format=t.RGBAFormat,m.type=t.UnsignedByteType,m.magFilter=t.LinearFilter,m.minFilter=t.LinearFilter,m.wrapS=t.ClampToEdgeWrapping,m.wrapT=t.ClampToEdgeWrapping,m.generateMipmaps=!1,m.needsUpdate=!0;const h=new t.Data3DTexture;return h.image.data=d,h.image.width=n,h.image.height=n,h.image.depth=n,h.format=t.RGBAFormat,h.type=t.UnsignedByteType,h.magFilter=t.LinearFilter,h.minFilter=t.LinearFilter,h.wrapS=t.ClampToEdgeWrapping,h.wrapT=t.ClampToEdgeWrapping,h.wrapR=t.ClampToEdgeWrapping,h.generateMipmaps=!1,h.needsUpdate=!0,{size:n,texture:m,texture3D:h}}}e.LUT3dlLoader=a,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();