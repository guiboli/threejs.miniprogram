!function(){var e,t;e=this,t=function(e,t){"use strict";e.OBJExporter=class{parse(e){let o="",r=0,n=0,i=0;const f=new t.Vector3,l=new t.Color,u=new t.Vector3,s=new t.Vector2,a=[];return e.traverse((function(e){!0===e.isMesh&&function(e){let l=0,c=0,y=0;const m=e.geometry,p=new t.Matrix3;if(!0!==m.isBufferGeometry)throw new Error("THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.");const g=m.getAttribute("position"),x=m.getAttribute("normal"),E=m.getAttribute("uv"),d=m.getIndex();if(o+="o "+e.name+"\n",e.material&&e.material.name&&(o+="usemtl "+e.material.name+"\n"),void 0!==g)for(let t=0,r=g.count;t<r;t++,l++)f.x=g.getX(t),f.y=g.getY(t),f.z=g.getZ(t),f.applyMatrix4(e.matrixWorld),o+="v "+f.x+" "+f.y+" "+f.z+"\n";if(void 0!==E)for(let e=0,t=E.count;e<t;e++,y++)s.x=E.getX(e),s.y=E.getY(e),o+="vt "+s.x+" "+s.y+"\n";if(void 0!==x){p.getNormalMatrix(e.matrixWorld);for(let e=0,t=x.count;e<t;e++,c++)u.x=x.getX(e),u.y=x.getY(e),u.z=x.getZ(e),u.applyMatrix3(p).normalize(),o+="vn "+u.x+" "+u.y+" "+u.z+"\n"}if(null!==d)for(let e=0,t=d.count;e<t;e+=3){for(let t=0;t<3;t++){const o=d.getX(e+t)+1;a[t]=r+o+(x||E?"/"+(E?n+o:"")+(x?"/"+(i+o):""):"")}o+="f "+a.join(" ")+"\n"}else for(let e=0,t=g.count;e<t;e+=3){for(let t=0;t<3;t++){const o=e+t+1;a[t]=r+o+(x||E?"/"+(E?n+o:"")+(x?"/"+(i+o):""):"")}o+="f "+a.join(" ")+"\n"}r+=l,n+=y,i+=c}(e),!0===e.isLine&&function(e){let t=0;const n=e.geometry,i=e.type;if(!0!==n.isBufferGeometry)throw new Error("THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.");const l=n.getAttribute("position");if(o+="o "+e.name+"\n",void 0!==l)for(let r=0,n=l.count;r<n;r++,t++)f.x=l.getX(r),f.y=l.getY(r),f.z=l.getZ(r),f.applyMatrix4(e.matrixWorld),o+="v "+f.x+" "+f.y+" "+f.z+"\n";if("Line"===i){o+="l ";for(let e=1,t=l.count;e<=t;e++)o+=r+e+" ";o+="\n"}if("LineSegments"===i)for(let e=1,t=e+1,n=l.count;e<n;e+=2,t=e+1)o+="l "+(r+e)+" "+(r+t)+"\n";r+=t}(e),!0===e.isPoints&&function(e){let t=0;const n=e.geometry;if(!0!==n.isBufferGeometry)throw new Error("THREE.OBJExporter: Geometry is not of type THREE.BufferGeometry.");const i=n.getAttribute("position"),u=n.getAttribute("color");if(o+="o "+e.name+"\n",void 0!==i){for(let r=0,n=i.count;r<n;r++,t++)f.fromBufferAttribute(i,r),f.applyMatrix4(e.matrixWorld),o+="v "+f.x+" "+f.y+" "+f.z,void 0!==u&&(l.fromBufferAttribute(u,r).convertLinearToSRGB(),o+=" "+l.r+" "+l.g+" "+l.b),o+="\n";o+="p ";for(let e=1,t=i.count;e<=t;e++)o+=r+e+" ";o+="\n"}r+=t}(e)})),o}},Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();
