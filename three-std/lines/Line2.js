!function(){var e,n;e=this,n=function(e,n,i,t){"use strict";class o extends n.LineSegments2{constructor(e=new i.LineGeometry,n=new t.LineMaterial({color:16777215*Math.random()})){super(e,n),this.type="Line2"}}o.prototype.isLine2=!0,e.Line2=o,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("./LineSegments2.js"),require("./LineGeometry.js"),require("./LineMaterial.js")):"function"==typeof define&&define.amd?define(["exports","./LineSegments2","./LineGeometry","./LineMaterial"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self).THREE=e["THREE-STD"]||{},e.THREE,e.THREE,e.THREE)}();