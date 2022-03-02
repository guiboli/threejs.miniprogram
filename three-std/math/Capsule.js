!function(){var t,s;t=this,s=function(t,s){"use strict";const e=new s.Vector3,i=new s.Vector3,a=new s.Vector3;class n{constructor(t=new s.Vector3(0,0,0),e=new s.Vector3(0,1,0),i=1){this.start=t,this.end=e,this.radius=i}clone(){return new n(this.start.clone(),this.end.clone(),this.radius)}set(t,s,e){this.start.copy(t),this.end.copy(s),this.radius=e}copy(t){this.start.copy(t.start),this.end.copy(t.end),this.radius=t.radius}getCenter(t){return t.copy(this.end).add(this.start).multiplyScalar(.5)}translate(t){this.start.add(t),this.end.add(t)}checkAABBAxis(t,s,e,i,a,n,r,h,d){return(a-t<d||a-e<d)&&(t-n<d||e-n<d)&&(r-s<d||r-i<d)&&(s-h<d||i-h<d)}intersectsBox(t){return this.checkAABBAxis(this.start.x,this.start.y,this.end.x,this.end.y,t.min.x,t.max.x,t.min.y,t.max.y,this.radius)&&this.checkAABBAxis(this.start.x,this.start.z,this.end.x,this.end.z,t.min.x,t.max.x,t.min.z,t.max.z,this.radius)&&this.checkAABBAxis(this.start.y,this.start.z,this.end.y,this.end.z,t.min.y,t.max.y,t.min.z,t.max.z,this.radius)}lineLineMinimumPoints(t,s){const n=e.copy(t.end).sub(t.start),r=i.copy(s.end).sub(s.start),h=a.copy(s.start).sub(t.start),d=n.dot(r),o=n.dot(n),c=r.dot(r),u=r.dot(h),l=n.dot(h);let y,x;const m=o*c-d*d;if(Math.abs(m)<1e-10){const t=-u/c,s=(d-u)/c;Math.abs(t-.5)<Math.abs(s-.5)?(y=0,x=t):(y=1,x=s)}else y=(u*d+l*c)/m,x=(y*d-u)/c;return x=Math.max(0,Math.min(1,x)),y=Math.max(0,Math.min(1,y)),[n.multiplyScalar(y).add(t.start),r.multiplyScalar(x).add(s.start)]}}t.Capsule=n,Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?s(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],s):s((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t["THREE-STD"]||{},t.THREE)}();
