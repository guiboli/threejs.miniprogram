!function(){var e,t;e=this,t=function(e,t,r,s){"use strict";function i(){this.debugger=new h}function a(e){this.dv=new DataView(e),this.offset=0}function h(){this.active=!1,this.depth=0,this.formList=[]}function n(e){return e%2}function o(e){return e.length+1+(n(e.length+1)?1:0)}i.prototype={constructor:i,parse:function(e){if(this.reader=new a(e),this.tree={materials:{},layers:[],tags:[],textures:[]},this.currentLayer=this.tree,this.currentForm=this.tree,this.parseTopForm(),void 0!==this.tree.format){if("LWO2"===this.tree.format)for(this.parser=new r.LWO2Parser(this);!this.reader.endOfFile();)this.parser.parseBlock();else if("LWO3"===this.tree.format)for(this.parser=new s.LWO3Parser(this);!this.reader.endOfFile();)this.parser.parseBlock();return this.debugger.offset=this.reader.offset,this.debugger.closeForms(),this.tree}},parseTopForm(){if(this.debugger.offset=this.reader.offset,"FORM"===this.reader.getIDTag()){var e=this.reader.getUint32();this.debugger.dataOffset=this.reader.offset,this.debugger.length=e;var t=this.reader.getIDTag();("LWO2"===t||"LWO3"===t)&&(this.tree.format=t),this.debugger.node=0,this.debugger.nodeID=t,this.debugger.log()}else console.warn("LWOLoader: Top-level FORM missing.")},parseForm(e){var t=this.reader.getIDTag();switch(t){case"ISEQ":case"ANIM":case"STCC":case"VPVL":case"VPRM":case"NROT":case"WRPW":case"WRPH":case"FUNC":case"FALL":case"OPAC":case"GRAD":case"ENVS":case"VMOP":case"VMBG":case"OMAX":case"STEX":case"CKBG":case"CKEY":case"VMLA":case"VMLB":this.debugger.skipped=!0,this.skipForm(e);break;case"META":case"NNDS":case"NODS":case"NDTA":case"ADAT":case"AOVS":case"BLOK":case"IBGC":case"IOPC":case"IIMG":case"TXTR":this.debugger.length=4,this.debugger.skipped=!0;break;case"IFAL":case"ISCL":case"IPOS":case"IROT":case"IBMP":case"IUTD":case"IVTD":this.parseTextureNodeAttribute(t);break;case"ENVL":this.parseEnvelope(e);break;case"CLIP":"LWO2"===this.tree.format?this.parseForm(e):this.parseClip(e);break;case"STIL":this.parseImage();break;case"XREF":this.reader.skip(8),this.currentForm.referenceTexture={index:this.reader.getUint32(),refName:this.reader.getString()};break;case"IMST":this.parseImageStateForm(e);break;case"SURF":this.parseSurfaceForm(e);break;case"VALU":this.parseValueForm(e);break;case"NTAG":this.parseSubNode(e);break;case"ATTR":case"SATR":this.setupForm("attributes",e);break;case"NCON":this.parseConnections(e);break;case"SSHA":this.parentForm=this.currentForm,this.currentForm=this.currentSurface,this.setupForm("surfaceShader",e);break;case"SSHD":this.setupForm("surfaceShaderData",e);break;case"ENTR":this.parseEntryForm(e);break;case"IMAP":this.parseImageMap(e);break;case"TAMP":this.parseXVAL("amplitude",e);break;case"TMAP":this.setupForm("textureMap",e);break;case"CNTR":this.parseXVAL3("center",e);break;case"SIZE":this.parseXVAL3("scale",e);break;case"ROTA":this.parseXVAL3("rotation",e);break;default:this.parseUnknownForm(t,e)}this.debugger.node=0,this.debugger.nodeID=t,this.debugger.log()},setupForm(e,t){this.currentForm||(this.currentForm=this.currentNode),this.currentFormEnd=this.reader.offset+t,this.parentForm=this.currentForm,this.currentForm[e]?(console.warn("LWOLoader: form already exists on parent: ",e,this.currentForm),this.currentForm=this.currentForm[e]):(this.currentForm[e]={},this.currentForm=this.currentForm[e])},skipForm(e){this.reader.skip(e-4)},parseUnknownForm(e,r){var s,i,a;console.warn("LWOLoader: unknown FORM encountered: "+e,r),s=this.reader.dv.buffer,i=this.reader.offset,a=r-4,console.log(t.LoaderUtils.decodeText(new Uint8Array(s,i,a))),this.reader.skip(r-4)},parseSurfaceForm(e){this.reader.skip(8);var t=this.reader.getString(),r={attributes:{},connections:{},name:t,inputName:t,nodes:{},source:this.reader.getString()};this.tree.materials[t]=r,this.currentSurface=r,this.parentForm=this.tree.materials,this.currentForm=r,this.currentFormEnd=this.reader.offset+e},parseSurfaceLwo2(e){var t=this.reader.getString(),r={attributes:{},connections:{},name:t,nodes:{},source:this.reader.getString()};this.tree.materials[t]=r,this.currentSurface=r,this.parentForm=this.tree.materials,this.currentForm=r,this.currentFormEnd=this.reader.offset+e},parseSubNode(e){this.reader.skip(8);var t={name:this.reader.getString()};this.currentForm=t,this.currentNode=t,this.currentFormEnd=this.reader.offset+e},parseConnections(e){this.currentFormEnd=this.reader.offset+e,this.parentForm=this.currentForm,this.currentForm=this.currentSurface.connections},parseEntryForm(e){this.reader.skip(8);var t=this.reader.getString();this.currentForm=this.currentNode.attributes,this.setupForm(t,e)},parseValueForm(){this.reader.skip(8);var e=this.reader.getString();"double"===e?this.currentForm.value=this.reader.getUint64():"int"===e?this.currentForm.value=this.reader.getUint32():"vparam"===e?(this.reader.skip(24),this.currentForm.value=this.reader.getFloat64()):"vparam3"===e&&(this.reader.skip(24),this.currentForm.value=this.reader.getFloat64Array(3))},parseImageStateForm(){this.reader.skip(8),this.currentForm.mipMapLevel=this.reader.getFloat32()},parseImageMap(e){this.currentFormEnd=this.reader.offset+e,this.parentForm=this.currentForm,this.currentForm.maps||(this.currentForm.maps=[]);var t={};this.currentForm.maps.push(t),this.currentForm=t,this.reader.skip(10)},parseTextureNodeAttribute(e){switch(this.reader.skip(28),this.reader.skip(20),e){case"ISCL":this.currentNode.scale=this.reader.getFloat32Array(3);break;case"IPOS":this.currentNode.position=this.reader.getFloat32Array(3);break;case"IROT":this.currentNode.rotation=this.reader.getFloat32Array(3);break;case"IFAL":this.currentNode.falloff=this.reader.getFloat32Array(3);break;case"IBMP":this.currentNode.amplitude=this.reader.getFloat32();break;case"IUTD":this.currentNode.uTiles=this.reader.getFloat32();break;case"IVTD":this.currentNode.vTiles=this.reader.getFloat32()}this.reader.skip(2)},parseEnvelope(e){this.reader.skip(e-4)},parseClip(e){if("FORM"===this.reader.getIDTag())return this.reader.skip(16),void(this.currentNode.fileName=this.reader.getString());this.reader.setOffset(this.reader.offset-4),this.currentFormEnd=this.reader.offset+e,this.parentForm=this.currentForm,this.reader.skip(8);var t={index:this.reader.getUint32()};this.tree.textures.push(t),this.currentForm=t},parseClipLwo2(e){for(var t={index:this.reader.getUint32(),fileName:""};;){var r=this.reader.getIDTag(),s=this.reader.getUint16();if("STIL"===r){t.fileName=this.reader.getString();break}if(s>=e)break}this.tree.textures.push(t),this.currentForm=t},parseImage(){this.reader.skip(8),this.currentForm.fileName=this.reader.getString()},parseXVAL(e,t){var r=this.reader.offset+t-4;this.reader.skip(8),this.currentForm[e]=this.reader.getFloat32(),this.reader.setOffset(r)},parseXVAL3(e,t){var r=this.reader.offset+t-4;this.reader.skip(8),this.currentForm[e]={x:this.reader.getFloat32(),y:this.reader.getFloat32(),z:this.reader.getFloat32()},this.reader.setOffset(r)},parseObjectTag(){this.tree.objectTags||(this.tree.objectTags={}),this.tree.objectTags[this.reader.getIDTag()]={tagString:this.reader.getString()}},parseLayer(e){var t={number:this.reader.getUint16(),flags:this.reader.getUint16(),pivot:this.reader.getFloat32Array(3),name:this.reader.getString()};this.tree.layers.push(t),this.currentLayer=t;var r=16+o(this.currentLayer.name);this.currentLayer.parent=r<e?this.reader.getUint16():-1},parsePoints(e){this.currentPoints=[];for(var t=0;t<e/4;t+=3)this.currentPoints.push(this.reader.getFloat32(),this.reader.getFloat32(),-this.reader.getFloat32())},parseVertexMapping(e,t){var r=this.reader.offset+e,s=this.reader.getString();if(this.reader.offset!==r){this.reader.setOffset(this.reader.offset-o(s));var i=this.reader.getIDTag();this.reader.getUint16();var a=this.reader.getString(),h=e-6-o(a);switch(i){case"TXUV":this.parseUVMapping(a,r,t);break;case"MORF":case"SPOT":this.parseMorphTargets(a,r,i);break;case"APSL":case"NORM":case"WGHT":case"MNVW":case"PICK":case"RGB ":case"RGBA":this.reader.skip(h);break;default:console.warn("LWOLoader: unknown vertex map type: "+i),this.reader.skip(h)}}else this.currentForm.UVChannel=s},parseUVMapping(e,t,r){for(var s=[],i=[],a=[];this.reader.offset<t;)s.push(this.reader.getVariableLengthIndex()),r&&i.push(this.reader.getVariableLengthIndex()),a.push(this.reader.getFloat32(),this.reader.getFloat32());r?(this.currentLayer.discontinuousUVs||(this.currentLayer.discontinuousUVs={}),this.currentLayer.discontinuousUVs[e]={uvIndices:s,polyIndices:i,uvs:a}):(this.currentLayer.uvs||(this.currentLayer.uvs={}),this.currentLayer.uvs[e]={uvIndices:s,uvs:a})},parseMorphTargets(e,t,r){var s=[],i=[];for(r="MORF"===r?"relative":"absolute";this.reader.offset<t;)s.push(this.reader.getVariableLengthIndex()),i.push(this.reader.getFloat32(),this.reader.getFloat32(),-this.reader.getFloat32());this.currentLayer.morphTargets||(this.currentLayer.morphTargets={}),this.currentLayer.morphTargets[e]={indices:s,points:i,type:r}},parsePolygonList(e){for(var t=this.reader.offset+e,r=this.reader.getIDTag(),s=[],i=[];this.reader.offset<t;){var a=this.reader.getUint16();a&=1023,i.push(a);for(var h=0;h<a;h++)s.push(this.reader.getVariableLengthIndex())}var n={type:r,vertexIndices:s,polygonDimensions:i,points:this.currentPoints};1===i[0]?n.type="points":2===i[0]&&(n.type="lines"),this.currentLayer.geometry=n},parseTagStrings(e){this.tree.tags=this.reader.getStringArray(e)},parsePolygonTagMapping(e){var t=this.reader.offset+e;"SURF"===this.reader.getIDTag()?this.parseMaterialIndices(t):this.reader.skip(e-4)},parseMaterialIndices(e){for(this.currentLayer.geometry.materialIndices=[];this.reader.offset<e;){var t=this.reader.getVariableLengthIndex(),r=this.reader.getUint16();this.currentLayer.geometry.materialIndices.push(t,r)}},parseUnknownCHUNK(e,t){console.warn("LWOLoader: unknown chunk type: "+e+" length: "+t);var r=this.reader.getString(t);this.currentForm[e]=r}},a.prototype={constructor:a,size:function(){return this.dv.buffer.byteLength},setOffset(e){e>0&&e<this.dv.buffer.byteLength?this.offset=e:console.error("LWOLoader: invalid buffer offset")},endOfFile:function(){return this.offset>=this.size()},skip:function(e){this.offset+=e},getUint8:function(){var e=this.dv.getUint8(this.offset);return this.offset+=1,e},getUint16:function(){var e=this.dv.getUint16(this.offset);return this.offset+=2,e},getInt32:function(){var e=this.dv.getInt32(this.offset,!1);return this.offset+=4,e},getUint32:function(){var e=this.dv.getUint32(this.offset,!1);return this.offset+=4,e},getUint64:function(){return 4294967296*this.getUint32()+this.getUint32()},getFloat32:function(){var e=this.dv.getFloat32(this.offset,!1);return this.offset+=4,e},getFloat32Array:function(e){for(var t=[],r=0;r<e;r++)t.push(this.getFloat32());return t},getFloat64:function(){var e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e},getFloat64Array:function(e){for(var t=[],r=0;r<e;r++)t.push(this.getFloat64());return t},getVariableLengthIndex(){var e=this.getUint8();return 255===e?65536*this.getUint8()+256*this.getUint8()+this.getUint8():256*e+this.getUint8()},getIDTag(){return this.getString(4)},getString:function(e){if(0!==e){var r=[];if(e)for(var s=0;s<e;s++)r[s]=this.getUint8();else{for(var i,a=0;0!==i;)0!==(i=this.getUint8())&&r.push(i),a++;n(a+1)||this.getUint8()}return t.LoaderUtils.decodeText(new Uint8Array(r))}},getStringArray:function(e){var t=this.getString(e);return(t=t.split("\0")).filter(Boolean)}},h.prototype={constructor:h,enable:function(){this.active=!0},log:function(){if(this.active){var e;switch(this.node){case 0:e="FORM";break;case 1:e="CHK";break;case 2:e="S-CHK"}console.log("| ".repeat(this.depth)+e,this.nodeID,`( ${this.offset} ) -> ( ${this.dataOffset+this.length} )`,0==this.node?" {":"",this.skipped?"SKIPPED":"",0==this.node&&this.skipped?"}":""),0!=this.node||this.skipped||(this.depth+=1,this.formList.push(this.dataOffset+this.length)),this.skipped=!1}},closeForms:function(){if(this.active)for(var e=this.formList.length-1;e>=0;e--)this.offset>=this.formList[e]&&(this.depth-=1,console.log("| ".repeat(this.depth)+"}"),this.formList.splice(-1,1))}},e.IFFParser=i,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three"),require("./LWO2Parser.js"),require("./LWO3Parser.js")):"function"==typeof define&&define.amd?define(["exports","three","./LWO2Parser","./LWO3Parser"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE,e.THREE,e.THREE)}();
