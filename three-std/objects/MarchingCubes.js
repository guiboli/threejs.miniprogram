!function(){var t,e;t=this,e=function(t,e){"use strict";class i extends e.Mesh{constructor(t,i,o=!1,a=!1,n=1e4){const l=new e.BufferGeometry;super(l,i);const h=this,f=new Float32Array(36),c=new Float32Array(36),y=new Float32Array(36);function d(t,e,i){return t+(e-t)*i}function A(t,e,i,s,r,o,a,n,l,A){const u=(i-a)/(n-a),z=h.normal_cache;f[e+0]=s+u*h.delta,f[e+1]=r,f[e+2]=o,c[e+0]=d(z[t+0],z[t+3],u),c[e+1]=d(z[t+1],z[t+4],u),c[e+2]=d(z[t+2],z[t+5],u),y[e+0]=d(h.palette[3*l+0],h.palette[3*A+0],u),y[e+1]=d(h.palette[3*l+1],h.palette[3*A+1],u),y[e+2]=d(h.palette[3*l+2],h.palette[3*A+2],u)}function u(t,e,i,s,r,o,a,n,l,A){const u=(i-a)/(n-a),z=h.normal_cache;f[e+0]=s,f[e+1]=r+u*h.delta,f[e+2]=o;const p=t+3*h.yd;c[e+0]=d(z[t+0],z[p+0],u),c[e+1]=d(z[t+1],z[p+1],u),c[e+2]=d(z[t+2],z[p+2],u),y[e+0]=d(h.palette[3*l+0],h.palette[3*A+0],u),y[e+1]=d(h.palette[3*l+1],h.palette[3*A+1],u),y[e+2]=d(h.palette[3*l+2],h.palette[3*A+2],u)}function z(t,e,i,s,r,o,a,n,l,A){const u=(i-a)/(n-a),z=h.normal_cache;f[e+0]=s,f[e+1]=r,f[e+2]=o+u*h.delta;const p=t+3*h.zd;c[e+0]=d(z[t+0],z[p+0],u),c[e+1]=d(z[t+1],z[p+1],u),c[e+2]=d(z[t+2],z[p+2],u),y[e+0]=d(h.palette[3*l+0],h.palette[3*A+0],u),y[e+1]=d(h.palette[3*l+1],h.palette[3*A+1],u),y[e+2]=d(h.palette[3*l+2],h.palette[3*A+2],u)}function p(t){const e=3*t;0===h.normal_cache[e]&&(h.normal_cache[e+0]=h.field[t-1]-h.field[t+1],h.normal_cache[e+1]=h.field[t-h.yd]-h.field[t+h.yd],h.normal_cache[e+2]=h.field[t-h.zd]-h.field[t+h.zd])}function m(t,e,i,o,a){const n=o+1,l=o+h.yd,d=o+h.zd,m=n+h.yd,w=n+h.zd,g=o+h.yd+h.zd,M=n+h.yd+h.zd;let v=0;const U=h.field[o],C=h.field[n],_=h.field[l],F=h.field[m],D=h.field[d],T=h.field[w],E=h.field[g],B=h.field[M];U<a&&(v|=1),C<a&&(v|=2),_<a&&(v|=8),F<a&&(v|=4),D<a&&(v|=16),T<a&&(v|=32),E<a&&(v|=128),B<a&&(v|=64);const q=s[v];if(0===q)return 0;const P=h.delta,R=t+P,x=e+P,H=i+P;1&q&&(p(o),p(n),A(3*o,0,a,t,e,i,U,C,o,n)),2&q&&(p(n),p(m),u(3*n,3,a,R,e,i,C,F,n,m)),4&q&&(p(l),p(m),A(3*l,6,a,t,x,i,_,F,l,m)),8&q&&(p(o),p(l),u(3*o,9,a,t,e,i,U,_,o,l)),16&q&&(p(d),p(w),A(3*d,12,a,t,e,H,D,T,d,w)),32&q&&(p(w),p(M),u(3*w,15,a,R,e,H,T,B,w,M)),64&q&&(p(g),p(M),A(3*g,18,a,t,x,H,E,B,g,M)),128&q&&(p(d),p(g),u(3*d,21,a,t,e,H,D,E,d,g)),256&q&&(p(o),p(d),z(3*o,24,a,t,e,i,U,D,o,d)),512&q&&(p(n),p(w),z(3*n,27,a,R,e,i,C,T,n,w)),1024&q&&(p(m),p(M),z(3*m,30,a,R,x,i,F,B,m,M)),2048&q&&(p(l),p(g),z(3*l,33,a,t,x,i,_,E,l,g)),v<<=4;let j,G,I,S=0,O=0;for(;-1!=r[v+O];)j=v+O,G=j+1,I=j+2,b(f,c,y,3*r[j],3*r[G],3*r[I]),O+=3,S++;return S}function b(t,e,i,s,r,o){const a=3*h.count;if(h.positionArray[a+0]=t[s],h.positionArray[a+1]=t[s+1],h.positionArray[a+2]=t[s+2],h.positionArray[a+3]=t[r],h.positionArray[a+4]=t[r+1],h.positionArray[a+5]=t[r+2],h.positionArray[a+6]=t[o],h.positionArray[a+7]=t[o+1],h.positionArray[a+8]=t[o+2],!0===h.material.flatShading){const t=(e[s+0]+e[r+0]+e[o+0])/3,i=(e[s+1]+e[r+1]+e[o+1])/3,n=(e[s+2]+e[r+2]+e[o+2])/3;h.normalArray[a+0]=t,h.normalArray[a+1]=i,h.normalArray[a+2]=n,h.normalArray[a+3]=t,h.normalArray[a+4]=i,h.normalArray[a+5]=n,h.normalArray[a+6]=t,h.normalArray[a+7]=i,h.normalArray[a+8]=n}else h.normalArray[a+0]=e[s+0],h.normalArray[a+1]=e[s+1],h.normalArray[a+2]=e[s+2],h.normalArray[a+3]=e[r+0],h.normalArray[a+4]=e[r+1],h.normalArray[a+5]=e[r+2],h.normalArray[a+6]=e[o+0],h.normalArray[a+7]=e[o+1],h.normalArray[a+8]=e[o+2];if(h.enableUvs){const e=2*h.count;h.uvArray[e+0]=t[s+0],h.uvArray[e+1]=t[s+2],h.uvArray[e+2]=t[r+0],h.uvArray[e+3]=t[r+2],h.uvArray[e+4]=t[o+0],h.uvArray[e+5]=t[o+2]}h.enableColors&&(h.colorArray[a+0]=i[s+0],h.colorArray[a+1]=i[s+1],h.colorArray[a+2]=i[s+2],h.colorArray[a+3]=i[r+0],h.colorArray[a+4]=i[r+1],h.colorArray[a+5]=i[r+2],h.colorArray[a+6]=i[o+0],h.colorArray[a+7]=i[o+1],h.colorArray[a+8]=i[o+2]),h.count+=3}this.enableUvs=o,this.enableColors=a,this.init=function(t){this.resolution=t,this.isolation=80,this.size=t,this.size2=this.size*this.size,this.size3=this.size2*this.size,this.halfsize=this.size/2,this.delta=2/this.size,this.yd=this.size,this.zd=this.size2,this.field=new Float32Array(this.size3),this.normal_cache=new Float32Array(3*this.size3),this.palette=new Float32Array(3*this.size3),this.count=0;const i=3*n;this.positionArray=new Float32Array(3*i);const s=new e.BufferAttribute(this.positionArray,3);s.setUsage(e.DynamicDrawUsage),l.setAttribute("position",s),this.normalArray=new Float32Array(3*i);const r=new e.BufferAttribute(this.normalArray,3);if(r.setUsage(e.DynamicDrawUsage),l.setAttribute("normal",r),this.enableUvs){this.uvArray=new Float32Array(2*i);const t=new e.BufferAttribute(this.uvArray,2);t.setUsage(e.DynamicDrawUsage),l.setAttribute("uv",t)}if(this.enableColors){this.colorArray=new Float32Array(3*i);const t=new e.BufferAttribute(this.colorArray,3);t.setUsage(e.DynamicDrawUsage),l.setAttribute("color",t)}},this.addBall=function(t,i,s,r,o,a){const n=Math.sign(r);r=Math.abs(r);const l=!(null==a);let h=new e.Color(t,i,s);if(l)try{h=a instanceof e.Color?a:Array.isArray(a)?new e.Color(Math.min(Math.abs(a[0]),1),Math.min(Math.abs(a[1]),1),Math.min(Math.abs(a[2]),1)):new e.Color(a)}catch(r){h=new e.Color(t,i,s)}const f=this.size*Math.sqrt(r/o),c=s*this.size,y=i*this.size,d=t*this.size;let A=Math.floor(c-f);A<1&&(A=1);let u=Math.floor(c+f);u>this.size-1&&(u=this.size-1);let z=Math.floor(y-f);z<1&&(z=1);let p=Math.floor(y+f);p>this.size-1&&(p=this.size-1);let m=Math.floor(d-f);m<1&&(m=1);let b,w,g,M,v,U,C,_,F,D,T,E=Math.floor(d+f);for(E>this.size-1&&(E=this.size-1),g=A;g<u;g++)for(v=this.size2*g,_=g/this.size-s,F=_*_,w=z;w<p;w++)for(M=v+this.size*w,C=w/this.size-i,D=C*C,b=m;b<E;b++)if(U=b/this.size-t,T=r/(1e-6+U*U+D+F)-o,T>0){this.field[M+b]+=T*n;const t=Math.sqrt((b-d)*(b-d)+(w-y)*(w-y)+(g-c)*(g-c))/f,e=1-t*t*t*(t*(6*t-15)+10);this.palette[3*(M+b)+0]+=h.r*e,this.palette[3*(M+b)+1]+=h.g*e,this.palette[3*(M+b)+2]+=h.b*e}},this.addPlaneX=function(t,e){const i=this.size,s=this.yd,r=this.zd,o=this.field;let a,n,l,h,f,c,y,d=i*Math.sqrt(t/e);for(d>i&&(d=i),a=0;a<d;a++)if(c=a/i,h=c*c,f=t/(1e-4+h)-e,f>0)for(n=0;n<i;n++)for(y=a+n*s,l=0;l<i;l++)o[r*l+y]+=f},this.addPlaneY=function(t,e){const i=this.size,s=this.yd,r=this.zd,o=this.field;let a,n,l,h,f,c,y,d,A=i*Math.sqrt(t/e);for(A>i&&(A=i),n=0;n<A;n++)if(c=n/i,h=c*c,f=t/(1e-4+h)-e,f>0)for(y=n*s,a=0;a<i;a++)for(d=y+a,l=0;l<i;l++)o[r*l+d]+=f},this.addPlaneZ=function(t,e){const i=this.size,s=this.yd,r=this.zd,o=this.field;let a,n,l,h,f,c,y,d,A=i*Math.sqrt(t/e);for(A>i&&(A=i),l=0;l<A;l++)if(c=l/i,h=c*c,f=t/(1e-4+h)-e,f>0)for(y=r*l,n=0;n<i;n++)for(d=y+n*s,a=0;a<i;a++)o[d+a]+=f},this.setCell=function(t,e,i,s){const r=this.size2*i+this.size*e+t;this.field[r]=s},this.getCell=function(t,e,i){const s=this.size2*i+this.size*e+t;return this.field[s]},this.blur=function(t=1){const e=this.field,i=e.slice(),s=this.size,r=this.size2;for(let o=0;o<s;o++)for(let a=0;a<s;a++)for(let n=0;n<s;n++){const l=r*n+s*a+o;let h=i[l],f=1;for(let e=-1;e<=1;e+=2){const l=e+o;if(!(l<0||l>=s))for(let e=-1;e<=1;e+=2){const o=e+a;if(!(o<0||o>=s))for(let e=-1;e<=1;e+=2){const a=e+n;if(a<0||a>=s)continue;const c=i[r*a+s*o+l];f++,h+=t*(c-h)/f}}}e[l]=h}},this.reset=function(){for(let t=0;t<this.size3;t++)this.normal_cache[3*t]=0,this.field[t]=0,this.palette[3*t]=this.palette[3*t+1]=this.palette[3*t+2]=0},this.onBeforeRender=function(){this.count=0;const t=this.size-2;for(let e=1;e<t;e++){const i=this.size2*e,s=(e-this.halfsize)/this.halfsize;for(let e=1;e<t;e++){const r=i+this.size*e,o=(e-this.halfsize)/this.halfsize;for(let e=1;e<t;e++)m((e-this.halfsize)/this.halfsize,o,s,r+e,this.isolation)}}for(let t=3*this.count;t<this.positionArray.length;t++)this.positionArray[t]=0;l.getAttribute("position").needsUpdate=!0,l.getAttribute("normal").needsUpdate=!0,this.enableUvs&&(l.getAttribute("uv").needsUpdate=!0),this.enableColors&&(l.getAttribute("color").needsUpdate=!0),this.count/3>n&&console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.")},this.init(t)}}i.prototype.isMarchingCubes=!0;const s=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),r=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);t.MarchingCubes=i,t.edgeTable=s,t.triTable=r,Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t["THREE-STD"]||{},t.THREE)}();