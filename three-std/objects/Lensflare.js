!function(){var t,e;t=this,e=function(t,e){"use strict";class n extends e.Mesh{constructor(){super(n.Geometry,new e.MeshBasicMaterial({opacity:0,transparent:!0})),this.type="Lensflare",this.frustumCulled=!1,this.renderOrder=1/0;const t=new e.Vector3,r=new e.Vector3,o=new e.FramebufferTexture(16,16,e.RGBAFormat),s=new e.FramebufferTexture(16,16,e.RGBAFormat),a=n.Geometry,l=new e.RawShaderMaterial({uniforms:{scale:{value:null},screenPosition:{value:null}},vertexShader:"\n\n\t\t\t\tprecision highp float;\n\n\t\t\t\tuniform vec3 screenPosition;\n\t\t\t\tuniform vec2 scale;\n\n\t\t\t\tattribute vec3 position;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tgl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );\n\n\t\t\t\t}",fragmentShader:"\n\n\t\t\t\tprecision highp float;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tgl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );\n\n\t\t\t\t}",depthTest:!0,depthWrite:!1,transparent:!1}),c=new e.RawShaderMaterial({uniforms:{map:{value:o},scale:{value:null},screenPosition:{value:null}},vertexShader:"\n\n\t\t\t\tprecision highp float;\n\n\t\t\t\tuniform vec3 screenPosition;\n\t\t\t\tuniform vec2 scale;\n\n\t\t\t\tattribute vec3 position;\n\t\t\t\tattribute vec2 uv;\n\n\t\t\t\tvarying vec2 vUV;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvUV = uv;\n\n\t\t\t\t\tgl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );\n\n\t\t\t\t}",fragmentShader:"\n\n\t\t\t\tprecision highp float;\n\n\t\t\t\tuniform sampler2D map;\n\n\t\t\t\tvarying vec2 vUV;\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tgl_FragColor = texture2D( map, vUV );\n\n\t\t\t\t}",depthTest:!1,depthWrite:!1,transparent:!1}),u=new e.Mesh(a,l),v=[],p=i.Shader,f=new e.RawShaderMaterial({uniforms:{map:{value:null},occlusionMap:{value:s},color:{value:new e.Color(16777215)},scale:{value:new e.Vector2},screenPosition:{value:new e.Vector3}},vertexShader:p.vertexShader,fragmentShader:p.fragmentShader,blending:e.AdditiveBlending,transparent:!0,depthWrite:!1}),d=new e.Mesh(a,f);this.addElement=function(t){v.push(t)};const m=new e.Vector2,y=new e.Vector2,h=new e.Box2,x=new e.Vector4;this.onBeforeRender=function(e,n,i){e.getCurrentViewport(x);const p=x.w/x.z,b=x.z/2,g=x.w/2;let w=16/x.w;if(m.set(w*p,w),h.min.set(x.x,x.y),h.max.set(x.x+(x.z-16),x.y+(x.w-16)),r.setFromMatrixPosition(this.matrixWorld),r.applyMatrix4(i.matrixWorldInverse),!(r.z>0)&&(t.copy(r).applyMatrix4(i.projectionMatrix),y.x=x.x+t.x*b+b-8,y.y=x.y+t.y*g+g-8,h.containsPoint(y))){e.copyFramebufferToTexture(y,o);let n=l.uniforms;n.scale.value=m,n.screenPosition.value=t,e.renderBufferDirect(i,null,a,l,u,null),e.copyFramebufferToTexture(y,s),n=c.uniforms,n.scale.value=m,n.screenPosition.value=t,e.renderBufferDirect(i,null,a,c,u,null);const r=2*-t.x,p=2*-t.y;for(let n=0,o=v.length;n<o;n++){const o=v[n],s=f.uniforms;s.color.value.copy(o.color),s.map.value=o.texture,s.screenPosition.value.x=t.x+r*o.distance,s.screenPosition.value.y=t.y+p*o.distance,w=o.size/x.w;const l=x.w/x.z;s.scale.value.set(w*l,w),f.uniformsNeedUpdate=!0,e.renderBufferDirect(i,null,a,f,d,null)}}},this.dispose=function(){l.dispose(),c.dispose(),f.dispose(),o.dispose(),s.dispose();for(let t=0,e=v.length;t<e;t++)v[t].texture.dispose()}}}n.prototype.isLensflare=!0;class i{constructor(t,n=1,i=0,r=new e.Color(16777215)){this.texture=t,this.size=n,this.distance=i,this.color=r}}i.Shader={uniforms:{map:{value:null},occlusionMap:{value:null},color:{value:null},scale:{value:null},screenPosition:{value:null}},vertexShader:"\n\n\t\tprecision highp float;\n\n\t\tuniform vec3 screenPosition;\n\t\tuniform vec2 scale;\n\n\t\tuniform sampler2D occlusionMap;\n\n\t\tattribute vec3 position;\n\t\tattribute vec2 uv;\n\n\t\tvarying vec2 vUV;\n\t\tvarying float vVisibility;\n\n\t\tvoid main() {\n\n\t\t\tvUV = uv;\n\n\t\t\tvec2 pos = position.xy;\n\n\t\t\tvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\n\t\t\tvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\n\n\t\t\tvVisibility =        visibility.r / 9.0;\n\t\t\tvVisibility *= 1.0 - visibility.g / 9.0;\n\t\t\tvVisibility *=       visibility.b / 9.0;\n\n\t\t\tgl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tprecision highp float;\n\n\t\tuniform sampler2D map;\n\t\tuniform vec3 color;\n\n\t\tvarying vec2 vUV;\n\t\tvarying float vVisibility;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texture = texture2D( map, vUV );\n\t\t\ttexture.a *= vVisibility;\n\t\t\tgl_FragColor = texture;\n\t\t\tgl_FragColor.rgb *= color;\n\n\t\t}"},n.Geometry=function(){const t=new e.BufferGeometry,n=new Float32Array([-1,-1,0,0,0,1,-1,0,1,0,1,1,0,1,1,-1,1,0,0,1]),i=new e.InterleavedBuffer(n,5);return t.setIndex([0,1,2,0,2,3]),t.setAttribute("position",new e.InterleavedBufferAttribute(i,3,0,!1)),t.setAttribute("uv",new e.InterleavedBufferAttribute(i,2,3,!1)),t}(),t.Lensflare=n,t.LensflareElement=i,Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t["THREE-STD"]||{},t.THREE)}();
