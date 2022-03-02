!function(){var t,n;t=this,n=function(t,n){"use strict";const e={uniforms:{textureWidth:{value:1},textureHeight:{value:1},focalDepth:{value:1},focalLength:{value:24},fstop:{value:.9},tColor:{value:null},tDepth:{value:null},maxblur:{value:1},showFocus:{value:0},manualdof:{value:0},vignetting:{value:0},depthblur:{value:0},threshold:{value:.5},gain:{value:2},bias:{value:.5},fringe:{value:.7},znear:{value:.1},zfar:{value:100},noise:{value:1},dithering:{value:1e-4},pentagon:{value:0},shaderFocus:{value:1},focusCoords:{value:new n.Vector2}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\t#include <common>\n\n\t\tvarying vec2 vUv;\n\n\t\tuniform sampler2D tColor;\n\t\tuniform sampler2D tDepth;\n\t\tuniform float textureWidth;\n\t\tuniform float textureHeight;\n\n\t\tuniform float focalDepth;  //focal distance value in meters, but you may use autofocus option below\n\t\tuniform float focalLength; //focal length in mm\n\t\tuniform float fstop; //f-stop value\n\t\tuniform bool showFocus; //show debug focus point and focal range (red = focal point, green = focal range)\n\n\t\t/*\n\t\tmake sure that these two values are the same for your camera, otherwise distances will be wrong.\n\t\t*/\n\n\t\tuniform float znear; // camera clipping start\n\t\tuniform float zfar; // camera clipping end\n\n\t\t//------------------------------------------\n\t\t//user variables\n\n\t\tconst int samples = SAMPLES; //samples on the first ring\n\t\tconst int rings = RINGS; //ring count\n\n\t\tconst int maxringsamples = rings * samples;\n\n\t\tuniform bool manualdof; // manual dof calculation\n\t\tfloat ndofstart = 1.0; // near dof blur start\n\t\tfloat ndofdist = 2.0; // near dof blur falloff distance\n\t\tfloat fdofstart = 1.0; // far dof blur start\n\t\tfloat fdofdist = 3.0; // far dof blur falloff distance\n\n\t\tfloat CoC = 0.03; //circle of confusion size in mm (35mm film = 0.03mm)\n\n\t\tuniform bool vignetting; // use optical lens vignetting\n\n\t\tfloat vignout = 1.3; // vignetting outer border\n\t\tfloat vignin = 0.0; // vignetting inner border\n\t\tfloat vignfade = 22.0; // f-stops till vignete fades\n\n\t\tuniform bool shaderFocus;\n\t\t// disable if you use external focalDepth value\n\n\t\tuniform vec2 focusCoords;\n\t\t// autofocus point on screen (0.0,0.0 - left lower corner, 1.0,1.0 - upper right)\n\t\t// if center of screen use vec2(0.5, 0.5);\n\n\t\tuniform float maxblur;\n\t\t//clamp value of max blur (0.0 = no blur, 1.0 default)\n\n\t\tuniform float threshold; // highlight threshold;\n\t\tuniform float gain; // highlight gain;\n\n\t\tuniform float bias; // bokeh edge bias\n\t\tuniform float fringe; // bokeh chromatic aberration / fringing\n\n\t\tuniform bool noise; //use noise instead of pattern for sample dithering\n\n\t\tuniform float dithering;\n\n\t\tuniform bool depthblur; // blur the depth buffer\n\t\tfloat dbsize = 1.25; // depth blur size\n\n\t\t/*\n\t\tnext part is experimental\n\t\tnot looking good with small sample and ring count\n\t\tlooks okay starting from samples = 4, rings = 4\n\t\t*/\n\n\t\tuniform bool pentagon; //use pentagon as bokeh shape?\n\t\tfloat feather = 0.4; //pentagon shape feather\n\n\t\t//------------------------------------------\n\n\t\tfloat penta(vec2 coords) {\n\t\t\t//pentagonal shape\n\t\t\tfloat scale = float(rings) - 1.3;\n\t\t\tvec4  HS0 = vec4( 1.0,         0.0,         0.0,  1.0);\n\t\t\tvec4  HS1 = vec4( 0.309016994, 0.951056516, 0.0,  1.0);\n\t\t\tvec4  HS2 = vec4(-0.809016994, 0.587785252, 0.0,  1.0);\n\t\t\tvec4  HS3 = vec4(-0.809016994,-0.587785252, 0.0,  1.0);\n\t\t\tvec4  HS4 = vec4( 0.309016994,-0.951056516, 0.0,  1.0);\n\t\t\tvec4  HS5 = vec4( 0.0        ,0.0         , 1.0,  1.0);\n\n\t\t\tvec4  one = vec4( 1.0 );\n\n\t\t\tvec4 P = vec4((coords),vec2(scale, scale));\n\n\t\t\tvec4 dist = vec4(0.0);\n\t\t\tfloat inorout = -4.0;\n\n\t\t\tdist.x = dot( P, HS0 );\n\t\t\tdist.y = dot( P, HS1 );\n\t\t\tdist.z = dot( P, HS2 );\n\t\t\tdist.w = dot( P, HS3 );\n\n\t\t\tdist = smoothstep( -feather, feather, dist );\n\n\t\t\tinorout += dot( dist, one );\n\n\t\t\tdist.x = dot( P, HS4 );\n\t\t\tdist.y = HS5.w - abs( P.z );\n\n\t\t\tdist = smoothstep( -feather, feather, dist );\n\t\t\tinorout += dist.x;\n\n\t\t\treturn clamp( inorout, 0.0, 1.0 );\n\t\t}\n\n\t\tfloat bdepth(vec2 coords) {\n\t\t\t// Depth buffer blur\n\t\t\tfloat d = 0.0;\n\t\t\tfloat kernel[9];\n\t\t\tvec2 offset[9];\n\n\t\t\tvec2 wh = vec2(1.0/textureWidth,1.0/textureHeight) * dbsize;\n\n\t\t\toffset[0] = vec2(-wh.x,-wh.y);\n\t\t\toffset[1] = vec2( 0.0, -wh.y);\n\t\t\toffset[2] = vec2( wh.x -wh.y);\n\n\t\t\toffset[3] = vec2(-wh.x,  0.0);\n\t\t\toffset[4] = vec2( 0.0,   0.0);\n\t\t\toffset[5] = vec2( wh.x,  0.0);\n\n\t\t\toffset[6] = vec2(-wh.x, wh.y);\n\t\t\toffset[7] = vec2( 0.0,  wh.y);\n\t\t\toffset[8] = vec2( wh.x, wh.y);\n\n\t\t\tkernel[0] = 1.0/16.0;   kernel[1] = 2.0/16.0;   kernel[2] = 1.0/16.0;\n\t\t\tkernel[3] = 2.0/16.0;   kernel[4] = 4.0/16.0;   kernel[5] = 2.0/16.0;\n\t\t\tkernel[6] = 1.0/16.0;   kernel[7] = 2.0/16.0;   kernel[8] = 1.0/16.0;\n\n\n\t\t\tfor( int i=0; i<9; i++ ) {\n\t\t\t\tfloat tmp = texture2D(tDepth, coords + offset[i]).r;\n\t\t\t\td += tmp * kernel[i];\n\t\t\t}\n\n\t\t\treturn d;\n\t\t}\n\n\n\t\tvec3 color(vec2 coords,float blur) {\n\t\t\t//processing the sample\n\n\t\t\tvec3 col = vec3(0.0);\n\t\t\tvec2 texel = vec2(1.0/textureWidth,1.0/textureHeight);\n\n\t\t\tcol.r = texture2D(tColor,coords + vec2(0.0,1.0)*texel*fringe*blur).r;\n\t\t\tcol.g = texture2D(tColor,coords + vec2(-0.866,-0.5)*texel*fringe*blur).g;\n\t\t\tcol.b = texture2D(tColor,coords + vec2(0.866,-0.5)*texel*fringe*blur).b;\n\n\t\t\tvec3 lumcoeff = vec3(0.299,0.587,0.114);\n\t\t\tfloat lum = dot(col.rgb, lumcoeff);\n\t\t\tfloat thresh = max((lum-threshold)*gain, 0.0);\n\t\t\treturn col+mix(vec3(0.0),col,thresh*blur);\n\t\t}\n\n\t\tvec3 debugFocus(vec3 col, float blur, float depth) {\n\t\t\tfloat edge = 0.002*depth; //distance based edge smoothing\n\t\t\tfloat m = clamp(smoothstep(0.0,edge,blur),0.0,1.0);\n\t\t\tfloat e = clamp(smoothstep(1.0-edge,1.0,blur),0.0,1.0);\n\n\t\t\tcol = mix(col,vec3(1.0,0.5,0.0),(1.0-m)*0.6);\n\t\t\tcol = mix(col,vec3(0.0,0.5,1.0),((1.0-e)-(1.0-m))*0.2);\n\n\t\t\treturn col;\n\t\t}\n\n\t\tfloat linearize(float depth) {\n\t\t\treturn -zfar * znear / (depth * (zfar - znear) - zfar);\n\t\t}\n\n\t\tfloat vignette() {\n\t\t\tfloat dist = distance(vUv.xy, vec2(0.5,0.5));\n\t\t\tdist = smoothstep(vignout+(fstop/vignfade), vignin+(fstop/vignfade), dist);\n\t\t\treturn clamp(dist,0.0,1.0);\n\t\t}\n\n\t\tfloat gather(float i, float j, int ringsamples, inout vec3 col, float w, float h, float blur) {\n\t\t\tfloat rings2 = float(rings);\n\t\t\tfloat step = PI*2.0 / float(ringsamples);\n\t\t\tfloat pw = cos(j*step)*i;\n\t\t\tfloat ph = sin(j*step)*i;\n\t\t\tfloat p = 1.0;\n\t\t\tif (pentagon) {\n\t\t\t\tp = penta(vec2(pw,ph));\n\t\t\t}\n\t\t\tcol += color(vUv.xy + vec2(pw*w,ph*h), blur) * mix(1.0, i/rings2, bias) * p;\n\t\t\treturn 1.0 * mix(1.0, i /rings2, bias) * p;\n\t\t}\n\n\t\tvoid main() {\n\t\t\t//scene depth calculation\n\n\t\t\tfloat depth = linearize(texture2D(tDepth,vUv.xy).x);\n\n\t\t\t// Blur depth?\n\t\t\tif ( depthblur ) {\n\t\t\t\tdepth = linearize(bdepth(vUv.xy));\n\t\t\t}\n\n\t\t\t//focal plane calculation\n\n\t\t\tfloat fDepth = focalDepth;\n\n\t\t\tif (shaderFocus) {\n\n\t\t\t\tfDepth = linearize(texture2D(tDepth,focusCoords).x);\n\n\t\t\t}\n\n\t\t\t// dof blur factor calculation\n\n\t\t\tfloat blur = 0.0;\n\n\t\t\tif (manualdof) {\n\t\t\t\tfloat a = depth-fDepth; // Focal plane\n\t\t\t\tfloat b = (a-fdofstart)/fdofdist; // Far DoF\n\t\t\t\tfloat c = (-a-ndofstart)/ndofdist; // Near Dof\n\t\t\t\tblur = (a>0.0) ? b : c;\n\t\t\t} else {\n\t\t\t\tfloat f = focalLength; // focal length in mm\n\t\t\t\tfloat d = fDepth*1000.0; // focal plane in mm\n\t\t\t\tfloat o = depth*1000.0; // depth in mm\n\n\t\t\t\tfloat a = (o*f)/(o-f);\n\t\t\t\tfloat b = (d*f)/(d-f);\n\t\t\t\tfloat c = (d-f)/(d*fstop*CoC);\n\n\t\t\t\tblur = abs(a-b)*c;\n\t\t\t}\n\n\t\t\tblur = clamp(blur,0.0,1.0);\n\n\t\t\t// calculation of pattern for dithering\n\n\t\t\tvec2 noise = vec2(rand(vUv.xy), rand( vUv.xy + vec2( 0.4, 0.6 ) ) )*dithering*blur;\n\n\t\t\t// getting blur x and y step factor\n\n\t\t\tfloat w = (1.0/textureWidth)*blur*maxblur+noise.x;\n\t\t\tfloat h = (1.0/textureHeight)*blur*maxblur+noise.y;\n\n\t\t\t// calculation of final color\n\n\t\t\tvec3 col = vec3(0.0);\n\n\t\t\tif(blur < 0.05) {\n\t\t\t\t//some optimization thingy\n\t\t\t\tcol = texture2D(tColor, vUv.xy).rgb;\n\t\t\t} else {\n\t\t\t\tcol = texture2D(tColor, vUv.xy).rgb;\n\t\t\t\tfloat s = 1.0;\n\t\t\t\tint ringsamples;\n\n\t\t\t\tfor (int i = 1; i <= rings; i++) {\n\t\t\t\t\t/*unboxstart*/\n\t\t\t\t\tringsamples = i * samples;\n\n\t\t\t\t\tfor (int j = 0 ; j < maxringsamples ; j++) {\n\t\t\t\t\t\tif (j >= ringsamples) break;\n\t\t\t\t\t\ts += gather(float(i), float(j), ringsamples, col, w, h, blur);\n\t\t\t\t\t}\n\t\t\t\t\t/*unboxend*/\n\t\t\t\t}\n\n\t\t\t\tcol /= s; //divide by sample count\n\t\t\t}\n\n\t\t\tif (showFocus) {\n\t\t\t\tcol = debugFocus(col, blur, depth);\n\t\t\t}\n\n\t\t\tif (vignetting) {\n\t\t\t\tcol *= vignette();\n\t\t\t}\n\n\t\t\tgl_FragColor.rgb = col;\n\t\t\tgl_FragColor.a = 1.0;\n\t\t}"},o={uniforms:{mNear:{value:1},mFar:{value:1e3}},vertexShader:"\n\n\t\tvarying float vViewZDepth;\n\n\t\tvoid main() {\n\n\t\t\t#include <begin_vertex>\n\t\t\t#include <project_vertex>\n\n\t\t\tvViewZDepth = - mvPosition.z;\n\n\t\t}",fragmentShader:"\n\n\t\tuniform float mNear;\n\t\tuniform float mFar;\n\n\t\tvarying float vViewZDepth;\n\n\t\tvoid main() {\n\n\t\t\tfloat color = 1.0 - smoothstep( mNear, mFar, vViewZDepth );\n\t\t\tgl_FragColor = vec4( vec3( color ), 1.0 );\n\n\t\t}"};t.BokehDepthShader=o,t.BokehShader=e,Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t["THREE-STD"]||{},t.THREE)}();
