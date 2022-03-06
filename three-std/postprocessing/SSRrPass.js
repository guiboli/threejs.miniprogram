!function(){var e,r;e=this,r=function(e,r,t,s,a){"use strict";class i extends t.Pass{constructor({renderer:e,scene:i,camera:l,width:h,height:n,selects:o}){super(),this.width=void 0!==h?h:512,this.height=void 0!==n?n:512,this.clear=!0,this.renderer=e,this.scene=i,this.camera=l,this.output=0,this.ior=s.SSRrShader.uniforms.ior.value,this.maxDistance=s.SSRrShader.uniforms.maxDistance.value,this.surfDist=s.SSRrShader.uniforms.surfDist.value,this.tempColor=new r.Color,this.selects=o,this._specular=s.SSRrShader.defines.SPECULAR,Object.defineProperty(this,"specular",{get(){return this._specular},set(e){this._specular!==e&&(this._specular=e,this.ssrrMaterial.defines.SPECULAR=e,this.ssrrMaterial.needsUpdate=!0)}}),this._fillHole=s.SSRrShader.defines.FILL_HOLE,Object.defineProperty(this,"fillHole",{get(){return this._fillHole},set(e){this._fillHole!==e&&(this._fillHole=e,this.ssrrMaterial.defines.FILL_HOLE=e,this.ssrrMaterial.needsUpdate=!0)}}),this._infiniteThick=s.SSRrShader.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(e){this._infiniteThick!==e&&(this._infiniteThick=e,this.ssrrMaterial.defines.INFINITE_THICK=e,this.ssrrMaterial.needsUpdate=!0)}});const d=new r.DepthTexture;d.type=r.UnsignedShortType,d.minFilter=r.NearestFilter,d.magFilter=r.NearestFilter,this.beautyRenderTarget=new r.WebGLRenderTarget(this.width,this.height,{minFilter:r.NearestFilter,magFilter:r.NearestFilter,format:r.RGBAFormat,depthTexture:d,depthBuffer:!0}),this.specularRenderTarget=new r.WebGLRenderTarget(this.width,this.height,{minFilter:r.NearestFilter,magFilter:r.NearestFilter,format:r.RGBAFormat});const c=new r.DepthTexture;c.type=r.UnsignedShortType,c.minFilter=r.NearestFilter,c.magFilter=r.NearestFilter,this.normalSelectsRenderTarget=new r.WebGLRenderTarget(this.width,this.height,{minFilter:r.NearestFilter,magFilter:r.NearestFilter,format:r.RGBAFormat,type:r.HalfFloatType,depthTexture:c,depthBuffer:!0}),this.refractiveRenderTarget=new r.WebGLRenderTarget(this.width,this.height,{minFilter:r.NearestFilter,magFilter:r.NearestFilter,format:r.RGBAFormat}),this.ssrrRenderTarget=new r.WebGLRenderTarget(this.width,this.height,{minFilter:r.NearestFilter,magFilter:r.NearestFilter,format:r.RGBAFormat}),void 0===s.SSRrShader&&console.error("THREE.SSRrPass: The pass relies on SSRrShader."),this.ssrrMaterial=new r.ShaderMaterial({defines:Object.assign({},s.SSRrShader.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:r.UniformsUtils.clone(s.SSRrShader.uniforms),vertexShader:s.SSRrShader.vertexShader,fragmentShader:s.SSRrShader.fragmentShader,blending:r.NoBlending}),this.ssrrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssrrMaterial.uniforms.tSpecular.value=this.specularRenderTarget.texture,this.ssrrMaterial.uniforms.tNormalSelects.value=this.normalSelectsRenderTarget.texture,this.ssrrMaterial.needsUpdate=!0,this.ssrrMaterial.uniforms.tRefractive.value=this.refractiveRenderTarget.texture,this.ssrrMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.ssrrMaterial.uniforms.tDepthSelects.value=this.normalSelectsRenderTarget.depthTexture,this.ssrrMaterial.uniforms.cameraNear.value=this.camera.near,this.ssrrMaterial.uniforms.cameraFar.value=this.camera.far,this.ssrrMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssrrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new r.MeshNormalMaterial,this.normalMaterial.blending=r.NoBlending,this.refractiveOnMaterial=new r.MeshBasicMaterial({color:"white"}),this.refractiveOffMaterial=new r.MeshBasicMaterial({color:"black"}),this.specularMaterial=new r.MeshStandardMaterial({color:"black",metalness:0,roughness:.2}),this.depthRenderMaterial=new r.ShaderMaterial({defines:Object.assign({},s.SSRrDepthShader.defines),uniforms:r.UniformsUtils.clone(s.SSRrDepthShader.uniforms),vertexShader:s.SSRrDepthShader.vertexShader,fragmentShader:s.SSRrDepthShader.fragmentShader,blending:r.NoBlending}),this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new r.ShaderMaterial({uniforms:r.UniformsUtils.clone(a.CopyShader.uniforms),vertexShader:a.CopyShader.vertexShader,fragmentShader:a.CopyShader.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:r.SrcAlphaFactor,blendDst:r.OneMinusSrcAlphaFactor,blendEquation:r.AddEquation,blendSrcAlpha:r.SrcAlphaFactor,blendDstAlpha:r.OneMinusSrcAlphaFactor,blendEquationAlpha:r.AddEquation}),this.fsQuad=new t.FullScreenQuad(null),this.originalClearColor=new r.Color}dispose(){this.beautyRenderTarget.dispose(),this.specularRenderTarget.dispose(),this.normalSelectsRenderTarget.dispose(),this.refractiveRenderTarget.dispose(),this.ssrrRenderTarget.dispose(),this.normalMaterial.dispose(),this.refractiveOnMaterial.dispose(),this.refractiveOffMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(e,t){switch(e.setRenderTarget(this.beautyRenderTarget),e.clear(),this.scene.children.forEach((e=>{this.selects.includes(e)?e.visible=!1:e.visible=!0})),e.render(this.scene,this.camera),e.setRenderTarget(this.specularRenderTarget),e.clear(),this.scene.children.forEach((e=>{this.selects.includes(e)?(e.visible=!0,e._SSRrPassBackupMaterial=e.material,e.material=this.specularMaterial):e.isLight||(e.visible=!1)})),e.render(this.scene,this.camera),this.scene.children.forEach((e=>{this.selects.includes(e)&&(e.material=e._SSRrPassBackupMaterial)})),this.scene.children.forEach((e=>{this.selects.includes(e)?e.visible=!0:e.visible=!1})),this.renderOverride(e,this.normalMaterial,this.normalSelectsRenderTarget,0,0),this.renderRefractive(e,this.refractiveOnMaterial,this.refractiveRenderTarget,0,0),this.ssrrMaterial.uniforms.ior.value=this.ior,this.ssrrMaterial.uniforms.maxDistance.value=this.maxDistance,this.ssrrMaterial.uniforms.surfDist.value=this.surfDist,this.ssrrMaterial.uniforms.tSpecular.value=this.specularRenderTarget.texture,this.renderPass(e,this.ssrrMaterial,this.ssrrRenderTarget),this.output){case i.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=r.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.copyMaterial.uniforms.tDiffuse.value=this.ssrrRenderTarget.texture,this.copyMaterial.blending=r.NormalBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.SSRr:this.copyMaterial.uniforms.tDiffuse.value=this.ssrrRenderTarget.texture,this.copyMaterial.blending=r.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=r.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Depth:this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.DepthSelects:this.depthRenderMaterial.uniforms.tDepth.value=this.normalSelectsRenderTarget.depthTexture,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.NormalSelects:this.copyMaterial.uniforms.tDiffuse.value=this.normalSelectsRenderTarget.texture,this.copyMaterial.blending=r.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Refractive:this.copyMaterial.uniforms.tDiffuse.value=this.refractiveRenderTarget.texture,this.copyMaterial.blending=r.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Specular:this.copyMaterial.uniforms.tDiffuse.value=this.specularRenderTarget.texture,this.copyMaterial.blending=r.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.SSRrPass: Unknown output type.")}}renderPass(e,r,t,s,a){this.originalClearColor.copy(e.getClearColor(this.tempColor));const i=e.getClearAlpha(this.tempColor),l=e.autoClear;e.setRenderTarget(t),e.autoClear=!1,null!=s&&(e.setClearColor(s),e.setClearAlpha(a||0),e.clear()),this.fsQuad.material=r,this.fsQuad.render(e),e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}renderOverride(e,r,t,s,a){this.originalClearColor.copy(e.getClearColor(this.tempColor));const i=e.getClearAlpha(this.tempColor),l=e.autoClear;e.setRenderTarget(t),e.autoClear=!1,s=r.clearColor||s,a=r.clearAlpha||a,null!=s&&(e.setClearColor(s),e.setClearAlpha(a||0),e.clear()),this.scene.overrideMaterial=r,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}renderRefractive(e,r,t,s,a){this.originalClearColor.copy(e.getClearColor(this.tempColor));const i=e.getClearAlpha(this.tempColor),l=e.autoClear;e.setRenderTarget(t),e.autoClear=!1,s=r.clearColor||s,a=r.clearAlpha||a,null!=s&&(e.setClearColor(s),e.setClearAlpha(a||0),e.clear()),this.scene.children.forEach((e=>{e.visible=!0})),this.scene.traverse((e=>{e._SSRrPassBackupMaterial=e.material,this.selects.includes(e)?e.material=this.refractiveOnMaterial:e.material=this.refractiveOffMaterial})),this.scene._SSRrPassBackupBackground=this.scene.background,this.scene.background=null,this.scene._SSRrPassBackupFog=this.scene.fog,this.scene.fog=null,e.render(this.scene,this.camera),this.scene.fog=this.scene._SSRrPassBackupFog,this.scene.background=this.scene._SSRrPassBackupBackground,this.scene.traverse((e=>{e.material=e._SSRrPassBackupMaterial})),e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}setSize(e,r){this.width=e,this.height=r,this.ssrrMaterial.defines.MAX_STEP=Math.sqrt(e*e+r*r),this.ssrrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(e,r),this.specularRenderTarget.setSize(e,r),this.ssrrRenderTarget.setSize(e,r),this.normalSelectsRenderTarget.setSize(e,r),this.refractiveRenderTarget.setSize(e,r),this.ssrrMaterial.uniforms.resolution.value.set(e,r),this.ssrrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse)}}i.OUTPUT={Default:0,SSRr:1,Beauty:3,Depth:4,DepthSelects:9,NormalSelects:5,Refractive:7,Specular:8},e.SSRrPass=i,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("three"),require("./Pass.js"),require("../shaders/SSRrShader.js"),require("../shaders/CopyShader.js")):"function"==typeof define&&define.amd?define(["exports","three","./Pass","../shaders/SSRrShader","../shaders/CopyShader"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE,e.THREE,e.THREE,e.THREE)}();