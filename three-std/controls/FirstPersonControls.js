!function(){var e,t;e=this,t=function(e,t){"use strict";const i=new t.Vector3,o=new t.Spherical,s=new t.Vector3;function h(e){e.preventDefault()}e.FirstPersonControls=class{constructor(e,n){void 0===n&&(console.warn('THREE.FirstPersonControls: The second parameter "domElement" is now mandatory.'),n=document),this.object=e,this.domElement=n,this.enabled=!0,this.movementSpeed=1,this.lookSpeed=.005,this.lookVertical=!0,this.autoForward=!1,this.activeLook=!0,this.heightSpeed=!1,this.heightCoef=1,this.heightMin=0,this.heightMax=1,this.constrainVertical=!1,this.verticalMin=0,this.verticalMax=Math.PI,this.mouseDragOn=!1,this.autoSpeedFactor=0,this.mouseX=0,this.mouseY=0,this.moveForward=!1,this.moveBackward=!1,this.moveLeft=!1,this.moveRight=!1,this.viewHalfX=0,this.viewHalfY=0;let a=0,r=0;this.handleResize=function(){this.domElement===document?(this.viewHalfX=window.innerWidth/2,this.viewHalfY=window.innerHeight/2):(this.viewHalfX=this.domElement.offsetWidth/2,this.viewHalfY=this.domElement.offsetHeight/2)},this.onMouseDown=function(e){if(this.domElement!==document&&this.domElement.focus(),this.activeLook)switch(e.button){case 0:this.moveForward=!0;break;case 2:this.moveBackward=!0}this.mouseDragOn=!0},this.onMouseUp=function(e){if(this.activeLook)switch(e.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.mouseDragOn=!1},this.onMouseMove=function(e){this.domElement===document?(this.mouseX=e.pageX-this.viewHalfX,this.mouseY=e.pageY-this.viewHalfY):(this.mouseX=e.pageX-this.domElement.offsetLeft-this.viewHalfX,this.mouseY=e.pageY-this.domElement.offsetTop-this.viewHalfY)},this.onKeyDown=function(e){switch(e.code){case"ArrowUp":case"KeyW":this.moveForward=!0;break;case"ArrowLeft":case"KeyA":this.moveLeft=!0;break;case"ArrowDown":case"KeyS":this.moveBackward=!0;break;case"ArrowRight":case"KeyD":this.moveRight=!0;break;case"KeyR":this.moveUp=!0;break;case"KeyF":this.moveDown=!0}},this.onKeyUp=function(e){switch(e.code){case"ArrowUp":case"KeyW":this.moveForward=!1;break;case"ArrowLeft":case"KeyA":this.moveLeft=!1;break;case"ArrowDown":case"KeyS":this.moveBackward=!1;break;case"ArrowRight":case"KeyD":this.moveRight=!1;break;case"KeyR":this.moveUp=!1;break;case"KeyF":this.moveDown=!1}},this.lookAt=function(e,t,i){return e.isVector3?s.copy(e):s.set(e,t,i),this.object.lookAt(s),u(this),this},this.update=function(){const e=new t.Vector3;return function(i){if(!1===this.enabled)return;if(this.heightSpeed){const e=t.MathUtils.clamp(this.object.position.y,this.heightMin,this.heightMax)-this.heightMin;this.autoSpeedFactor=i*(e*this.heightCoef)}else this.autoSpeedFactor=0;const o=i*this.movementSpeed;(this.moveForward||this.autoForward&&!this.moveBackward)&&this.object.translateZ(-(o+this.autoSpeedFactor)),this.moveBackward&&this.object.translateZ(o),this.moveLeft&&this.object.translateX(-o),this.moveRight&&this.object.translateX(o),this.moveUp&&this.object.translateY(o),this.moveDown&&this.object.translateY(-o);let s=i*this.lookSpeed;this.activeLook||(s=0);let h=1;this.constrainVertical&&(h=Math.PI/(this.verticalMax-this.verticalMin)),r-=this.mouseX*s,this.lookVertical&&(a-=this.mouseY*s*h),a=Math.max(-85,Math.min(85,a));let n=t.MathUtils.degToRad(90-a);const c=t.MathUtils.degToRad(r);this.constrainVertical&&(n=t.MathUtils.mapLinear(n,0,Math.PI,this.verticalMin,this.verticalMax));const m=this.object.position;e.setFromSphericalCoords(1,n,c).add(m),this.object.lookAt(e)}}(),this.dispose=function(){this.domElement.removeEventListener("contextmenu",h),this.domElement.removeEventListener("mousedown",m),this.domElement.removeEventListener("mousemove",c),this.domElement.removeEventListener("mouseup",d),window.removeEventListener("keydown",l),window.removeEventListener("keyup",v)};const c=this.onMouseMove.bind(this),m=this.onMouseDown.bind(this),d=this.onMouseUp.bind(this),l=this.onKeyDown.bind(this),v=this.onKeyUp.bind(this);function u(e){const s=e.object.quaternion;i.set(0,0,-1).applyQuaternion(s),o.setFromVector3(i),a=90-t.MathUtils.radToDeg(o.phi),r=t.MathUtils.radToDeg(o.theta)}this.domElement.addEventListener("contextmenu",h),this.domElement.addEventListener("mousemove",c),this.domElement.addEventListener("mousedown",m),this.domElement.addEventListener("mouseup",d),window.addEventListener("keydown",l),window.addEventListener("keyup",v),this.handleResize(),u(this)}},Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();
