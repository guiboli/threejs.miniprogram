( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE));
})(this, (function (exports, three) { 'use strict';

	class MorphAnimMesh extends three.Mesh {
	  constructor(geometry, material) {
	    super(geometry, material);
	    this.type = 'MorphAnimMesh';
	    this.mixer = new three.AnimationMixer(this);
	    this.activeAction = null;
	  }

	  setDirectionForward() {
	    this.mixer.timeScale = 1.0;
	  }

	  setDirectionBackward() {
	    this.mixer.timeScale = -1.0;
	  }

	  playAnimation(label, fps) {
	    if (this.activeAction) {
	      this.activeAction.stop();
	      this.activeAction = null;
	    }

	    const clip = three.AnimationClip.findByName(this, label);

	    if (clip) {
	      const action = this.mixer.clipAction(clip);
	      action.timeScale = clip.tracks.length * fps / clip.duration;
	      this.activeAction = action.play();
	    } else {
	      throw new Error('THREE.MorphAnimMesh: animations[' + label + '] undefined in .playAnimation()');
	    }
	  }

	  updateAnimation(delta) {
	    this.mixer.update(delta);
	  }

	  copy(source) {
	    super.copy(source);
	    this.mixer = new three.AnimationMixer(this);
	    return this;
	  }

	}

	exports.MorphAnimMesh = MorphAnimMesh;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
