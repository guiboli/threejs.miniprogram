!function(){var e,t;e=this,t=function(e,t){"use strict";var o=function(e,o){var n,a,i,c,s,r,u;void 0===o&&console.warn('THREE.CameraControls: The second parameter "domElement" is now mandatory.'),o===document&&console.error('THREE.CameraControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=o,this.enabled=!0,this.target=new t.Vector3,this.trackball=!1,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:t.MOUSE.ROTATE,MIDDLE:t.MOUSE.DOLLY,RIGHT:t.MOUSE.PAN},this.touches={ONE:t.TOUCH.ROTATE,TWO:t.TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.quaternion0=this.object.quaternion.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return f.phi},this.getAzimuthalAngle=function(){return f.theta},this.saveState=function(){l.target0.copy(l.target),l.position0.copy(l.object.position),l.quaternion0.copy(l.object.quaternion),l.zoom0=l.object.zoom},this.reset=function(){l.target.copy(l.target0),l.object.position.copy(l.position0),l.object.quaternion.copy(l.quaternion0),l.object.zoom=l.zoom0,l.object.updateProjectionMatrix(),l.dispatchEvent(m),l.update(),b=d.NONE},this.update=(n=new t.Vector3,a=(new t.Quaternion).setFromUnitVectors(e.up,new t.Vector3(0,1,0)),i=a.clone().invert(),c=new t.Vector3,s=new t.Quaternion,r=new t.Quaternion,u=new t.Vector3,function(){var e=l.object.position;if(n.copy(e).sub(l.target),l.trackball){if(O.theta){u.set(0,1,0).applyQuaternion(l.object.quaternion);const e=l.enableDamping?l.dampingFactor:1;r.setFromAxisAngle(u,O.theta*e),l.object.quaternion.premultiply(r),n.applyQuaternion(r)}if(O.phi){u.set(1,0,0).applyQuaternion(l.object.quaternion);const e=l.enableDamping?l.dampingFactor:1;r.setFromAxisAngle(u,O.phi*e),l.object.quaternion.premultiply(r),n.applyQuaternion(r)}n.multiplyScalar(g),n.clampLength(l.minDistance,l.maxDistance)}else n.applyQuaternion(a),l.autoRotate&&b===d.NONE&&M(2*Math.PI/60/60*l.autoRotateSpeed),f.setFromVector3(n),l.enableDamping?(f.theta+=O.theta*l.dampingFactor,f.phi+=O.phi*l.dampingFactor):(f.theta+=O.theta,f.phi+=O.phi),f.theta=Math.max(l.minAzimuthAngle,Math.min(l.maxAzimuthAngle,f.theta)),f.phi=Math.max(l.minPolarAngle,Math.min(l.maxPolarAngle,f.phi)),f.makeSafe(),f.radius*=g,f.radius=Math.max(l.minDistance,Math.min(l.maxDistance,f.radius)),n.setFromSpherical(f),n.applyQuaternion(i);return!0===l.enableDamping?l.target.addScaledVector(T,l.dampingFactor):l.target.add(T),e.copy(l.target).add(n),!1===l.trackball&&l.object.lookAt(l.target),!0===l.enableDamping?(O.theta*=1-l.dampingFactor,O.phi*=1-l.dampingFactor,T.multiplyScalar(1-l.dampingFactor)):(O.set(0,0,0),T.set(0,0,0)),g=1,!!(v||c.distanceToSquared(l.object.position)>E||8*(1-s.dot(l.object.quaternion))>E)&&(l.dispatchEvent(m),c.copy(l.object.position),s.copy(l.object.quaternion),v=!1,!0)}),this.dispose=function(){l.domElement.removeEventListener("contextmenu",oe,!1),l.domElement.removeEventListener("mousedown",G,!1),l.domElement.removeEventListener("wheel",K,!1),l.domElement.removeEventListener("touchstart",$,!1),l.domElement.removeEventListener("touchend",te,!1),l.domElement.removeEventListener("touchmove",ee,!1),document.removeEventListener("mousemove",Q,!1),document.removeEventListener("mouseup",W,!1),l.domElement.removeEventListener("keydown",J,!1)};var l=this,m={type:"change"},h={type:"start"},p={type:"end"},d={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},b=d.NONE,E=1e-6,f=new t.Spherical,O=new t.Spherical,g=1,T=new t.Vector3,v=!1,y=new t.Vector2,A=new t.Vector2,P=new t.Vector2,L=new t.Vector2,N=new t.Vector2,j=new t.Vector2,R=new t.Vector2,w=new t.Vector2,C=new t.Vector2;function S(){return Math.pow(.95,l.zoomSpeed)}function M(e){O.theta-=e}function k(e){O.phi-=e}var D,H=(D=new t.Vector3,function(e,t){D.setFromMatrixColumn(t,0),D.multiplyScalar(-e),T.add(D)}),Y=function(){var e=new t.Vector3;return function(t,o){!0===l.screenSpacePanning?e.setFromMatrixColumn(o,1):(e.setFromMatrixColumn(o,0),e.crossVectors(l.object.up,e)),e.multiplyScalar(t),T.add(e)}}(),U=function(){var e=new t.Vector3;return function(t,o){var n=l.domElement;if(l.object.isPerspectiveCamera){var a=l.object.position;e.copy(a).sub(l.target);var i=e.length();i*=Math.tan(l.object.fov/2*Math.PI/180),H(2*t*i/n.clientHeight,l.object.matrix),Y(2*o*i/n.clientHeight,l.object.matrix)}else l.object.isOrthographicCamera?(H(t*(l.object.right-l.object.left)/l.object.zoom/n.clientWidth,l.object.matrix),Y(o*(l.object.top-l.object.bottom)/l.object.zoom/n.clientHeight,l.object.matrix)):(console.warn("WARNING: CameraControls.js encountered an unknown camera type - pan disabled."),l.enablePan=!1)}}();function x(e){l.object.isPerspectiveCamera?g/=e:l.object.isOrthographicCamera?(l.object.zoom=Math.max(l.minZoom,Math.min(l.maxZoom,l.object.zoom*e)),l.object.updateProjectionMatrix(),v=!0):(console.warn("WARNING: CameraControls.js encountered an unknown camera type - dolly/zoom disabled."),l.enableZoom=!1)}function V(e){l.object.isPerspectiveCamera?g*=e:l.object.isOrthographicCamera?(l.object.zoom=Math.max(l.minZoom,Math.min(l.maxZoom,l.object.zoom/e)),l.object.updateProjectionMatrix(),v=!0):(console.warn("WARNING: CameraControls.js encountered an unknown camera type - dolly/zoom disabled."),l.enableZoom=!1)}function _(e){y.set(e.clientX,e.clientY)}function F(e){L.set(e.clientX,e.clientY)}function z(e){if(1==e.touches.length)y.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);y.set(t,o)}}function X(e){if(1==e.touches.length)L.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);L.set(t,o)}}function I(e){var t=e.touches[0].pageX-e.touches[1].pageX,o=e.touches[0].pageY-e.touches[1].pageY,n=Math.sqrt(t*t+o*o);R.set(0,n)}function Z(e){if(1==e.touches.length)A.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);A.set(t,o)}P.subVectors(A,y).multiplyScalar(l.rotateSpeed);var n=l.domElement;M(2*Math.PI*P.x/n.clientHeight),k(2*Math.PI*P.y/n.clientHeight),y.copy(A)}function q(e){if(1==e.touches.length)N.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);N.set(t,o)}j.subVectors(N,L).multiplyScalar(l.panSpeed),U(j.x,j.y),L.copy(N)}function B(e){var t=e.touches[0].pageX-e.touches[1].pageX,o=e.touches[0].pageY-e.touches[1].pageY,n=Math.sqrt(t*t+o*o);w.set(0,n),C.set(0,Math.pow(w.y/R.y,l.zoomSpeed)),x(C.y),R.copy(w)}function G(e){if(!1!==l.enabled){var o;switch(e.preventDefault(),l.domElement.focus?l.domElement.focus():window.focus(),e.button){case 0:o=l.mouseButtons.LEFT;break;case 1:o=l.mouseButtons.MIDDLE;break;case 2:o=l.mouseButtons.RIGHT;break;default:o=-1}switch(o){case t.MOUSE.DOLLY:if(!1===l.enableZoom)return;!function(e){R.set(e.clientX,e.clientY)}(e),b=d.DOLLY;break;case t.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===l.enablePan)return;F(e),b=d.PAN}else{if(!1===l.enableRotate)return;_(e),b=d.ROTATE}break;case t.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===l.enableRotate)return;_(e),b=d.ROTATE}else{if(!1===l.enablePan)return;F(e),b=d.PAN}break;default:b=d.NONE}b!==d.NONE&&(document.addEventListener("mousemove",Q,!1),document.addEventListener("mouseup",W,!1),l.dispatchEvent(h))}}function Q(e){if(!1!==l.enabled)switch(e.preventDefault(),b){case d.ROTATE:if(!1===l.enableRotate)return;!function(e){A.set(e.clientX,e.clientY),P.subVectors(A,y).multiplyScalar(l.rotateSpeed);var t=l.domElement;M(2*Math.PI*P.x/t.clientHeight),k(2*Math.PI*P.y/t.clientHeight),y.copy(A),l.update()}(e);break;case d.DOLLY:if(!1===l.enableZoom)return;!function(e){w.set(e.clientX,e.clientY),C.subVectors(w,R),C.y>0?x(S()):C.y<0&&V(S()),R.copy(w),l.update()}(e);break;case d.PAN:if(!1===l.enablePan)return;!function(e){N.set(e.clientX,e.clientY),j.subVectors(N,L).multiplyScalar(l.panSpeed),U(j.x,j.y),L.copy(N),l.update()}(e)}}function W(e){!1!==l.enabled&&(document.removeEventListener("mousemove",Q,!1),document.removeEventListener("mouseup",W,!1),l.dispatchEvent(p),b=d.NONE)}function K(e){!1===l.enabled||!1===l.enableZoom||b!==d.NONE&&b!==d.ROTATE||(e.preventDefault(),e.stopPropagation(),l.dispatchEvent(h),function(e){e.deltaY<0?V(S()):e.deltaY>0&&x(S()),l.update()}(e),l.dispatchEvent(p))}function J(e){!1!==l.enabled&&!1!==l.enableKeys&&!1!==l.enablePan&&function(e){var t=!1;switch(e.keyCode){case l.keys.UP:U(0,l.keyPanSpeed),t=!0;break;case l.keys.BOTTOM:U(0,-l.keyPanSpeed),t=!0;break;case l.keys.LEFT:U(l.keyPanSpeed,0),t=!0;break;case l.keys.RIGHT:U(-l.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),l.update())}(e)}function $(e){if(!1!==l.enabled){switch(e.preventDefault(),e.touches.length){case 1:switch(l.touches.ONE){case t.TOUCH.ROTATE:if(!1===l.enableRotate)return;z(e),b=d.TOUCH_ROTATE;break;case t.TOUCH.PAN:if(!1===l.enablePan)return;X(e),b=d.TOUCH_PAN;break;default:b=d.NONE}break;case 2:switch(l.touches.TWO){case t.TOUCH.DOLLY_PAN:if(!1===l.enableZoom&&!1===l.enablePan)return;!function(e){l.enableZoom&&I(e),l.enablePan&&X(e)}(e),b=d.TOUCH_DOLLY_PAN;break;case t.TOUCH.DOLLY_ROTATE:if(!1===l.enableZoom&&!1===l.enableRotate)return;!function(e){l.enableZoom&&I(e),l.enableRotate&&z(e)}(e),b=d.TOUCH_DOLLY_ROTATE;break;default:b=d.NONE}break;default:b=d.NONE}b!==d.NONE&&l.dispatchEvent(h)}}function ee(e){if(!1!==l.enabled)switch(e.preventDefault(),e.stopPropagation(),b){case d.TOUCH_ROTATE:if(!1===l.enableRotate)return;Z(e),l.update();break;case d.TOUCH_PAN:if(!1===l.enablePan)return;q(e),l.update();break;case d.TOUCH_DOLLY_PAN:if(!1===l.enableZoom&&!1===l.enablePan)return;!function(e){l.enableZoom&&B(e),l.enablePan&&q(e)}(e),l.update();break;case d.TOUCH_DOLLY_ROTATE:if(!1===l.enableZoom&&!1===l.enableRotate)return;!function(e){l.enableZoom&&B(e),l.enableRotate&&Z(e)}(e),l.update();break;default:b=d.NONE}}function te(e){!1!==l.enabled&&(l.dispatchEvent(p),b=d.NONE)}function oe(e){!1!==l.enabled&&e.preventDefault()}l.domElement.addEventListener("contextmenu",oe,!1),l.domElement.addEventListener("mousedown",G,!1),l.domElement.addEventListener("wheel",K,!1),l.domElement.addEventListener("touchstart",$,!1),l.domElement.addEventListener("touchend",te,!1),l.domElement.addEventListener("touchmove",ee,!1),l.domElement.addEventListener("keydown",J,!1),-1===l.domElement.tabIndex&&(l.domElement.tabIndex=0),this.object.lookAt(l.target),this.update(),this.saveState()};(o.prototype=Object.create(t.EventDispatcher.prototype)).constructor=o;var n=function(e,n){o.call(this,e,n),this.mouseButtons.LEFT=t.MOUSE.ROTATE,this.mouseButtons.RIGHT=t.MOUSE.PAN,this.touches.ONE=t.TOUCH.ROTATE,this.touches.TWO=t.TOUCH.DOLLY_PAN};(n.prototype=Object.create(t.EventDispatcher.prototype)).constructor=n;var a=function(e,n){o.call(this,e,n),this.mouseButtons.LEFT=t.MOUSE.PAN,this.mouseButtons.RIGHT=t.MOUSE.ROTATE,this.touches.ONE=t.TOUCH.PAN,this.touches.TWO=t.TOUCH.DOLLY_ROTATE};(a.prototype=Object.create(t.EventDispatcher.prototype)).constructor=a;var i=function(e,n){o.call(this,e,n),this.trackball=!0,this.screenSpacePanning=!0,this.autoRotate=!1,this.mouseButtons.LEFT=t.MOUSE.ROTATE,this.mouseButtons.RIGHT=t.MOUSE.PAN,this.touches.ONE=t.TOUCH.ROTATE,this.touches.TWO=t.TOUCH.DOLLY_PAN};(i.prototype=Object.create(t.EventDispatcher.prototype)).constructor=i,e.CameraControls=o,e.MapControls=a,e.OrbitControls=n,e.TrackballControls=i,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();
