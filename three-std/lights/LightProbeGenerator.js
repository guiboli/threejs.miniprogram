!function(){var e,t;e=this,t=function(e,t){"use strict";function r(e,r){switch(r){case t.sRGBEncoding:e.convertSRGBToLinear();break;case t.LinearEncoding:break;default:console.warn("WARNING: LightProbeGenerator convertColorToLinear() encountered an unsupported encoding.")}return e}e.LightProbeGenerator=class{static fromCubeTexture(e){let n=0;const o=new t.Vector3,a=new t.Vector3,s=new t.Color,c=[0,0,0,0,0,0,0,0,0],i=new t.SphericalHarmonics3,l=i.coefficients;for(let i=0;i<6;i++){const h=e.image[i],f=h.width,d=h.height,g=document.createElement("canvas");g.width=f,g.height=d;const b=g.getContext("2d");b.drawImage(h,0,0,f,d);const u=b.getImageData(0,0,f,d),w=u.data,p=u.width,m=2/p;for(let h=0,f=w.length;h<f;h+=4){s.setRGB(w[h]/255,w[h+1]/255,w[h+2]/255),r(s,e.encoding);const f=h/4,d=(f%p+.5)*m-1,g=1-(Math.floor(f/p)+.5)*m;switch(i){case 0:o.set(-1,g,-d);break;case 1:o.set(1,g,d);break;case 2:o.set(-d,1,-g);break;case 3:o.set(-d,-1,g);break;case 4:o.set(-d,g,1);break;case 5:o.set(d,g,-1)}const b=o.lengthSq(),u=4/(Math.sqrt(b)*b);n+=u,a.copy(o).normalize(),t.SphericalHarmonics3.getBasisAt(a,c);for(let e=0;e<9;e++)l[e].x+=c[e]*s.r*u,l[e].y+=c[e]*s.g*u,l[e].z+=c[e]*s.b*u}}const h=4*Math.PI/n;for(let e=0;e<9;e++)l[e].x*=h,l[e].y*=h,l[e].z*=h;return new t.LightProbe(i)}static fromCubeRenderTarget(e,n){let o=0;const a=new t.Vector3,s=new t.Vector3,c=new t.Color,i=[0,0,0,0,0,0,0,0,0],l=new t.SphericalHarmonics3,h=l.coefficients;for(let l=0;l<6;l++){const f=n.width,d=new Uint8Array(f*f*4);e.readRenderTargetPixels(n,0,0,f,f,d,l);const g=2/f;for(let e=0,b=d.length;e<b;e+=4){c.setRGB(d[e]/255,d[e+1]/255,d[e+2]/255),r(c,n.texture.encoding);const b=e/4,u=(b%f+.5)*g-1,w=1-(Math.floor(b/f)+.5)*g;switch(l){case 0:a.set(1,w,-u);break;case 1:a.set(-1,w,u);break;case 2:a.set(u,1,-w);break;case 3:a.set(u,-1,w);break;case 4:a.set(u,w,1);break;case 5:a.set(-u,w,-1)}const p=a.lengthSq(),m=4/(Math.sqrt(p)*p);o+=m,s.copy(a).normalize(),t.SphericalHarmonics3.getBasisAt(s,i);for(let e=0;e<9;e++)h[e].x+=i[e]*c.r*m,h[e].y+=i[e]*c.g*m,h[e].z+=i[e]*c.b*m}}const f=4*Math.PI/o;for(let e=0;e<9;e++)h[e].x*=f,h[e].y*=f,h[e].z*=f;return new t.LightProbe(l)}},Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();
