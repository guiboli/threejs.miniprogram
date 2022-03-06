!function(){var e,t;e=this,t=function(e,t,n,a,r){"use strict";class i extends t.Loader{constructor(e){super(e),this.loader=new t.FileLoader(this.manager),this.parser=null,this.meshBuilder=new l(this.manager),this.animationBuilder=new d}setAnimationPath(e){return this.animationPath=e,this}load(e,n,a,r){const i=this.meshBuilder.setCrossOrigin(this.crossOrigin);let s;s=""!==this.resourcePath?this.resourcePath:""!==this.path?this.path:t.LoaderUtils.extractUrlBase(e);const o=this._extractExtension(e).toLowerCase();"pmd"===o||"pmx"===o?this["pmd"===o?"loadPMD":"loadPMX"](e,(function(e){n(i.build(e,s,a,r))}),a,r):r&&r(new Error("THREE.MMDLoader: Unknown model file extension ."+o+"."))}loadAnimation(e,t,n,a,r){const i=this.animationBuilder;this.loadVMD(e,(function(e){n(t.isCamera?i.buildCameraAnimation(e):i.build(e,t))}),a,r)}loadWithAnimation(e,t,n,a,r){const i=this;this.load(e,(function(e){i.loadAnimation(t,e,(function(t){n({mesh:e,animation:t})}),a,r)}),a,r)}loadPMD(e,t,n,a){const r=this._getParser();this.loader.setMimeType(void 0).setPath(this.path).setResponseType("arraybuffer").setRequestHeader(this.requestHeader).setWithCredentials(this.withCredentials).load(e,(function(e){t(r.parsePmd(e,!0))}),n,a)}loadPMX(e,t,n,a){const r=this._getParser();this.loader.setMimeType(void 0).setPath(this.path).setResponseType("arraybuffer").setRequestHeader(this.requestHeader).setWithCredentials(this.withCredentials).load(e,(function(e){t(r.parsePmx(e,!0))}),n,a)}loadVMD(e,t,n,a){const r=Array.isArray(e)?e:[e],i=[],s=r.length,o=this._getParser();this.loader.setMimeType(void 0).setPath(this.animationPath).setResponseType("arraybuffer").setRequestHeader(this.requestHeader).setWithCredentials(this.withCredentials);for(let e=0,l=r.length;e<l;e++)this.loader.load(r[e],(function(e){i.push(o.parseVmd(e,!0)),i.length===s&&t(o.mergeVmds(i))}),n,a)}loadVPD(e,t,n,a,r){const i=this._getParser();this.loader.setMimeType(t?void 0:"text/plain; charset=shift_jis").setPath(this.animationPath).setResponseType("text").setRequestHeader(this.requestHeader).setWithCredentials(this.withCredentials).load(e,(function(e){n(i.parseVpd(e,!0))}),a,r)}_extractExtension(e){const t=e.lastIndexOf(".");return t<0?"":e.slice(t+1)}_getParser(){if(null===this.parser){if(void 0===r.MMDParser)throw new Error("THREE.MMDLoader: Import MMDParser https://github.com/takahirox/mmd-parser");this.parser=new r.MMDParser.Parser}return this.parser}}const s=["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAN0lEQVRYR+3WQREAMBACsZ5/bWiiMvgEBTt5cW37hjsBBAgQIECAwFwgyfYPCCBAgAABAgTWAh8aBHZBl14e8wAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOUlEQVRYR+3WMREAMAwDsYY/yoDI7MLwIiP40+RJklfcCCBAgAABAgTqArfb/QMCCBAgQIAAgbbAB3z/e0F3js2cAAAAAElFTkSuQmCC","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAN0lEQVRYR+3WQREAMBACsZ5/B5ilMvgEBTt5cW37hjsBBAgQIECAwFwgyfYPCCBAgAABAgTWAh81dWyx0gFwKAAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOklEQVRYR+3WoREAMAwDsWb/UQtCy9wxTOQJ/oQ8SXKKGwEECBAgQIBAXeDt7f4BAQQIECBAgEBb4AOz8Hzx7WLY4wAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABPUlEQVRYR+1XwW7CMAy1+f9fZOMysSEOEweEOPRNdm3HbdOyIhAcklPrOs/PLy9RygBALxzcCDQFmgJNgaZAU6Ap0BR4PwX8gsRMVLssMRH5HcpzJEaWL7EVg9F1IHRlyqQohgVr4FGUlUcMJSjcUlDw0zvjeun70cLWmneoyf7NgBTQSniBTQQSuJAZsOnnaczjIMb5hCiuHKxokCrJfVnrctyZL0PkJAJe1HMil4nxeyi3Ypfn1kX51jpPvo/JeCNC4PhVdHdJw2XjBR8brF8PEIhNVn12AgP7uHsTBguBn53MUZCqv7Lp07Pn5k1Ro+uWmUNn7D+M57rtk7aG0Vo73xyF/fbFf0bPJjDXngnGocDTdFhygZjwUQrMNrDcmZlQT50VJ/g/UwNyHpu778+yW+/ksOz/BFo54P4AsUXMfRq7XWsAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACMElEQVRYR+2Xv4pTQRTGf2dubhLdICiii2KnYKHVolhauKWPoGAnNr6BD6CvIVaihYuI2i1ia0BY0MZGRHQXjZj/mSPnnskfNWiWZUlzJ5k7M2cm833nO5Mziej2DWWJRUoCpQKlAntSQCqgw39/iUWAGmh37jrRnVsKlgpiqmkoGVABA7E57fvY+pJDdgKqF6HzFCSADkDq+F6AHABtQ+UMVE5D7zXod7fFNhTEckTbj5XQgHzNN+5tQvc5NG7C6BNkp6D3EmpXHDR+dQAjFLchW3VS9rlw3JBh+B7ys5Cf9z0GW1C/7P32AyBAOAz1q4jGliIH3YPuBnSfQX4OGreTIgEYQb/pBDtPnEQ4CivXYPAWBk13oHrB54yA9QuSn2H4AcKRpEILDt0BUzj+RLR1V5EqjD66NPRBVpLcQwjHoHYJOhsQv6U4mnzmrIXJCFr4LDwm/xBUoboG9XX4cc9VKdYoSA2yk5NQLJaKDUjTBoveG3Z2TElTxwjNK4M3LEZgUdDdruvcXzKBpStgp2NPiWi3ks9ZXxIoFVi+AvHLdc9TqtjL3/aYjpPlrzOcEnK62Szhimdd7xX232zFDTgtxezOu3WNMRLjiKgjtOhHVMd1loynVHvOgjuIIJMaELEqhJAV/RCSLbWTcfPFakFgFlALTRRvx+ok6Hlp/Q+v3fmx90bMyUzaEAhmM3KvHlXTL5DxnbGf/1M8RNNACLL5MNtPxP/mypJAqcDSFfgFhpYqWUzhTEAAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAL0lEQVRYR+3QQREAAAzCsOFfNJPBJ1XQS9r2hsUAAQIECBAgQIAAAQIECBAgsBZ4MUx/ofm2I/kAAAAASUVORK5CYII="],o=[t.RGB_S3TC_DXT1_Format,t.RGB_PVRTC_4BPPV1_Format,t.RGB_PVRTC_2BPPV1_Format,t.RGB_ETC1_Format,t.RGB_ETC2_Format];class l{constructor(e){this.crossOrigin="anonymous",this.geometryBuilder=new A,this.materialBuilder=new h(e)}setCrossOrigin(e){return this.crossOrigin=e,this}build(e,n,a,r){const i=this.geometryBuilder.build(e),s=this.materialBuilder.setCrossOrigin(this.crossOrigin).setResourcePath(n).build(e,i,a,r),o=new t.SkinnedMesh(i,s),l=new t.Skeleton(function(e){const n=e.geometry,a=[];if(n&&void 0!==n.bones){for(let e=0,r=n.bones.length;e<r;e++){const r=n.bones[e],i=new t.Bone;a.push(i),i.name=r.name,i.position.fromArray(r.pos),i.quaternion.fromArray(r.rotq),void 0!==r.scl&&i.scale.fromArray(r.scl)}for(let t=0,r=n.bones.length;t<r;t++){const r=n.bones[t];-1!==r.parent&&null!==r.parent&&void 0!==a[r.parent]?a[r.parent].add(a[t]):e.add(a[t])}}return e.updateMatrixWorld(!0),a}(o));return o.bind(l),o}}class A{build(e){const n=[],a=[],r=[],i=[],s=[],o=[],l=[],A=[],h=[],d=[],u=[],c=[],p=[],m=[];let f=0;const g={};for(let t=0;t<e.metadata.vertexCount;t++){const i=e.vertices[t];for(let e=0,t=i.position.length;e<t;e++)n.push(i.position[e]);for(let e=0,t=i.normal.length;e<t;e++)r.push(i.normal[e]);for(let e=0,t=i.uv.length;e<t;e++)a.push(i.uv[e]);for(let e=0;e<4;e++)l.push(i.skinIndices.length-1>=e?i.skinIndices[e]:0);for(let e=0;e<4;e++)A.push(i.skinWeights.length-1>=e?i.skinWeights[e]:0)}for(let t=0;t<e.metadata.faceCount;t++){const n=e.faces[t];for(let e=0,t=n.indices.length;e<t;e++)i.push(n.indices[e])}for(let t=0;t<e.metadata.materialCount;t++){const n=e.materials[t];s.push({offset:3*f,count:3*n.faceCount}),f+=n.faceCount}for(let t=0;t<e.metadata.rigidBodyCount;t++){const n=e.rigidBodies[t];let a=g[n.boneIndex];a=void 0===a?n.type:Math.max(n.type,a),g[n.boneIndex]=a}for(let t=0;t<e.metadata.boneCount;t++){const n=e.bones[t],a={index:t,transformationClass:n.transformationClass,parent:n.parentIndex,name:n.name,pos:n.position.slice(0,3),rotq:[0,0,0,1],scl:[1,1,1],rigidBodyType:void 0!==g[t]?g[t]:-1};-1!==a.parent&&(a.pos[0]-=e.bones[a.parent].position[0],a.pos[1]-=e.bones[a.parent].position[1],a.pos[2]-=e.bones[a.parent].position[2]),o.push(a)}if("pmd"===e.metadata.format)for(let n=0;n<e.metadata.ikCount;n++){const a=e.iks[n],r={target:a.target,effector:a.effector,iteration:a.iteration,maxAngle:4*a.maxAngle,links:[]};for(let n=0,i=a.links.length;n<i;n++){const i={};i.index=a.links[n].index,i.enabled=!0,e.bones[i.index].name.indexOf("ひざ")>=0&&(i.limitation=new t.Vector3(1,0,0)),r.links.push(i)}u.push(r)}else for(let n=0;n<e.metadata.boneCount;n++){const a=e.bones[n].ik;if(void 0===a)continue;const r={target:n,effector:a.effector,iteration:a.iteration,maxAngle:a.maxAngle,links:[]};for(let e=0,n=a.links.length;e<n;e++){const n={};if(n.index=a.links[e].index,n.enabled=!0,1===a.links[e].angleLimitation){const r=a.links[e].lowerLimitationAngle,i=a.links[e].upperLimitationAngle,s=-i[0],o=-i[1];i[0]=-r[0],i[1]=-r[1],r[0]=s,r[1]=o,n.rotationMin=(new t.Vector3).fromArray(r),n.rotationMax=(new t.Vector3).fromArray(i)}r.links.push(n)}u.push(r),o[n].ik=r}if("pmx"===e.metadata.format){const t={};for(let n=0;n<e.metadata.boneCount;n++){const a=e.bones[n],r=a.grant;if(void 0===r)continue;const i={index:n,parentIndex:r.parentIndex,ratio:r.ratio,isLocal:r.isLocal,affectRotation:r.affectRotation,affectPosition:r.affectPosition,transformationClass:a.transformationClass};t[n]={parent:null,children:[],param:i,visited:!1}}const n={parent:null,children:[],param:null,visited:!1};for(const e in t){const a=t[e],r=t[a.parentIndex]||n;a.parent=r,r.children.push(a)}function a(e){e.param&&(c.push(e.param),o[e.param.index].grant=e.param),e.visited=!0;for(let t=0,n=e.children.length;t<n;t++){const n=e.children[t];n.visited||a(n)}}a(n)}function C(t,n,a){for(let r=0;r<n.elementCount;r++){const i=n.elements[r];let s;s="pmd"===e.metadata.format?e.morphs[0].elements[i.index].index:i.index,t.array[3*s+0]+=i.position[0]*a,t.array[3*s+1]+=i.position[1]*a,t.array[3*s+2]+=i.position[2]*a}}for(let a=0;a<e.metadata.morphCount;a++){const r=e.morphs[a],i={name:r.name},s=new t.Float32BufferAttribute(3*e.metadata.vertexCount,3);s.name=r.name;for(let t=0;t<3*e.metadata.vertexCount;t++)s.array[t]=n[t];if("pmd"===e.metadata.format)0!==a&&C(s,r,1);else if(0===r.type)for(let t=0;t<r.elementCount;t++){const n=e.morphs[r.elements[t].index],a=r.elements[t].ratio;1===n.type&&C(s,n,a)}else 1===r.type?C(s,r,1):2===r.type||3===r.type||4===r.type||5===r.type||6===r.type||7===r.type||r.type;h.push(i),d.push(s)}for(let t=0;t<e.metadata.rigidBodyCount;t++){const n=e.rigidBodies[t],a={};for(const e in n)a[e]=n[e];if("pmx"===e.metadata.format&&-1!==a.boneIndex){const t=e.bones[a.boneIndex];a.position[0]-=t.position[0],a.position[1]-=t.position[1],a.position[2]-=t.position[2]}p.push(a)}for(let t=0;t<e.metadata.constraintCount;t++){const n=e.constraints[t],a={};for(const e in n)a[e]=n[e];const r=p[a.rigidBodyIndex1],i=p[a.rigidBodyIndex2];0!==r.type&&2===i.type&&-1!==r.boneIndex&&-1!==i.boneIndex&&e.bones[i.boneIndex].parentIndex===r.boneIndex&&(i.type=1),m.push(a)}const b=new t.BufferGeometry;b.setAttribute("position",new t.Float32BufferAttribute(n,3)),b.setAttribute("normal",new t.Float32BufferAttribute(r,3)),b.setAttribute("uv",new t.Float32BufferAttribute(a,2)),b.setAttribute("skinIndex",new t.Uint16BufferAttribute(l,4)),b.setAttribute("skinWeight",new t.Float32BufferAttribute(A,4)),b.setIndex(i);for(let e=0,t=s.length;e<t;e++)b.addGroup(s[e].offset,s[e].count,e);return b.bones=o,b.morphTargets=h,b.morphAttributes.position=d,b.morphTargetsRelative=!1,b.userData.MMD={bones:o,iks:u,grants:c,rigidBodies:p,constraints:m,format:e.metadata.format},b.computeBoundingSphere(),b}}class h{constructor(e){this.manager=e,this.textureLoader=new t.TextureLoader(this.manager),this.tgaLoader=null,this.crossOrigin="anonymous",this.resourcePath=void 0}setCrossOrigin(e){return this.crossOrigin=e,this}setResourcePath(e){return this.resourcePath=e,this}build(e,n){const a=[],r={};this.textureLoader.setCrossOrigin(this.crossOrigin);for(let i=0;i<e.metadata.materialCount;i++){const s=e.materials[i],o={userData:{MMD:{}}};if(void 0!==s.name&&(o.name=s.name),o.diffuse=(new t.Color).fromArray(s.diffuse),o.opacity=s.diffuse[3],o.specular=(new t.Color).fromArray(s.specular),o.shininess=s.shininess,o.emissive=(new t.Color).fromArray(s.ambient),o.transparent=1!==o.opacity,o.fog=!0,o.blending=t.CustomBlending,o.blendSrc=t.SrcAlphaFactor,o.blendDst=t.OneMinusSrcAlphaFactor,o.blendSrcAlpha=t.SrcAlphaFactor,o.blendDstAlpha=t.DstAlphaFactor,"pmx"===e.metadata.format&&1==(1&s.flag)?o.side=t.DoubleSide:o.side=1===o.opacity?t.FrontSide:t.DoubleSide,"pmd"===e.metadata.format){if(s.fileName){const e=s.fileName.split("*");if(o.map=this._loadTexture(e[0],r),e.length>1){const n=e[1].slice(-4).toLowerCase();o.envMap=this._loadTexture(e[1],r),o.combine=".sph"===n?t.MultiplyOperation:t.AddOperation}}const n=-1===s.toonIndex?"toon00.bmp":e.toonTextures[s.toonIndex].fileName;o.gradientMap=this._loadTexture(n,r,{isToonTexture:!0,isDefaultToonTexture:this._isDefaultToonTexture(n)}),o.userData.outlineParameters={thickness:1===s.edgeFlag?.003:0,color:[0,0,0],alpha:1,visible:1===s.edgeFlag}}else{let n,a;-1!==s.textureIndex&&(o.map=this._loadTexture(e.textures[s.textureIndex],r),o.userData.MMD.mapFileName=e.textures[s.textureIndex]),-1===s.envTextureIndex||1!==s.envFlag&&2!=s.envFlag||(o.matcap=this._loadTexture(e.textures[s.envTextureIndex],r),o.userData.MMD.matcapFileName=e.textures[s.envTextureIndex],o.matcapCombine=1===s.envFlag?t.MultiplyOperation:t.AddOperation),-1===s.toonIndex||0!==s.toonFlag?(n="toon"+("0"+(s.toonIndex+1)).slice(-2)+".bmp",a=!0):(n=e.textures[s.toonIndex],a=!1),o.gradientMap=this._loadTexture(n,r,{isToonTexture:!0,isDefaultToonTexture:a}),o.userData.outlineParameters={thickness:s.edgeSize/300,color:s.edgeColor.slice(0,3),alpha:s.edgeColor[3],visible:0!=(16&s.flag)&&s.edgeSize>0}}void 0!==o.map&&(o.transparent||this._checkImageTransparency(o.map,n,i),o.emissive.multiplyScalar(.2)),a.push(new c(o))}if("pmx"===e.metadata.format){function t(e,t){for(let n=0,a=e.length;n<a;n++){const a=e[n];if(-1===a.index)continue;const r=t[a.index];r.opacity!==a.diffuse[3]&&(r.transparent=!0)}}for(let n=0,r=e.morphs.length;n<r;n++){const r=e.morphs[n],i=r.elements;if(0===r.type)for(let n=0,r=i.length;n<r;n++){const r=e.morphs[i[n].index];8===r.type&&t(r.elements,a)}else 8===r.type&&t(i,a)}}return a}_getTGALoader(){if(null===this.tgaLoader){if(void 0===a.TGALoader)throw new Error("THREE.MMDLoader: Import TGALoader");this.tgaLoader=new a.TGALoader(this.manager)}return this.tgaLoader}_isDefaultToonTexture(e){return 10===e.length&&/toon(10|0[0-9])\.bmp/.test(e)}_loadTexture(e,n,a,r,i){const o=this;let l;if(!0===(a=a||{}).isDefaultToonTexture){let t;try{t=parseInt(e.match(/toon([0-9]{2})\.bmp$/)[1])}catch(n){console.warn("THREE.MMDLoader: "+e+" seems like a not right default texture path. Using toon00.bmp instead."),t=0}l=s[t]}else l=this.resourcePath+e;if(void 0!==n[l])return n[l];let A=this.manager.getHandler(l);null===A&&(A=".tga"===e.slice(-4).toLowerCase()?this._getTGALoader():this.textureLoader);const h=A.load(l,(function(e){!0===a.isToonTexture&&(e.image=o._getRotatedImage(e.image),e.magFilter=t.NearestFilter,e.minFilter=t.NearestFilter),e.flipY=!1,e.wrapS=t.RepeatWrapping,e.wrapT=t.RepeatWrapping;for(let e=0;e<h.readyCallbacks.length;e++)h.readyCallbacks[e](h);delete h.readyCallbacks}),r,i);return h.readyCallbacks=[],n[l]=h,h}_getRotatedImage(e){const t=document.createElement("canvas"),n=t.getContext("2d"),a=e.width,r=e.height;return t.width=a,t.height=r,n.clearRect(0,0,a,r),n.translate(a/2,r/2),n.rotate(.5*Math.PI),n.translate(-a/2,-r/2),n.drawImage(e,0,0),n.getImageData(0,0,a,r)}_checkImageTransparency(e,t,n){e.readyCallbacks.push((function(a){function r(e,t){const n=e.width,a=e.height;let r=Math.round(t.x*n)%n,i=Math.round(t.y*a)%a;r<0&&(r+=n),i<0&&(i+=a);const s=i*n+r;return e.data[4*s+3]}if(!0===a.isCompressedTexture)return void(o.includes(a.format)?e.transparent=!1:e.transparent=!0);const i=void 0!==a.image.data?a.image:function(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n.drawImage(e,0,0),n.getImageData(0,0,t.width,t.height)}(a.image),s=t.groups[n];(function(e,t,n){const a=e.width,i=e.height;if(e.data.length/(a*i)!=4)return!1;for(let a=0;a<n.length;a+=3){const i={x:0,y:0};for(let s=0;s<3;s++){const o=n[3*a+s],l={x:t[2*o+0],y:t[2*o+1]};if(r(e,l)<253)return!0;i.x+=l.x,i.y+=l.y}if(i.x/=3,i.y/=3,r(e,i)<253)return!0}return!1})(i,t.attributes.uv.array,t.index.array.slice(s.start,s.start+s.count))&&(e.transparent=!0)}))}}class d{build(e,n){const a=this.buildSkeletalAnimation(e,n).tracks,r=this.buildMorphAnimation(e,n).tracks;for(let e=0,t=r.length;e<t;e++)a.push(r[e]);return new t.AnimationClip("",-1,a)}buildSkeletalAnimation(e,n){function a(e,t,n){e.push(t[n+0]/127),e.push(t[n+8]/127),e.push(t[n+4]/127),e.push(t[n+12]/127)}const r=[],i={},s=n.skeleton.bones,o={};for(let e=0,t=s.length;e<t;e++)o[s[e].name]=!0;for(let t=0;t<e.metadata.motionCount;t++){const n=e.motions[t],a=n.boneName;void 0!==o[a]&&(i[a]=i[a]||[],i[a].push(n))}for(const e in i){const s=i[e];s.sort((function(e,t){return e.frameNum-t.frameNum}));const o=[],l=[],A=[],h=[],d=[],u=n.skeleton.getBoneByName(e).position.toArray();for(let e=0,t=s.length;e<t;e++){const t=s[e].frameNum/30,n=s[e].position,r=s[e].rotation,i=s[e].interpolation;o.push(t);for(let e=0;e<3;e++)l.push(u[e]+n[e]);for(let e=0;e<4;e++)A.push(r[e]);for(let e=0;e<3;e++)a(h,i,e);a(d,i,3)}const c=".bones["+e+"]";r.push(this._createTrack(c+".position",t.VectorKeyframeTrack,o,l,h)),r.push(this._createTrack(c+".quaternion",t.QuaternionKeyframeTrack,o,A,d))}return new t.AnimationClip("",-1,r)}buildMorphAnimation(e,n){const a=[],r={},i=n.morphTargetDictionary;for(let t=0;t<e.metadata.morphCount;t++){const n=e.morphs[t],a=n.morphName;void 0!==i[a]&&(r[a]=r[a]||[],r[a].push(n))}for(const e in r){const n=r[e];n.sort((function(e,t){return e.frameNum-t.frameNum}));const s=[],o=[];for(let e=0,t=n.length;e<t;e++)s.push(n[e].frameNum/30),o.push(n[e].weight);a.push(new t.NumberKeyframeTrack(".morphTargetInfluences["+i[e]+"]",s,o))}return new t.AnimationClip("",-1,a)}buildCameraAnimation(e){function n(e,t){e.push(t.x),e.push(t.y),e.push(t.z)}function a(e,t,n){e.push(t[4*n+0]/127),e.push(t[4*n+1]/127),e.push(t[4*n+2]/127),e.push(t[4*n+3]/127)}const r=void 0===e.cameras?[]:e.cameras.slice();r.sort((function(e,t){return e.frameNum-t.frameNum}));const i=[],s=[],o=[],l=[],A=[],h=[],d=[],u=[],c=[],p=new t.Quaternion,m=new t.Euler,f=new t.Vector3,g=new t.Vector3;for(let e=0,t=r.length;e<t;e++){const t=r[e],x=t.frameNum/30,y=t.position,B=t.rotation,M=t.distance,T=t.fov,I=t.interpolation;i.push(x),f.set(0,0,-M),g.set(y[0],y[1],y[2]),m.set(-B[0],-B[1],-B[2]),p.setFromEuler(m),f.add(g),f.applyQuaternion(p),n(s,g),(C=o).push((b=p).x),C.push(b.y),C.push(b.z),C.push(b.w),n(l,f),A.push(T);for(let e=0;e<3;e++)a(h,I,e);a(d,I,3);for(let e=0;e<3;e++)a(u,I,4);a(c,I,5)}var C,b;const x=[];return x.push(this._createTrack("target.position",t.VectorKeyframeTrack,i,s,h)),x.push(this._createTrack(".quaternion",t.QuaternionKeyframeTrack,i,o,d)),x.push(this._createTrack(".position",t.VectorKeyframeTrack,i,l,u)),x.push(this._createTrack(".fov",t.NumberKeyframeTrack,i,A,c)),new t.AnimationClip("",-1,x)}_createTrack(e,t,n,a,r){if(n.length>2){n=n.slice(),a=a.slice(),r=r.slice();const e=a.length/n.length,t=r.length/n.length;let i=1;for(let s=2,o=n.length;s<o;s++){for(let t=0;t<e;t++)if(a[i*e+t]!==a[(i-1)*e+t]||a[i*e+t]!==a[s*e+t]){i++;break}if(s>i){n[i]=n[s];for(let t=0;t<e;t++)a[i*e+t]=a[s*e+t];for(let e=0;e<t;e++)r[i*t+e]=r[s*t+e]}}n.length=i+1,a.length=(i+1)*e,r.length=(i+1)*t}const i=new t(e,n,a);return i.createInterpolant=function(e){return new u(this.times,this.values,this.getValueSize(),e,new Float32Array(r))},i}}class u extends t.Interpolant{constructor(e,t,n,a,r){super(e,t,n,a),this.interpolationParams=r}interpolate_(e,n,a,r){const i=this.resultBuffer,s=this.sampleValues,o=this.valueSize,l=this.interpolationParams,A=e*o,h=A-o,d=r-n<.05?0:(a-n)/(r-n);if(4===o){const n=l[4*e+0],a=l[4*e+1],r=l[4*e+2],o=l[4*e+3],u=this._calculate(n,a,r,o,d);t.Quaternion.slerpFlat(i,0,s,h,s,A,u)}else if(3===o)for(let t=0;t!==o;++t){const n=l[12*e+4*t+0],a=l[12*e+4*t+1],r=l[12*e+4*t+2],o=l[12*e+4*t+3],u=this._calculate(n,a,r,o,d);i[t]=s[h+t]*(1-u)+s[A+t]*u}else{const t=l[4*e+0],n=l[4*e+1],a=l[4*e+2],r=l[4*e+3],o=this._calculate(t,n,a,r,d);i[0]=s[h]*(1-o)+s[A]*o}return i}_calculate(e,t,n,a,r){let i=.5,s=i,o=1-s;const l=Math;let A,h,d;for(let n=0;n<15;n++){A=3*o*o*s,h=3*o*s*s,d=s*s*s;const n=A*e+h*t+d-r;if(l.abs(n)<1e-5)break;i/=2,s+=n<0?i:-i,o=1-s}return A*n+h*a+d}}class c extends t.ShaderMaterial{constructor(e){super(),this._matcapCombine=t.AddOperation,this.emissiveIntensity=1,this.normalMapType=t.TangentSpaceNormalMap,this.combine=t.MultiplyOperation,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.lights=!0,this.vertexShader=n.MMDToonShader.vertexShader,this.fragmentShader=n.MMDToonShader.fragmentShader,this.defines=Object.assign({},n.MMDToonShader.defines),Object.defineProperty(this,"matcapCombine",{get:function(){return this._matcapCombine},set:function(e){switch(this._matcapCombine=e,e){case t.MultiplyOperation:this.defines.MATCAP_BLENDING_MULTIPLY=!0,delete this.defines.MATCAP_BLENDING_ADD;break;default:case t.AddOperation:this.defines.MATCAP_BLENDING_ADD=!0,delete this.defines.MATCAP_BLENDING_MULTIPLY}}}),this.uniforms=t.UniformsUtils.clone(n.MMDToonShader.uniforms);const a=["specular","shininess","opacity","diffuse","map","matcap","gradientMap","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveMap","bumpMap","bumpScale","normalMap","normalScale","displacemantBias","displacemantMap","displacemantScale","specularMap","alphaMap","envMap","reflectivity","refractionRatio"];for(const e of a)Object.defineProperty(this,e,{get:function(){return this.uniforms[e].value},set:function(t){this.uniforms[e].value=t}});Object.defineProperty(this,"color",Object.getOwnPropertyDescriptor(this,"diffuse")),this.setValues(e)}copy(e){return super.copy(e),this.matcapCombine=e.matcapCombine,this.emissiveIntensity=e.emissiveIntensity,this.normalMapType=e.normalMapType,this.combine=e.combine,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this}}c.prototype.isMMDToonMaterial=!0,e.MMDLoader=i,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three"),require("../shaders/MMDToonShader.js"),require("./TGALoader.js"),require("../libs/mmdparser.module.js")):"function"==typeof define&&define.amd?define(["exports","three","../shaders/MMDToonShader","./TGALoader","../libs/mmdparser.module"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE,e.THREE,e.THREE,e.THREE)}();