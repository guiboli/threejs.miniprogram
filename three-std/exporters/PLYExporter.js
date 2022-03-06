!function(){var t,e;t=this,e=function(t,e){"use strict";t.PLYExporter=class{parse(t,n,o){function r(e){t.traverse((function(t){if(!0===t.isMesh){const n=t,o=n.geometry;if(!0!==o.isBufferGeometry)throw new Error("THREE.PLYExporter: Geometry is not of type THREE.BufferGeometry.");!0===o.hasAttribute("position")&&e(n,o)}}))}n&&"object"==typeof n&&(console.warn('THREE.PLYExporter: The options parameter is now the third argument to the "parse" function. See the documentation for the new API.'),o=n,n=void 0);const i=(o=Object.assign({binary:!1,excludeAttributes:[],littleEndian:!1},o)).excludeAttributes;let l=!1,a=!1,f=!1,s=0,u=0;t.traverse((function(t){if(!0===t.isMesh){const e=t.geometry;if(!0!==e.isBufferGeometry)throw new Error("THREE.PLYExporter: Geometry is not of type THREE.BufferGeometry.");const n=e.getAttribute("position"),o=e.getAttribute("normal"),r=e.getAttribute("uv"),i=e.getAttribute("color"),d=e.getIndex();if(void 0===n)return;s+=n.count,u+=d?d.count/3:n.count/3,void 0!==o&&(l=!0),void 0!==r&&(f=!0),void 0!==i&&(a=!0)}}));const d=new e.Color,c=-1===i.indexOf("index");if(l=l&&-1===i.indexOf("normal"),a=a&&-1===i.indexOf("color"),f=f&&-1===i.indexOf("uv"),c&&u!==Math.floor(u))return console.error("PLYExporter: Failed to generate a valid PLY file with triangle indices because the number of indices is not divisible by 3."),null;let p=`ply\nformat ${o.binary?o.littleEndian?"binary_little_endian":"binary_big_endian":"ascii"} 1.0\nelement vertex ${s}\nproperty float x\nproperty float y\nproperty float z\n`;!0===l&&(p+="property float nx\nproperty float ny\nproperty float nz\n"),!0===f&&(p+="property float s\nproperty float t\n"),!0===a&&(p+="property uchar red\nproperty uchar green\nproperty uchar blue\n"),!0===c&&(p+=`element face ${u}\nproperty list uchar int vertex_index\n`),p+="end_header\n";const g=new e.Vector3,y=new e.Matrix3;let E=null;if(!0===o.binary){const t=(new TextEncoder).encode(p),e=s*(12+(l?12:0)+(a?3:0)+(f?8:0)),n=c?13*u:0,i=new DataView(new ArrayBuffer(t.length+e+n));new Uint8Array(i.buffer).set(t,0);let x=t.length,b=t.length+e,h=0;r((function(t,e){const n=e.getAttribute("position"),r=e.getAttribute("normal"),s=e.getAttribute("uv"),u=e.getAttribute("color"),p=e.getIndex();y.getNormalMatrix(t.matrixWorld);for(let e=0,c=n.count;e<c;e++)g.x=n.getX(e),g.y=n.getY(e),g.z=n.getZ(e),g.applyMatrix4(t.matrixWorld),i.setFloat32(x,g.x,o.littleEndian),x+=4,i.setFloat32(x,g.y,o.littleEndian),x+=4,i.setFloat32(x,g.z,o.littleEndian),x+=4,!0===l&&(null!=r?(g.x=r.getX(e),g.y=r.getY(e),g.z=r.getZ(e),g.applyMatrix3(y).normalize(),i.setFloat32(x,g.x,o.littleEndian),x+=4,i.setFloat32(x,g.y,o.littleEndian),x+=4,i.setFloat32(x,g.z,o.littleEndian),x+=4):(i.setFloat32(x,0,o.littleEndian),x+=4,i.setFloat32(x,0,o.littleEndian),x+=4,i.setFloat32(x,0,o.littleEndian),x+=4)),!0===f&&(null!=s?(i.setFloat32(x,s.getX(e),o.littleEndian),x+=4,i.setFloat32(x,s.getY(e),o.littleEndian),x+=4):(i.setFloat32(x,0,o.littleEndian),x+=4,i.setFloat32(x,0,o.littleEndian),x+=4)),!0===a&&(null!=u?(d.fromBufferAttribute(u,e).convertLinearToSRGB(),i.setUint8(x,Math.floor(255*d.r)),x+=1,i.setUint8(x,Math.floor(255*d.g)),x+=1,i.setUint8(x,Math.floor(255*d.b)),x+=1):(i.setUint8(x,255),x+=1,i.setUint8(x,255),x+=1,i.setUint8(x,255),x+=1));if(!0===c)if(null!==p)for(let t=0,e=p.count;t<e;t+=3)i.setUint8(b,3),b+=1,i.setUint32(b,p.getX(t+0)+h,o.littleEndian),b+=4,i.setUint32(b,p.getX(t+1)+h,o.littleEndian),b+=4,i.setUint32(b,p.getX(t+2)+h,o.littleEndian),b+=4;else for(let t=0,e=n.count;t<e;t+=3)i.setUint8(b,3),b+=1,i.setUint32(b,h+t,o.littleEndian),b+=4,i.setUint32(b,h+t+1,o.littleEndian),b+=4,i.setUint32(b,h+t+2,o.littleEndian),b+=4;h+=n.count})),E=i.buffer}else{let t=0,e="",n="";r((function(o,r){const i=r.getAttribute("position"),s=r.getAttribute("normal"),p=r.getAttribute("uv"),E=r.getAttribute("color"),x=r.getIndex();y.getNormalMatrix(o.matrixWorld);for(let t=0,n=i.count;t<n;t++){g.x=i.getX(t),g.y=i.getY(t),g.z=i.getZ(t),g.applyMatrix4(o.matrixWorld);let n=g.x+" "+g.y+" "+g.z;!0===l&&(null!=s?(g.x=s.getX(t),g.y=s.getY(t),g.z=s.getZ(t),g.applyMatrix3(y).normalize(),n+=" "+g.x+" "+g.y+" "+g.z):n+=" 0 0 0"),!0===f&&(n+=null!=p?" "+p.getX(t)+" "+p.getY(t):" 0 0"),!0===a&&(null!=E?(d.fromBufferAttribute(E,t).convertLinearToSRGB(),n+=" "+Math.floor(255*d.r)+" "+Math.floor(255*d.g)+" "+Math.floor(255*d.b)):n+=" 255 255 255"),e+=n+"\n"}if(!0===c){if(null!==x)for(let e=0,o=x.count;e<o;e+=3)n+=`3 ${x.getX(e+0)+t}`,n+=` ${x.getX(e+1)+t}`,n+=` ${x.getX(e+2)+t}\n`;else for(let e=0,o=i.count;e<o;e+=3)n+=`3 ${t+e} ${t+e+1} ${t+e+2}\n`;u+=x?x.count/3:i.count/3}t+=i.count})),E=`${p}${e}${c?`${n}\n`:"\n"}`}return"function"==typeof n&&requestAnimationFrame((()=>n(E))),E}},Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t["THREE-STD"]||{},t.THREE)}();