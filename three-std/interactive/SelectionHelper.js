!function(){var t,e;t=this,e=function(t,e){"use strict";t.SelectionHelper=class{constructor(t,i,n){this.element=document.createElement("div"),this.element.classList.add(n),this.element.style.pointerEvents="none",this.renderer=i,this.startPoint=new e.Vector2,this.pointTopLeft=new e.Vector2,this.pointBottomRight=new e.Vector2,this.isDown=!1,this.onPointerDown=function(t){this.isDown=!0,this.onSelectStart(t)}.bind(this),this.onPointerMove=function(t){this.isDown&&this.onSelectMove(t)}.bind(this),this.onPointerUp=function(){this.isDown=!1,this.onSelectOver()}.bind(this),this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown),this.renderer.domElement.addEventListener("pointermove",this.onPointerMove),this.renderer.domElement.addEventListener("pointerup",this.onPointerUp)}dispose(){this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),this.renderer.domElement.removeEventListener("pointermove",this.onPointerMove),this.renderer.domElement.removeEventListener("pointerup",this.onPointerUp)}onSelectStart(t){this.renderer.domElement.parentElement.appendChild(this.element),this.element.style.left=t.clientX+"px",this.element.style.top=t.clientY+"px",this.element.style.width="0px",this.element.style.height="0px",this.startPoint.x=t.clientX,this.startPoint.y=t.clientY}onSelectMove(t){this.pointBottomRight.x=Math.max(this.startPoint.x,t.clientX),this.pointBottomRight.y=Math.max(this.startPoint.y,t.clientY),this.pointTopLeft.x=Math.min(this.startPoint.x,t.clientX),this.pointTopLeft.y=Math.min(this.startPoint.y,t.clientY),this.element.style.left=this.pointTopLeft.x+"px",this.element.style.top=this.pointTopLeft.y+"px",this.element.style.width=this.pointBottomRight.x-this.pointTopLeft.x+"px",this.element.style.height=this.pointBottomRight.y-this.pointTopLeft.y+"px"}onSelectOver(){this.element.parentElement.removeChild(this.element)}},Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t["THREE-STD"]||{},t.THREE)}();
