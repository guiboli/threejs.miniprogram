!function(){var t,e;t=this,e=function(t){"use strict";function e(t,e,n,o){const i=e.x(),s=e.y(),r=e.z(),a=e.w(),c=i+i,d=s+s,l=r+r,f=i*c,u=i*d,y=i*l,w=s*d,g=s*l,b=r*l,h=a*c,p=a*d,m=a*l;n[o+0]=1-(w+b),n[o+1]=u+m,n[o+2]=y-p,n[o+3]=0,n[o+4]=u-m,n[o+5]=1-(f+b),n[o+6]=g+h,n[o+7]=0,n[o+8]=y+p,n[o+9]=g-h,n[o+10]=1-(f+w),n[o+11]=0,n[o+12]=t.x(),n[o+13]=t.y(),n[o+14]=t.z(),n[o+15]=1}t.AmmoPhysics=async function(){if("Ammo"in window==0)return void console.error("AmmoPhysics: Couldn't find Ammo.js");const t=await Ammo(),n=new t.btDefaultCollisionConfiguration,o=new t.btCollisionDispatcher(n),i=new t.btDbvtBroadphase,s=new t.btSequentialImpulseConstraintSolver,r=new t.btDiscreteDynamicsWorld(o,i,s,n);r.setGravity(new t.btVector3(0,-9.8,0));const a=new t.btTransform,c=[],d=new WeakMap;let l=0;return setInterval((function(){const t=performance.now();if(l>0){const e=(t-l)/1e3;r.stepSimulation(e,10)}l=t;for(let t=0,n=c.length;t<n;t++){const n=c[t];if(n.isInstancedMesh){const t=n.instanceMatrix.array,o=d.get(n);for(let n=0;n<o.length;n++)o[n].getMotionState().getWorldTransform(a),e(a.getOrigin(),a.getRotation(),t,16*n);n.instanceMatrix.needsUpdate=!0}else if(n.isMesh){d.get(n).getMotionState().getWorldTransform(a);const t=a.getOrigin(),e=a.getRotation();n.position.set(t.x(),t.y(),t.z()),n.quaternion.set(e.x(),e.y(),e.z(),e.w())}}}),1e3/60),{addMesh:function(e,n=0){const o=function(e){const n=e.parameters;if("BoxGeometry"===e.type){const e=void 0!==n.width?n.width/2:.5,o=void 0!==n.height?n.height/2:.5,i=void 0!==n.depth?n.depth/2:.5,s=new t.btBoxShape(new t.btVector3(e,o,i));return s.setMargin(.05),s}if("SphereGeometry"===e.type||"IcosahedronGeometry"===e.type){const e=void 0!==n.radius?n.radius:1,o=new t.btSphereShape(e);return o.setMargin(.05),o}return null}(e.geometry);null!==o&&(e.isInstancedMesh?function(e,n,o){const i=e.instanceMatrix.array,s=[];for(let a=0;a<e.count;a++){const e=16*a,c=new t.btTransform;c.setFromOpenGLMatrix(i.slice(e,e+16));const d=new t.btDefaultMotionState(c),l=new t.btVector3(0,0,0);o.calculateLocalInertia(n,l);const f=new t.btRigidBodyConstructionInfo(n,d,o,l),u=new t.btRigidBody(f);r.addRigidBody(u),s.push(u)}n>0&&(c.push(e),d.set(e,s))}(e,n,o):e.isMesh&&function(e,n,o){const i=e.position,s=e.quaternion,a=new t.btTransform;a.setIdentity(),a.setOrigin(new t.btVector3(i.x,i.y,i.z)),a.setRotation(new t.btQuaternion(s.x,s.y,s.z,s.w));const l=new t.btDefaultMotionState(a),f=new t.btVector3(0,0,0);o.calculateLocalInertia(n,f);const u=new t.btRigidBodyConstructionInfo(n,l,o,f),y=new t.btRigidBody(u);r.addRigidBody(y),n>0&&(c.push(e),d.set(e,y))}(e,n,o))},setMeshPosition:function(e,n,o=0){if(e.isInstancedMesh){const i=d.get(e)[o];i.setAngularVelocity(new t.btVector3(0,0,0)),i.setLinearVelocity(new t.btVector3(0,0,0)),a.setIdentity(),a.setOrigin(new t.btVector3(n.x,n.y,n.z)),i.setWorldTransform(a)}else if(e.isMesh){const o=d.get(e);o.setAngularVelocity(new t.btVector3(0,0,0)),o.setLinearVelocity(new t.btVector3(0,0,0)),a.setIdentity(),a.setOrigin(new t.btVector3(n.x,n.y,n.z)),o.setWorldTransform(a)}}}},Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t["THREE-STD"]||{})}();
