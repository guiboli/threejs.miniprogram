!function(){var e,t;e=this,t=function(e,t){"use strict";class n extends t.Loader{setQuality(e){this._quality=e}load(e,n,i,a){const o=this._quality||1,s=new t.CanvasTexture;s.minFilter=t.NearestFilter;const d=new t.FileLoader(this.manager);return d.setPath(this.path),d.setWithCredentials(this.withCredentials),d.load(e,(function(e){const t=JSON.parse(e),i=document.createElement("div");i.style.width=t.w+"px",i.style.height=t.h+"px",document.body.appendChild(i);const a=bodymovin.loadAnimation({container:i,animType:"canvas",loop:!0,autoplay:!0,animationData:t,rendererSettings:{dpr:o}});s.animation=a,s.image=a.container,a.addEventListener("enterFrame",(function(){s.needsUpdate=!0})),i.style.display="none",void 0!==n&&n(s)}),i,a),s}}e.LottieLoader=n,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();