!function(){var e,t;e=this,t=function(e,t){"use strict";class o extends t.ExtrudeGeometry{constructor(e,t={}){const o=t.font;if(void 0===o)super();else{const i=o.generateShapes(e,t.size);t.depth=void 0!==t.height?t.height:50,void 0===t.bevelThickness&&(t.bevelThickness=10),void 0===t.bevelSize&&(t.bevelSize=8),void 0===t.bevelEnabled&&(t.bevelEnabled=!1),super(i,t)}this.type="TextGeometry"}}e.TextGeometry=o,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE)}();