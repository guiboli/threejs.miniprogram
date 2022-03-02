!function(){var t,n;t=this,n=function(t,n){"use strict";const e={uniforms:{tDiffuse:{value:null},aspect:{value:new n.Vector2(512,512)}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform sampler2D tDiffuse;\n\t\tvarying vec2 vUv;\n\n\t\tuniform vec2 aspect;\n\n\t\tvec2 texel = vec2( 1.0 / aspect.x, 1.0 / aspect.y );\n\n\n\t\tmat3 G[9];\n\n\t\t// hard coded matrix values!!!! as suggested in https://github.com/neilmendoza/ofxPostProcessing/blob/master/src/EdgePass.cpp#L45\n\n\t\tconst mat3 g0 = mat3( 0.3535533845424652, 0, -0.3535533845424652, 0.5, 0, -0.5, 0.3535533845424652, 0, -0.3535533845424652 );\n\t\tconst mat3 g1 = mat3( 0.3535533845424652, 0.5, 0.3535533845424652, 0, 0, 0, -0.3535533845424652, -0.5, -0.3535533845424652 );\n\t\tconst mat3 g2 = mat3( 0, 0.3535533845424652, -0.5, -0.3535533845424652, 0, 0.3535533845424652, 0.5, -0.3535533845424652, 0 );\n\t\tconst mat3 g3 = mat3( 0.5, -0.3535533845424652, 0, -0.3535533845424652, 0, 0.3535533845424652, 0, 0.3535533845424652, -0.5 );\n\t\tconst mat3 g4 = mat3( 0, -0.5, 0, 0.5, 0, 0.5, 0, -0.5, 0 );\n\t\tconst mat3 g5 = mat3( -0.5, 0, 0.5, 0, 0, 0, 0.5, 0, -0.5 );\n\t\tconst mat3 g6 = mat3( 0.1666666716337204, -0.3333333432674408, 0.1666666716337204, -0.3333333432674408, 0.6666666865348816, -0.3333333432674408, 0.1666666716337204, -0.3333333432674408, 0.1666666716337204 );\n\t\tconst mat3 g7 = mat3( -0.3333333432674408, 0.1666666716337204, -0.3333333432674408, 0.1666666716337204, 0.6666666865348816, 0.1666666716337204, -0.3333333432674408, 0.1666666716337204, -0.3333333432674408 );\n\t\tconst mat3 g8 = mat3( 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408 );\n\n\t\tvoid main(void)\n\t\t{\n\n\t\t\tG[0] = g0,\n\t\t\tG[1] = g1,\n\t\t\tG[2] = g2,\n\t\t\tG[3] = g3,\n\t\t\tG[4] = g4,\n\t\t\tG[5] = g5,\n\t\t\tG[6] = g6,\n\t\t\tG[7] = g7,\n\t\t\tG[8] = g8;\n\n\t\t\tmat3 I;\n\t\t\tfloat cnv[9];\n\t\t\tvec3 sample;\n\n\t\t/* fetch the 3x3 neighbourhood and use the RGB vector's length as intensity value */\n\t\t\tfor (float i=0.0; i<3.0; i++) {\n\t\t\t\tfor (float j=0.0; j<3.0; j++) {\n\t\t\t\t\tsample = texture2D(tDiffuse, vUv + texel * vec2(i-1.0,j-1.0) ).rgb;\n\t\t\t\t\tI[int(i)][int(j)] = length(sample);\n\t\t\t\t}\n\t\t\t}\n\n\t\t/* calculate the convolution values for all the masks */\n\t\t\tfor (int i=0; i<9; i++) {\n\t\t\t\tfloat dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);\n\t\t\t\tcnv[i] = dp3 * dp3;\n\t\t\t}\n\n\t\t\tfloat M = (cnv[0] + cnv[1]) + (cnv[2] + cnv[3]);\n\t\t\tfloat S = (cnv[4] + cnv[5]) + (cnv[6] + cnv[7]) + (cnv[8] + M);\n\n\t\t\tgl_FragColor = vec4(vec3(sqrt(M/S)), 1.0);\n\t\t}"};t.FreiChenShader=e,Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t["THREE-STD"]||{},t.THREE)}();
