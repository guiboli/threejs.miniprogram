!function(){var e,t;e=this,t=function(e,t){"use strict";const o=new t.Vector3,n=new t.Vector3,r=new t.Vector3,i=new t.Vector3,s=new t.Vector3,c=new t.Vector3,a=new t.Vector3,p=new t.Quaternion;e.frameCorners=function(e,u,f,l,d=!1){const y=u,b=f,h=l,m=e.position,V=e.near,w=e.far;i.copy(b).sub(y).normalize(),s.copy(h).sub(y).normalize(),c.crossVectors(i,s).normalize(),o.copy(y).sub(m),n.copy(b).sub(m),r.copy(h).sub(m);const E=-o.dot(c),M=i.dot(o)*V/E,x=i.dot(n)*V/E,T=s.dot(o)*V/E,g=s.dot(r)*V/E;p.setFromUnitVectors(a.set(0,1,0),s),e.quaternion.setFromUnitVectors(a.set(0,0,1).applyQuaternion(p),c).multiply(p),e.projectionMatrix.set(2*V/(x-M),0,(x+M)/(x-M),0,0,2*V/(g-T),(g+T)/(g-T),0,0,0,(w+V)/(V-w),2*w*V/(V-w),0,0,-1,0),e.projectionMatrixInverse.copy(e.projectionMatrix).invert(),d&&(e.fov=t.MathUtils.RAD2DEG/Math.min(1,e.aspect)*Math.atan((a.copy(b).sub(y).length()+a.copy(h).sub(y).length())/o.length()))},Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();