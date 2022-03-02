( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE));
})(this, (function (exports, three) { 'use strict';

	class AnimationClipCreator {
	  static CreateRotationAnimation(period, axis = 'x') {
	    const times = [0, period],
	          values = [0, 360];
	    const trackName = '.rotation[' + axis + ']';
	    const track = new three.NumberKeyframeTrack(trackName, times, values);
	    return new three.AnimationClip(null, period, [track]);
	  }

	  static CreateScaleAxisAnimation(period, axis = 'x') {
	    const times = [0, period],
	          values = [0, 1];
	    const trackName = '.scale[' + axis + ']';
	    const track = new three.NumberKeyframeTrack(trackName, times, values);
	    return new three.AnimationClip(null, period, [track]);
	  }

	  static CreateShakeAnimation(duration, shakeScale) {
	    const times = [],
	          values = [],
	          tmp = new three.Vector3();

	    for (let i = 0; i < duration * 10; i++) {
	      times.push(i / 10);
	      tmp.set(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0).multiply(shakeScale).toArray(values, values.length);
	    }

	    const trackName = '.position';
	    const track = new three.VectorKeyframeTrack(trackName, times, values);
	    return new three.AnimationClip(null, duration, [track]);
	  }

	  static CreatePulsationAnimation(duration, pulseScale) {
	    const times = [],
	          values = [],
	          tmp = new three.Vector3();

	    for (let i = 0; i < duration * 10; i++) {
	      times.push(i / 10);
	      const scaleFactor = Math.random() * pulseScale;
	      tmp.set(scaleFactor, scaleFactor, scaleFactor).toArray(values, values.length);
	    }

	    const trackName = '.scale';
	    const track = new three.VectorKeyframeTrack(trackName, times, values);
	    return new three.AnimationClip(null, duration, [track]);
	  }

	  static CreateVisibilityAnimation(duration) {
	    const times = [0, duration / 2, duration],
	          values = [true, false, true];
	    const trackName = '.visible';
	    const track = new three.BooleanKeyframeTrack(trackName, times, values);
	    return new three.AnimationClip(null, duration, [track]);
	  }

	  static CreateMaterialColorAnimation(duration, colors) {
	    const times = [],
	          values = [],
	          timeStep = duration / colors.length;

	    for (let i = 0; i <= colors.length; i++) {
	      times.push(i * timeStep);
	      values.push(colors[i % colors.length]);
	    }

	    const trackName = '.material[0].color';
	    const track = new three.ColorKeyframeTrack(trackName, times, values);
	    return new three.AnimationClip(null, duration, [track]);
	  }

	}

	exports.AnimationClipCreator = AnimationClipCreator;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
