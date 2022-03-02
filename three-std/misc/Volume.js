!function(){var t,e;t=this,e=function(t,e,n){"use strict";function i(t,n,i,s,a){if(arguments.length>0){switch(this.xLength=Number(t)||1,this.yLength=Number(n)||1,this.zLength=Number(i)||1,this.axisOrder=["x","y","z"],s){case"Uint8":case"uint8":case"uchar":case"unsigned char":case"uint8_t":default:this.data=new Uint8Array(a);break;case"Int8":case"int8":case"signed char":case"int8_t":this.data=new Int8Array(a);break;case"Int16":case"int16":case"short":case"short int":case"signed short":case"signed short int":case"int16_t":this.data=new Int16Array(a);break;case"Uint16":case"uint16":case"ushort":case"unsigned short":case"unsigned short int":case"uint16_t":this.data=new Uint16Array(a);break;case"Int32":case"int32":case"int":case"signed int":case"int32_t":this.data=new Int32Array(a);break;case"Uint32":case"uint32":case"uint":case"unsigned int":case"uint32_t":this.data=new Uint32Array(a);break;case"longlong":case"long long":case"long long int":case"signed long long":case"signed long long int":case"int64":case"int64_t":case"ulonglong":case"unsigned long long":case"unsigned long long int":case"uint64":case"uint64_t":throw new Error("Error in Volume constructor : this type is not supported in JavaScript");case"Float32":case"float32":case"float":this.data=new Float32Array(a);break;case"Float64":case"float64":case"double":this.data=new Float64Array(a)}if(this.data.length!==this.xLength*this.yLength*this.zLength)throw new Error("Error in Volume constructor, lengths are not matching arrayBuffer size")}this.spacing=[1,1,1],this.offset=[0,0,0],this.matrix=new e.Matrix3,this.matrix.identity();let r=-1/0;Object.defineProperty(this,"lowerThreshold",{get:function(){return r},set:function(t){r=t,this.sliceList.forEach((function(t){t.geometryNeedsUpdate=!0}))}});let o=1/0;Object.defineProperty(this,"upperThreshold",{get:function(){return o},set:function(t){o=t,this.sliceList.forEach((function(t){t.geometryNeedsUpdate=!0}))}}),this.sliceList=[]}i.prototype={constructor:i,getData:function(t,e,n){return this.data[n*this.xLength*this.yLength+e*this.xLength+t]},access:function(t,e,n){return n*this.xLength*this.yLength+e*this.xLength+t},reverseAccess:function(t){const e=Math.floor(t/(this.yLength*this.xLength)),n=Math.floor((t-e*this.yLength*this.xLength)/this.xLength);return[t-e*this.yLength*this.xLength-n*this.xLength,n,e]},map:function(t,e){const n=this.data.length;e=e||this;for(let i=0;i<n;i++)this.data[i]=t.call(e,this.data[i],i,this.data);return this},extractPerpendicularPlane:function(t,n){let i,s,a,r;const o=new e.Vector3,h=new e.Vector3,c=new e.Vector3,l=(new e.Matrix4).identity(),u=this,d=new e.Vector3(this.xLength,this.yLength,this.zLength);switch(t){case"x":o.set(1,0,0),h.set(0,0,-1),c.set(0,-1,0),i=this.spacing[this.axisOrder.indexOf("z")],s=this.spacing[this.axisOrder.indexOf("y")],r=new e.Vector3(n,0,0),l.multiply((new e.Matrix4).makeRotationY(Math.PI/2)),a=(u.RASDimensions[0]-1)/2,l.setPosition(new e.Vector3(n-a,0,0));break;case"y":o.set(0,1,0),h.set(1,0,0),c.set(0,0,1),i=this.spacing[this.axisOrder.indexOf("x")],s=this.spacing[this.axisOrder.indexOf("z")],r=new e.Vector3(0,n,0),l.multiply((new e.Matrix4).makeRotationX(-Math.PI/2)),a=(u.RASDimensions[1]-1)/2,l.setPosition(new e.Vector3(0,n-a,0));break;default:o.set(0,0,1),h.set(1,0,0),c.set(0,-1,0),i=this.spacing[this.axisOrder.indexOf("x")],s=this.spacing[this.axisOrder.indexOf("y")],r=new e.Vector3(0,0,n),a=(u.RASDimensions[2]-1)/2,l.setPosition(new e.Vector3(0,0,n-a))}h.applyMatrix4(u.inverseMatrix).normalize(),h.arglet="i",c.applyMatrix4(u.inverseMatrix).normalize(),c.arglet="j",o.applyMatrix4(u.inverseMatrix).normalize();const g=Math.floor(Math.abs(h.dot(d))),f=Math.floor(Math.abs(c.dot(d))),x=Math.abs(g*i),p=Math.abs(f*s);r=Math.abs(Math.round(r.applyMatrix4(u.inverseMatrix).dot(o)));const y=[new e.Vector3(1,0,0),new e.Vector3(0,1,0),new e.Vector3(0,0,1)],m=[h,c,o].find((function(t){return Math.abs(t.dot(y[0]))>.9})),w=[h,c,o].find((function(t){return Math.abs(t.dot(y[1]))>.9})),L=[h,c,o].find((function(t){return Math.abs(t.dot(y[2]))>.9}));return{iLength:g,jLength:f,sliceAccess:function(t,e){const n=m===o?r:"i"===m.arglet?t:e,i=w===o?r:"i"===w.arglet?t:e,s=L===o?r:"i"===L.arglet?t:e,a=m.dot(y[0])>0?n:u.xLength-1-n,h=w.dot(y[1])>0?i:u.yLength-1-i,c=L.dot(y[2])>0?s:u.zLength-1-s;return u.access(a,h,c)},matrix:l,planeWidth:x,planeHeight:p}},extractSlice:function(t,e){const i=new n.VolumeSlice(this,e,t);return this.sliceList.push(i),i},repaintAllSlices:function(){return this.sliceList.forEach((function(t){t.repaint()})),this},computeMinMax:function(){let t=1/0,e=-1/0;const n=this.data.length;let i=0;for(i=0;i<n;i++)if(!isNaN(this.data[i])){const n=this.data[i];t=Math.min(t,n),e=Math.max(e,n)}return this.min=t,this.max=e,[t,e]}},t.Volume=i,Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("three"),require("./VolumeSlice.js")):"function"==typeof define&&define.amd?define(["exports","three","./VolumeSlice"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t["THREE-STD"]||{},t.THREE,t.THREE)}();
