!function(){var e,o;e=this,o=function(e,o){"use strict";class t extends o.DataTextureLoader{constructor(e){super(e)}parse(e){const t=0,r=1,a=2,i=3,s=9,n=10,l=11,c=48,d=4,p=0,f=1,h=2,u=3;e.length<19&&console.error("THREE.TGALoader: Not enough data to contain header.");let _=0;const g=new Uint8Array(e),T={id_length:g[_++],colormap_type:g[_++],image_type:g[_++],colormap_index:g[_++]|g[_++]<<8,colormap_length:g[_++]|g[_++]<<8,colormap_size:g[_++],origin:[g[_++]|g[_++]<<8,g[_++]|g[_++]<<8],width:g[_++]|g[_++]<<8,height:g[_++]|g[_++]<<8,pixel_size:g[_++],flags:g[_++]};!function(e){switch(e.image_type){case r:case s:(e.colormap_length>256||24!==e.colormap_size||1!==e.colormap_type)&&console.error("THREE.TGALoader: Invalid type colormap data for indexed type.");break;case a:case i:case n:case l:e.colormap_type&&console.error("THREE.TGALoader: Invalid type colormap data for colormap type.");break;case t:console.error("THREE.TGALoader: No data.");default:console.error('THREE.TGALoader: Invalid type "%s".',e.image_type)}(e.width<=0||e.height<=0)&&console.error("THREE.TGALoader: Invalid image size."),8!==e.pixel_size&&16!==e.pixel_size&&24!==e.pixel_size&&32!==e.pixel_size&&console.error('THREE.TGALoader: Invalid pixel size "%s".',e.pixel_size)}(T),T.id_length+_>e.length&&console.error("THREE.TGALoader: No data."),_+=T.id_length;let E=!1,m=!1,w=!1;switch(T.image_type){case s:E=!0,m=!0;break;case r:m=!0;break;case n:E=!0;break;case a:break;case l:E=!0,w=!0;break;case i:w=!0}const y=new Uint8Array(T.width*T.height*4),b=function(e,o,t,r,a){let i,s;const n=t.pixel_size>>3,l=t.width*t.height*n;if(o&&(s=a.subarray(r,r+=t.colormap_length*(t.colormap_size>>3))),e){let e,o,t;i=new Uint8Array(l);let s=0;const c=new Uint8Array(n);for(;s<l;)if(e=a[r++],o=1+(127&e),128&e){for(t=0;t<n;++t)c[t]=a[r++];for(t=0;t<o;++t)i.set(c,s+t*n);s+=n*o}else{for(o*=n,t=0;t<o;++t)i[s+t]=a[r++];s+=o}}else i=a.subarray(r,r+=o?t.width*t.height:l);return{pixel_data:i,palettes:s}}(E,m,T,_,g);return function(e,o,t,r,a){let i,s,n,l,_,g;switch((T.flags&c)>>d){default:case h:i=0,n=1,_=o,s=0,l=1,g=t;break;case p:i=0,n=1,_=o,s=t-1,l=-1,g=-1;break;case u:i=o-1,n=-1,_=-1,s=0,l=1,g=t;break;case f:i=o-1,n=-1,_=-1,s=t-1,l=-1,g=-1}if(w)switch(T.pixel_size){case 8:!function(e,o,t,r,a,i,s,n){let l,c,d,p=0;const f=T.width;for(d=o;d!==r;d+=t)for(c=a;c!==s;c+=i,p++)l=n[p],e[4*(c+f*d)+0]=l,e[4*(c+f*d)+1]=l,e[4*(c+f*d)+2]=l,e[4*(c+f*d)+3]=255}(e,s,l,g,i,n,_,r);break;case 16:!function(e,o,t,r,a,i,s,n){let l,c,d=0;const p=T.width;for(c=o;c!==r;c+=t)for(l=a;l!==s;l+=i,d+=2)e[4*(l+p*c)+0]=n[d+0],e[4*(l+p*c)+1]=n[d+0],e[4*(l+p*c)+2]=n[d+0],e[4*(l+p*c)+3]=n[d+1]}(e,s,l,g,i,n,_,r);break;default:console.error("THREE.TGALoader: Format not supported.")}else switch(T.pixel_size){case 8:!function(e,o,t,r,a,i,s,n,l){const c=l;let d,p,f,h=0;const u=T.width;for(f=o;f!==r;f+=t)for(p=a;p!==s;p+=i,h++)d=n[h],e[4*(p+u*f)+3]=255,e[4*(p+u*f)+2]=c[3*d+0],e[4*(p+u*f)+1]=c[3*d+1],e[4*(p+u*f)+0]=c[3*d+2]}(e,s,l,g,i,n,_,r,a);break;case 16:!function(e,o,t,r,a,i,s,n){let l,c,d,p=0;const f=T.width;for(d=o;d!==r;d+=t)for(c=a;c!==s;c+=i,p+=2)l=n[p+0]+(n[p+1]<<8),e[4*(c+f*d)+0]=(31744&l)>>7,e[4*(c+f*d)+1]=(992&l)>>2,e[4*(c+f*d)+2]=(31&l)<<3,e[4*(c+f*d)+3]=32768&l?0:255}(e,s,l,g,i,n,_,r);break;case 24:!function(e,o,t,r,a,i,s,n){let l,c,d=0;const p=T.width;for(c=o;c!==r;c+=t)for(l=a;l!==s;l+=i,d+=3)e[4*(l+p*c)+3]=255,e[4*(l+p*c)+2]=n[d+0],e[4*(l+p*c)+1]=n[d+1],e[4*(l+p*c)+0]=n[d+2]}(e,s,l,g,i,n,_,r);break;case 32:!function(e,o,t,r,a,i,s,n){let l,c,d=0;const p=T.width;for(c=o;c!==r;c+=t)for(l=a;l!==s;l+=i,d+=4)e[4*(l+p*c)+2]=n[d+0],e[4*(l+p*c)+1]=n[d+1],e[4*(l+p*c)+0]=n[d+2],e[4*(l+p*c)+3]=n[d+3]}(e,s,l,g,i,n,_,r);break;default:console.error("THREE.TGALoader: Format not supported.")}}(y,T.width,T.height,b.pixel_data,b.palettes),{data:y,width:T.width,height:T.height,flipY:!0,generateMipmaps:!0,minFilter:o.LinearMipmapLinearFilter}}}e.TGALoader=t,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?o(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],o):o((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();