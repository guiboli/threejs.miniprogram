!function(){var e,t;e=this,t=function(e,t,r,s,i){"use strict";class a extends r.Pass{constructor({renderer:e,scene:a,camera:n,width:l,height:h,selects:o,bouncing:d=!1,groundReflector:u}){super(),this.width=void 0!==l?l:512,this.height=void 0!==h?h:512,this.clear=!0,this.renderer=e,this.scene=a,this.camera=n,this.groundReflector=u,this.opacity=s.SSRShader.uniforms.opacity.value,this.output=0,this.maxDistance=s.SSRShader.uniforms.maxDistance.value,this.thickness=s.SSRShader.uniforms.thickness.value,this.tempColor=new t.Color,this._selects=o,this.selective=Array.isArray(this._selects),Object.defineProperty(this,"selects",{get(){return this._selects},set(e){this._selects!==e&&(this._selects=e,Array.isArray(e)?(this.selective=!0,this.ssrMaterial.defines.SELECTIVE=!0,this.ssrMaterial.needsUpdate=!0):(this.selective=!1,this.ssrMaterial.defines.SELECTIVE=!1,this.ssrMaterial.needsUpdate=!0))}}),this._bouncing=d,Object.defineProperty(this,"bouncing",{get(){return this._bouncing},set(e){this._bouncing!==e&&(this._bouncing=e,this.ssrMaterial.uniforms.tDiffuse.value=e?this.prevRenderTarget.texture:this.beautyRenderTarget.texture)}}),this.blur=!0,this._distanceAttenuation=s.SSRShader.defines.DISTANCE_ATTENUATION,Object.defineProperty(this,"distanceAttenuation",{get(){return this._distanceAttenuation},set(e){this._distanceAttenuation!==e&&(this._distanceAttenuation=e,this.ssrMaterial.defines.DISTANCE_ATTENUATION=e,this.ssrMaterial.needsUpdate=!0)}}),this._fresnel=s.SSRShader.defines.FRESNEL,Object.defineProperty(this,"fresnel",{get(){return this._fresnel},set(e){this._fresnel!==e&&(this._fresnel=e,this.ssrMaterial.defines.FRESNEL=e,this.ssrMaterial.needsUpdate=!0)}}),this._infiniteThick=s.SSRShader.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(e){this._infiniteThick!==e&&(this._infiniteThick=e,this.ssrMaterial.defines.INFINITE_THICK=e,this.ssrMaterial.needsUpdate=!0)}});const c=new t.DepthTexture;c.type=t.UnsignedShortType,c.minFilter=t.NearestFilter,c.magFilter=t.NearestFilter,this.beautyRenderTarget=new t.WebGLRenderTarget(this.width,this.height,{minFilter:t.NearestFilter,magFilter:t.NearestFilter,format:t.RGBAFormat,depthTexture:c,depthBuffer:!0}),this.prevRenderTarget=new t.WebGLRenderTarget(this.width,this.height,{minFilter:t.NearestFilter,magFilter:t.NearestFilter,format:t.RGBAFormat}),this.normalRenderTarget=new t.WebGLRenderTarget(this.width,this.height,{minFilter:t.NearestFilter,magFilter:t.NearestFilter,format:t.RGBAFormat,type:t.HalfFloatType}),this.metalnessRenderTarget=new t.WebGLRenderTarget(this.width,this.height,{minFilter:t.NearestFilter,magFilter:t.NearestFilter,format:t.RGBAFormat}),this.ssrRenderTarget=new t.WebGLRenderTarget(this.width,this.height,{minFilter:t.NearestFilter,magFilter:t.NearestFilter,format:t.RGBAFormat}),this.blurRenderTarget=this.ssrRenderTarget.clone(),this.blurRenderTarget2=this.ssrRenderTarget.clone(),void 0===s.SSRShader&&console.error("THREE.SSRPass: The pass relies on SSRShader."),this.ssrMaterial=new t.ShaderMaterial({defines:Object.assign({},s.SSRShader.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:t.UniformsUtils.clone(s.SSRShader.uniforms),vertexShader:s.SSRShader.vertexShader,fragmentShader:s.SSRShader.fragmentShader,blending:t.NoBlending}),this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssrMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssrMaterial.defines.SELECTIVE=this.selective,this.ssrMaterial.needsUpdate=!0,this.ssrMaterial.uniforms.tMetalness.value=this.metalnessRenderTarget.texture,this.ssrMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.ssrMaterial.uniforms.cameraNear.value=this.camera.near,this.ssrMaterial.uniforms.cameraFar.value=this.camera.far,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.ssrMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new t.MeshNormalMaterial,this.normalMaterial.blending=t.NoBlending,this.metalnessOnMaterial=new t.MeshBasicMaterial({color:"white"}),this.metalnessOffMaterial=new t.MeshBasicMaterial({color:"black"}),this.blurMaterial=new t.ShaderMaterial({defines:Object.assign({},s.SSRBlurShader.defines),uniforms:t.UniformsUtils.clone(s.SSRBlurShader.uniforms),vertexShader:s.SSRBlurShader.vertexShader,fragmentShader:s.SSRBlurShader.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.blurMaterial2=new t.ShaderMaterial({defines:Object.assign({},s.SSRBlurShader.defines),uniforms:t.UniformsUtils.clone(s.SSRBlurShader.uniforms),vertexShader:s.SSRBlurShader.vertexShader,fragmentShader:s.SSRBlurShader.fragmentShader}),this.blurMaterial2.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.blurMaterial2.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new t.ShaderMaterial({defines:Object.assign({},s.SSRDepthShader.defines),uniforms:t.UniformsUtils.clone(s.SSRDepthShader.uniforms),vertexShader:s.SSRDepthShader.vertexShader,fragmentShader:s.SSRDepthShader.fragmentShader,blending:t.NoBlending}),this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new t.ShaderMaterial({uniforms:t.UniformsUtils.clone(i.CopyShader.uniforms),vertexShader:i.CopyShader.vertexShader,fragmentShader:i.CopyShader.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:t.SrcAlphaFactor,blendDst:t.OneMinusSrcAlphaFactor,blendEquation:t.AddEquation,blendSrcAlpha:t.SrcAlphaFactor,blendDstAlpha:t.OneMinusSrcAlphaFactor,blendEquationAlpha:t.AddEquation}),this.fsQuad=new r.FullScreenQuad(null),this.originalClearColor=new t.Color}dispose(){this.beautyRenderTarget.dispose(),this.prevRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.metalnessRenderTarget.dispose(),this.ssrRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.blurRenderTarget2.dispose(),this.normalMaterial.dispose(),this.metalnessOnMaterial.dispose(),this.metalnessOffMaterial.dispose(),this.blurMaterial.dispose(),this.blurMaterial2.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(e,r){switch(e.setRenderTarget(this.beautyRenderTarget),e.clear(),this.groundReflector&&(this.groundReflector.visible=!1,this.groundReflector.doRender(this.renderer,this.scene,this.camera),this.groundReflector.visible=!0),e.render(this.scene,this.camera),this.groundReflector&&(this.groundReflector.visible=!1),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,0,0),this.selective&&this.renderMetalness(e,this.metalnessOnMaterial,this.metalnessRenderTarget,0,0),this.ssrMaterial.uniforms.opacity.value=this.opacity,this.ssrMaterial.uniforms.maxDistance.value=this.maxDistance,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.renderPass(e,this.ssrMaterial,this.ssrRenderTarget),this.blur&&(this.renderPass(e,this.blurMaterial,this.blurRenderTarget),this.renderPass(e,this.blurMaterial2,this.blurRenderTarget2)),this.output){case a.OUTPUT.Default:this.bouncing?(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=t.NoBlending,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=t.NormalBlending,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture,this.copyMaterial.blending=t.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:r)):(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=t.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:r),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=t.NormalBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:r));break;case a.OUTPUT.SSR:this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=t.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:r),this.bouncing&&(this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=t.NoBlending,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=t.NormalBlending,this.renderPass(e,this.copyMaterial,this.prevRenderTarget));break;case a.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=t.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:r);break;case a.OUTPUT.Depth:this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:r);break;case a.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=t.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:r);break;case a.OUTPUT.Metalness:this.copyMaterial.uniforms.tDiffuse.value=this.metalnessRenderTarget.texture,this.copyMaterial.blending=t.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:r);break;default:console.warn("THREE.SSRPass: Unknown output type.")}}renderPass(e,t,r,s,i){this.originalClearColor.copy(e.getClearColor(this.tempColor));const a=e.getClearAlpha(this.tempColor),n=e.autoClear;e.setRenderTarget(r),e.autoClear=!1,null!=s&&(e.setClearColor(s),e.setClearAlpha(i||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=n,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}renderOverride(e,t,r,s,i){this.originalClearColor.copy(e.getClearColor(this.tempColor));const a=e.getClearAlpha(this.tempColor),n=e.autoClear;e.setRenderTarget(r),e.autoClear=!1,s=t.clearColor||s,i=t.clearAlpha||i,null!=s&&(e.setClearColor(s),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=n,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}renderMetalness(e,t,r,s,i){this.originalClearColor.copy(e.getClearColor(this.tempColor));const a=e.getClearAlpha(this.tempColor),n=e.autoClear;e.setRenderTarget(r),e.autoClear=!1,s=t.clearColor||s,i=t.clearAlpha||i,null!=s&&(e.setClearColor(s),e.setClearAlpha(i||0),e.clear()),this.scene.traverseVisible((e=>{e._SSRPassBackupMaterial=e.material,this._selects.includes(e)?e.material=this.metalnessOnMaterial:e.material=this.metalnessOffMaterial})),e.render(this.scene,this.camera),this.scene.traverseVisible((e=>{e.material=e._SSRPassBackupMaterial})),e.autoClear=n,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}setSize(e,t){this.width=e,this.height=t,this.ssrMaterial.defines.MAX_STEP=Math.sqrt(e*e+t*t),this.ssrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(e,t),this.prevRenderTarget.setSize(e,t),this.ssrRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.metalnessRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.blurRenderTarget2.setSize(e,t),this.ssrMaterial.uniforms.resolution.value.set(e,t),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t),this.blurMaterial2.uniforms.resolution.value.set(e,t)}}a.OUTPUT={Default:0,SSR:1,Beauty:3,Depth:4,Normal:5,Metalness:7},e.SSRPass=a,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three"),require("./Pass.js"),require("../shaders/SSRShader.js"),require("../shaders/CopyShader.js")):"function"==typeof define&&define.amd?define(["exports","three","./Pass","../shaders/SSRShader","../shaders/CopyShader"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE,e.THREE,e.THREE,e.THREE)}();
