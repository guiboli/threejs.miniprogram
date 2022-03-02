( function () {
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('./RGBELoader.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', './RGBELoader'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = global["THREE-STD"] || {}, global.THREE, global.THREE));
})(this, (function (exports, three, RGBELoader_js) { 'use strict';

	class HDRCubeTextureLoader extends three.Loader {
	  constructor(manager) {
	    super(manager);
	    this.hdrLoader = new RGBELoader_js.RGBELoader();
	    this.type = three.HalfFloatType;
	  }

	  load(urls, onLoad, onProgress, onError) {
	    if (!Array.isArray(urls)) {
	      console.warn('THREE.HDRCubeTextureLoader signature has changed. Use .setDataType() instead.');
	      this.setDataType(urls);
	      urls = onLoad;
	      onLoad = onProgress;
	      onProgress = onError;
	      onError = arguments[4];
	    }

	    const texture = new three.CubeTexture();
	    texture.type = this.type;

	    switch (texture.type) {
	      case three.FloatType:
	        texture.encoding = three.LinearEncoding;
	        texture.minFilter = three.LinearFilter;
	        texture.magFilter = three.LinearFilter;
	        texture.generateMipmaps = false;
	        break;

	      case three.HalfFloatType:
	        texture.encoding = three.LinearEncoding;
	        texture.minFilter = three.LinearFilter;
	        texture.magFilter = three.LinearFilter;
	        texture.generateMipmaps = false;
	        break;
	    }

	    const scope = this;
	    let loaded = 0;

	    function loadHDRData(i, onLoad, onProgress, onError) {
	      new three.FileLoader(scope.manager).setPath(scope.path).setResponseType('arraybuffer').setWithCredentials(scope.withCredentials).load(urls[i], function (buffer) {
	        loaded++;
	        const texData = scope.hdrLoader.parse(buffer);
	        if (!texData) return;

	        if (texData.data !== undefined) {
	          const dataTexture = new three.DataTexture(texData.data, texData.width, texData.height);
	          dataTexture.type = texture.type;
	          dataTexture.encoding = texture.encoding;
	          dataTexture.format = texture.format;
	          dataTexture.minFilter = texture.minFilter;
	          dataTexture.magFilter = texture.magFilter;
	          dataTexture.generateMipmaps = texture.generateMipmaps;
	          texture.images[i] = dataTexture;
	        }

	        if (loaded === 6) {
	          texture.needsUpdate = true;
	          if (onLoad) onLoad(texture);
	        }
	      }, onProgress, onError);
	    }

	    for (let i = 0; i < urls.length; i++) {
	      loadHDRData(i, onLoad, onProgress, onError);
	    }

	    return texture;
	  }

	  setDataType(value) {
	    this.type = value;
	    this.hdrLoader.setDataType(value);
	    return this;
	  }

	}

	exports.HDRCubeTextureLoader = HDRCubeTextureLoader;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
} )();
