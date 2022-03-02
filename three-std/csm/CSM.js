!function(){var e,t;e=this,t=function(e,t,s,a){"use strict";const i=new t.Matrix4,r=new s.CSMFrustum,h=new t.Vector3,n=new t.Box3,o=[],c=[];e.CSM=class{constructor(e){e=e||{},this.camera=e.camera,this.parent=e.parent,this.cascades=e.cascades||3,this.maxFar=e.maxFar||1e5,this.mode=e.mode||"practical",this.shadowMapSize=e.shadowMapSize||2048,this.shadowBias=e.shadowBias||1e-6,this.lightDirection=e.lightDirection||new t.Vector3(1,-1,1).normalize(),this.lightIntensity=e.lightIntensity||1,this.lightNear=e.lightNear||1,this.lightFar=e.lightFar||2e3,this.lightMargin=e.lightMargin||200,this.customSplitsCallback=e.customSplitsCallback,this.fade=!1,this.mainFrustum=new s.CSMFrustum,this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this.createLights(),this.updateFrustums(),this.injectInclude()}createLights(){for(let e=0;e<this.cascades;e++){const e=new t.DirectionalLight(16777215,this.lightIntensity);e.castShadow=!0,e.shadow.mapSize.width=this.shadowMapSize,e.shadow.mapSize.height=this.shadowMapSize,e.shadow.camera.near=this.lightNear,e.shadow.camera.far=this.lightFar,e.shadow.bias=this.shadowBias,this.parent.add(e),this.parent.add(e.target),this.lights.push(e)}}initCascades(){const e=this.camera;e.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(e.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}updateShadowBounds(){const e=this.frustums;for(let t=0;t<e.length;t++){const e=this.lights[t].shadow.camera,s=this.frustums[t],a=s.vertices.near,i=s.vertices.far,r=i[0];let h;h=r.distanceTo(i[2])>r.distanceTo(a[2])?i[2]:a[2];let n=r.distanceTo(h);if(this.fade){const e=this.camera,t=Math.max(e.far,this.maxFar),a=s.vertices.far[0].z/(t-e.near);n+=.25*Math.pow(a,2)*(t-e.near)}e.left=-n/2,e.right=n/2,e.top=n/2,e.bottom=-n/2,e.updateProjectionMatrix()}}getBreaks(){const e=this.camera,s=Math.min(e.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":a(this.cascades,e.near,s,this.breaks);break;case"logarithmic":i(this.cascades,e.near,s,this.breaks);break;case"practical":!function(e,s,r,h,n){o.length=0,c.length=0,i(e,s,r,c),a(e,s,r,o);for(let s=1;s<e;s++)n.push(t.MathUtils.lerp(o[s-1],c[s-1],h));n.push(1)}(this.cascades,e.near,s,.5,this.breaks);break;case"custom":void 0===this.customSplitsCallback&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,e.near,s,this.breaks)}function a(e,t,s,a){for(let i=1;i<e;i++)a.push((t+(s-t)*i/e)/s);a.push(1)}function i(e,t,s,a){for(let i=1;i<e;i++)a.push(t*(s/t)**(i/e)/s);a.push(1)}}update(){const e=this.camera,t=this.frustums;for(let s=0;s<t.length;s++){const a=this.lights[s],o=a.shadow.camera,c=(o.right-o.left)/this.shadowMapSize,d=(o.top-o.bottom)/this.shadowMapSize;a.shadow.camera.updateMatrixWorld(!0),i.multiplyMatrices(a.shadow.camera.matrixWorldInverse,e.matrixWorld),t[s].toSpace(i,r);const l=r.vertices.near,u=r.vertices.far;n.makeEmpty();for(let e=0;e<4;e++)n.expandByPoint(l[e]),n.expandByPoint(u[e]);n.getCenter(h),h.z=n.max.z+this.lightMargin,h.x=Math.floor(h.x/c)*c,h.y=Math.floor(h.y/d)*d,h.applyMatrix4(a.shadow.camera.matrixWorld),a.position.copy(h),a.target.position.copy(h),a.target.position.x+=this.lightDirection.x,a.target.position.y+=this.lightDirection.y,a.target.position.z+=this.lightDirection.z}}injectInclude(){t.ShaderChunk.lights_fragment_begin=a.CSMShader.lights_fragment_begin,t.ShaderChunk.lights_pars_begin=a.CSMShader.lights_pars_begin}setupMaterial(e){e.defines=e.defines||{},e.defines.USE_CSM=1,e.defines.CSM_CASCADES=this.cascades,this.fade&&(e.defines.CSM_FADE="");const t=[],s=this,a=this.shaders;e.onBeforeCompile=function(i){const r=Math.min(s.camera.far,s.maxFar);s.getExtendedBreaks(t),i.uniforms.CSM_cascades={value:t},i.uniforms.cameraNear={value:s.camera.near},i.uniforms.shadowFar={value:r},a.set(e,i)},a.set(e,null)}updateUniforms(){const e=Math.min(this.camera.far,this.maxFar);this.shaders.forEach((function(t,s){if(null!==t){const s=t.uniforms;this.getExtendedBreaks(s.CSM_cascades.value),s.cameraNear.value=this.camera.near,s.shadowFar.value=e}!this.fade&&"CSM_FADE"in s.defines?(delete s.defines.CSM_FADE,s.needsUpdate=!0):this.fade&&!("CSM_FADE"in s.defines)&&(s.defines.CSM_FADE="",s.needsUpdate=!0)}),this)}getExtendedBreaks(e){for(;e.length<this.breaks.length;)e.push(new t.Vector2);e.length=this.breaks.length;for(let t=0;t<this.cascades;t++){const s=this.breaks[t],a=this.breaks[t-1]||0;e[t].x=a,e[t].y=s}}updateFrustums(){this.getBreaks(),this.initCascades(),this.updateShadowBounds(),this.updateUniforms()}remove(){for(let e=0;e<this.lights.length;e++)this.parent.remove(this.lights[e])}dispose(){const e=this.shaders;e.forEach((function(e,t){delete t.onBeforeCompile,delete t.defines.USE_CSM,delete t.defines.CSM_CASCADES,delete t.defines.CSM_FADE,null!==e&&(delete e.uniforms.CSM_cascades,delete e.uniforms.cameraNear,delete e.uniforms.shadowFar),t.needsUpdate=!0})),e.clear()}},Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three"),require("./CSMFrustum.js"),require("./CSMShader.js")):"function"==typeof define&&define.amd?define(["exports","three","./CSMFrustum","./CSMShader"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE,e.THREE,e.THREE)}();
