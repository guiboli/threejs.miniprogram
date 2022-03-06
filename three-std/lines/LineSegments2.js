!function(){var e,t;e=this,t=function(e,t,n,r){"use strict";const i=new t.Vector3,a=new t.Vector3,o=new t.Vector4,s=new t.Vector4,c=new t.Vector4,l=new t.Vector3,u=new t.Matrix4,p=new t.Line3,y=new t.Vector3,m=new t.Box3,d=new t.Sphere,f=new t.Vector4;function x(e,t,n,r){return f.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),f.multiplyScalar(1/f.w),f.x=n/r.width,f.y=n/r.height,f.applyMatrix4(e.projectionMatrixInverse),f.multiplyScalar(1/f.w),Math.abs(Math.max(f.x,f.y))}class h extends t.Mesh{constructor(e=new n.LineSegmentsGeometry,t=new r.LineMaterial({color:16777215*Math.random()})){super(e,t),this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,n=e.attributes.instanceStart,r=e.attributes.instanceEnd,o=new Float32Array(2*n.count);for(let e=0,t=0,s=n.count;e<s;e++,t+=2)i.fromBufferAttribute(n,e),a.fromBufferAttribute(r,e),o[t]=0===t?0:o[t-1],o[t+1]=o[t]+i.distanceTo(a);const s=new t.InstancedInterleavedBuffer(o,2,1);return e.setAttribute("instanceDistanceStart",new t.InterleavedBufferAttribute(s,1,0)),e.setAttribute("instanceDistanceEnd",new t.InterleavedBufferAttribute(s,1,1)),this}raycast(e,n){null===e.camera&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2.');const r=void 0!==e.params.Line2&&e.params.Line2.threshold||0,i=e.ray,a=e.camera,f=a.projectionMatrix,h=this.matrixWorld,w=this.geometry,M=this.material,b=M.resolution,g=M.linewidth+r,S=w.attributes.instanceStart,z=w.attributes.instanceEnd,B=-a.near;null===w.boundingSphere&&w.computeBoundingSphere(),d.copy(w.boundingSphere).applyMatrix4(h);const L=x(a,Math.max(a.near,d.distanceToPoint(i.origin)),g,b);if(d.radius+=L,!1===e.ray.intersectsSphere(d))return;null===w.boundingBox&&w.computeBoundingBox(),m.copy(w.boundingBox).applyMatrix4(h);const T=x(a,Math.max(a.near,m.distanceToPoint(i.origin)),g,b);if(m.max.x+=T,m.max.y+=T,m.max.z+=T,m.min.x-=T,m.min.y-=T,m.min.z-=T,!1!==e.ray.intersectsBox(m)){i.at(1,c),c.w=1,c.applyMatrix4(a.matrixWorldInverse),c.applyMatrix4(f),c.multiplyScalar(1/c.w),c.x*=b.x/2,c.y*=b.y/2,c.z=0,l.copy(c),u.multiplyMatrices(a.matrixWorldInverse,h);for(let e=0,r=S.count;e<r;e++){if(o.fromBufferAttribute(S,e),s.fromBufferAttribute(z,e),o.w=1,s.w=1,o.applyMatrix4(u),s.applyMatrix4(u),o.z>B&&s.z>B)continue;if(o.z>B){const e=o.z-s.z,t=(o.z-B)/e;o.lerp(s,t)}else if(s.z>B){const e=s.z-o.z,t=(s.z-B)/e;s.lerp(o,t)}o.applyMatrix4(f),s.applyMatrix4(f),o.multiplyScalar(1/o.w),s.multiplyScalar(1/s.w),o.x*=b.x/2,o.y*=b.y/2,s.x*=b.x/2,s.y*=b.y/2,p.start.copy(o),p.start.z=0,p.end.copy(s),p.end.z=0;const r=p.closestPointToPointParameter(l,!0);p.at(r,y);const a=t.MathUtils.lerp(o.z,s.z,r),c=a>=-1&&a<=1,m=l.distanceTo(y)<.5*g;if(c&&m){p.start.fromBufferAttribute(S,e),p.end.fromBufferAttribute(z,e),p.start.applyMatrix4(h),p.end.applyMatrix4(h);const r=new t.Vector3,a=new t.Vector3;i.distanceSqToSegment(p.start,p.end,a,r),n.push({point:a,pointOnLine:r,distance:i.origin.distanceTo(a),object:this,face:null,faceIndex:e,uv:null,uv2:null})}}}}}h.prototype.isLineSegments2=!0,e.LineSegments2=h,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three"),require("./LineSegmentsGeometry.js"),require("./LineMaterial.js")):"function"==typeof define&&define.amd?define(["exports","three","./LineSegmentsGeometry","./LineMaterial"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE,e.THREE,e.THREE)}();