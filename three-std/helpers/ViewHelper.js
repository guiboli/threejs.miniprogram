( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE));
})(this, (function (exports, THREE) { 'use strict';

	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		}
		n["default"] = e;
		return Object.freeze(n);
	}

	var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

	const vpTemp = new THREE__namespace.Vector4();

	class ViewHelper extends THREE__namespace.Object3D {
	  constructor(editorCamera, dom) {
	    super();
	    this.animating = false;
	    this.controls = null;
	    const color1 = new THREE__namespace.Color('#ff3653');
	    const color2 = new THREE__namespace.Color('#8adb00');
	    const color3 = new THREE__namespace.Color('#2c8fff');
	    const interactiveObjects = [];
	    const raycaster = new THREE__namespace.Raycaster();
	    const mouse = new THREE__namespace.Vector2();
	    const dummy = new THREE__namespace.Object3D();
	    const camera = new THREE__namespace.OrthographicCamera(-2, 2, 2, -2, 0, 4);
	    camera.position.set(0, 0, 2);
	    const geometry = new THREE__namespace.BoxGeometry(0.8, 0.05, 0.05).translate(0.4, 0, 0);
	    const xAxis = new THREE__namespace.Mesh(geometry, getAxisMaterial(color1));
	    const yAxis = new THREE__namespace.Mesh(geometry, getAxisMaterial(color2));
	    const zAxis = new THREE__namespace.Mesh(geometry, getAxisMaterial(color3));
	    yAxis.rotation.z = Math.PI / 2;
	    zAxis.rotation.y = -Math.PI / 2;
	    this.add(xAxis);
	    this.add(zAxis);
	    this.add(yAxis);
	    const posXAxisHelper = new THREE__namespace.Sprite(getSpriteMaterial(color1, 'X'));
	    posXAxisHelper.userData.type = 'posX';
	    const posYAxisHelper = new THREE__namespace.Sprite(getSpriteMaterial(color2, 'Y'));
	    posYAxisHelper.userData.type = 'posY';
	    const posZAxisHelper = new THREE__namespace.Sprite(getSpriteMaterial(color3, 'Z'));
	    posZAxisHelper.userData.type = 'posZ';
	    const negXAxisHelper = new THREE__namespace.Sprite(getSpriteMaterial(color1));
	    negXAxisHelper.userData.type = 'negX';
	    const negYAxisHelper = new THREE__namespace.Sprite(getSpriteMaterial(color2));
	    negYAxisHelper.userData.type = 'negY';
	    const negZAxisHelper = new THREE__namespace.Sprite(getSpriteMaterial(color3));
	    negZAxisHelper.userData.type = 'negZ';
	    posXAxisHelper.position.x = 1;
	    posYAxisHelper.position.y = 1;
	    posZAxisHelper.position.z = 1;
	    negXAxisHelper.position.x = -1;
	    negXAxisHelper.scale.setScalar(0.8);
	    negYAxisHelper.position.y = -1;
	    negYAxisHelper.scale.setScalar(0.8);
	    negZAxisHelper.position.z = -1;
	    negZAxisHelper.scale.setScalar(0.8);
	    this.add(posXAxisHelper);
	    this.add(posYAxisHelper);
	    this.add(posZAxisHelper);
	    this.add(negXAxisHelper);
	    this.add(negYAxisHelper);
	    this.add(negZAxisHelper);
	    interactiveObjects.push(posXAxisHelper);
	    interactiveObjects.push(posYAxisHelper);
	    interactiveObjects.push(posZAxisHelper);
	    interactiveObjects.push(negXAxisHelper);
	    interactiveObjects.push(negYAxisHelper);
	    interactiveObjects.push(negZAxisHelper);
	    const point = new THREE__namespace.Vector3();
	    const dim = 128;
	    const turnRate = 2 * Math.PI; // turn rate in angles per second

	    this.render = function (renderer) {
	      this.quaternion.copy(editorCamera.quaternion).invert();
	      this.updateMatrixWorld();
	      point.set(0, 0, 1);
	      point.applyQuaternion(editorCamera.quaternion);

	      if (point.x >= 0) {
	        posXAxisHelper.material.opacity = 1;
	        negXAxisHelper.material.opacity = 0.5;
	      } else {
	        posXAxisHelper.material.opacity = 0.5;
	        negXAxisHelper.material.opacity = 1;
	      }

	      if (point.y >= 0) {
	        posYAxisHelper.material.opacity = 1;
	        negYAxisHelper.material.opacity = 0.5;
	      } else {
	        posYAxisHelper.material.opacity = 0.5;
	        negYAxisHelper.material.opacity = 1;
	      }

	      if (point.z >= 0) {
	        posZAxisHelper.material.opacity = 1;
	        negZAxisHelper.material.opacity = 0.5;
	      } else {
	        posZAxisHelper.material.opacity = 0.5;
	        negZAxisHelper.material.opacity = 1;
	      } //


	      const x = dom.offsetWidth - dim;
	      renderer.clearDepth();
	      renderer.getViewport(vpTemp);
	      renderer.setViewport(x, 0, dim, dim);
	      renderer.render(this, camera);
	      renderer.setViewport(vpTemp.x, vpTemp.y, vpTemp.z, vpTemp.w);
	    };

	    const targetPosition = new THREE__namespace.Vector3();
	    const targetQuaternion = new THREE__namespace.Quaternion();
	    const q1 = new THREE__namespace.Quaternion();
	    const q2 = new THREE__namespace.Quaternion();
	    let radius = 0;

	    this.handleClick = function (event) {
	      if (this.animating === true) return false;
	      const rect = dom.getBoundingClientRect();
	      const offsetX = rect.left + (container.dom.offsetWidth - dim);
	      const offsetY = rect.top + (container.dom.offsetHeight - dim);
	      mouse.x = (event.clientX - offsetX) / (rect.width - offsetX) * 2 - 1;
	      mouse.y = -((event.clientY - offsetY) / (rect.bottom - offsetY)) * 2 + 1;
	      raycaster.setFromCamera(mouse, camera);
	      const intersects = raycaster.intersectObjects(interactiveObjects);

	      if (intersects.length > 0) {
	        const intersection = intersects[0];
	        const object = intersection.object;
	        prepareAnimationData(object, this.controls.center);
	        this.animating = true;
	        return true;
	      } else {
	        return false;
	      }
	    };

	    this.update = function (delta) {
	      const step = delta * turnRate;
	      const focusPoint = this.controls.center; // animate position by doing a slerp and then scaling the position on the unit sphere

	      q1.rotateTowards(q2, step);
	      editorCamera.position.set(0, 0, 1).applyQuaternion(q1).multiplyScalar(radius).add(focusPoint); // animate orientation

	      editorCamera.quaternion.rotateTowards(targetQuaternion, step);

	      if (q1.angleTo(q2) === 0) {
	        this.animating = false;
	      }
	    };

	    function prepareAnimationData(object, focusPoint) {
	      switch (object.userData.type) {
	        case 'posX':
	          targetPosition.set(1, 0, 0);
	          targetQuaternion.setFromEuler(new THREE__namespace.Euler(0, Math.PI * 0.5, 0));
	          break;

	        case 'posY':
	          targetPosition.set(0, 1, 0);
	          targetQuaternion.setFromEuler(new THREE__namespace.Euler(-Math.PI * 0.5, 0, 0));
	          break;

	        case 'posZ':
	          targetPosition.set(0, 0, 1);
	          targetQuaternion.setFromEuler(new THREE__namespace.Euler());
	          break;

	        case 'negX':
	          targetPosition.set(-1, 0, 0);
	          targetQuaternion.setFromEuler(new THREE__namespace.Euler(0, -Math.PI * 0.5, 0));
	          break;

	        case 'negY':
	          targetPosition.set(0, -1, 0);
	          targetQuaternion.setFromEuler(new THREE__namespace.Euler(Math.PI * 0.5, 0, 0));
	          break;

	        case 'negZ':
	          targetPosition.set(0, 0, -1);
	          targetQuaternion.setFromEuler(new THREE__namespace.Euler(0, Math.PI, 0));
	          break;

	        default:
	          console.error('ViewHelper: Invalid axis.');
	      } //


	      radius = editorCamera.position.distanceTo(focusPoint);
	      targetPosition.multiplyScalar(radius).add(focusPoint);
	      dummy.position.copy(focusPoint);
	      dummy.lookAt(editorCamera.position);
	      q1.copy(dummy.quaternion);
	      dummy.lookAt(targetPosition);
	      q2.copy(dummy.quaternion);
	    }

	    function getAxisMaterial(color) {
	      return new THREE__namespace.MeshBasicMaterial({
	        color: color,
	        toneMapped: false
	      });
	    }

	    function getSpriteMaterial(color, text = null) {
	      const canvas = document.createElement('canvas');
	      canvas.width = 64;
	      canvas.height = 64;
	      const context = canvas.getContext('2d');
	      context.beginPath();
	      context.arc(32, 32, 16, 0, 2 * Math.PI);
	      context.closePath();
	      context.fillStyle = color.getStyle();
	      context.fill();

	      if (text !== null) {
	        context.font = '24px Arial';
	        context.textAlign = 'center';
	        context.fillStyle = '#000000';
	        context.fillText(text, 32, 41);
	      }

	      const texture = new THREE__namespace.CanvasTexture(canvas);
	      return new THREE__namespace.SpriteMaterial({
	        map: texture,
	        toneMapped: false
	      });
	    }
	  }

	}

	ViewHelper.prototype.isViewHelper = true;

	exports.ViewHelper = ViewHelper;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
