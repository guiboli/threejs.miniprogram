!function(){var e,r;e=this,r=function(e,r,o){"use strict";class l extends o.Pass{constructor(e,o){super(),this.needsSwap=!1,this.clearColor=void 0!==e?e:0,this.clearAlpha=void 0!==o?o:0,this._oldClearColor=new r.Color}render(e,r,o){let l;this.clearColor&&(e.getClearColor(this._oldClearColor),l=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),e.setRenderTarget(this.renderToScreen?null:o),e.clear(),this.clearColor&&e.setClearColor(this._oldClearColor,l)}}e.ClearPass=l,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("three"),require("./Pass.js")):"function"==typeof define&&define.amd?define(["exports","three","./Pass"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE,e.THREE)}();