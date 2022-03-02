!function(){var t,e;t=this,e=function(t,e){"use strict";const n={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new e.Vector2(1/1024,1/512)}},vertexShader:"\n\n\t\tuniform vec2 resolution;\n\n\t\tvarying vec2 vUv;\n\t\tvarying vec4 vOffset[ 3 ];\n\n\t\tvoid SMAAEdgeDetectionVS( vec2 texcoord ) {\n\t\t\tvOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component\n\t\t\tvOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component\n\t\t\tvOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tSMAAEdgeDetectionVS( vUv );\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\t\tvarying vec4 vOffset[ 3 ];\n\n\t\tvec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {\n\t\t\tvec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );\n\n\t\t\t// Calculate color deltas:\n\t\t\tvec4 delta;\n\t\t\tvec3 C = texture2D( colorTex, texcoord ).rgb;\n\n\t\t\tvec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;\n\t\t\tvec3 t = abs( C - Cleft );\n\t\t\tdelta.x = max( max( t.r, t.g ), t.b );\n\n\t\t\tvec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;\n\t\t\tt = abs( C - Ctop );\n\t\t\tdelta.y = max( max( t.r, t.g ), t.b );\n\n\t\t\t// We do the usual threshold:\n\t\t\tvec2 edges = step( threshold, delta.xy );\n\n\t\t\t// Then discard if there is no edge:\n\t\t\tif ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )\n\t\t\t\tdiscard;\n\n\t\t\t// Calculate right and bottom deltas:\n\t\t\tvec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;\n\t\t\tt = abs( C - Cright );\n\t\t\tdelta.z = max( max( t.r, t.g ), t.b );\n\n\t\t\tvec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;\n\t\t\tt = abs( C - Cbottom );\n\t\t\tdelta.w = max( max( t.r, t.g ), t.b );\n\n\t\t\t// Calculate the maximum delta in the direct neighborhood:\n\t\t\tfloat maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );\n\n\t\t\t// Calculate left-left and top-top deltas:\n\t\t\tvec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;\n\t\t\tt = abs( C - Cleftleft );\n\t\t\tdelta.z = max( max( t.r, t.g ), t.b );\n\n\t\t\tvec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;\n\t\t\tt = abs( C - Ctoptop );\n\t\t\tdelta.w = max( max( t.r, t.g ), t.b );\n\n\t\t\t// Calculate the final maximum delta:\n\t\t\tmaxDelta = max( max( maxDelta, delta.z ), delta.w );\n\n\t\t\t// Local contrast adaptation in action:\n\t\t\tedges.xy *= step( 0.5 * maxDelta, delta.xy );\n\n\t\t\treturn vec4( edges, 0.0, 0.0 );\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tgl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );\n\n\t\t}"},o={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new e.Vector2(1/1024,1/512)}},vertexShader:"\n\n\t\tuniform vec2 resolution;\n\n\t\tvarying vec2 vUv;\n\t\tvarying vec4 vOffset[ 3 ];\n\t\tvarying vec2 vPixcoord;\n\n\t\tvoid SMAABlendingWeightCalculationVS( vec2 texcoord ) {\n\t\t\tvPixcoord = texcoord / resolution;\n\n\t\t\t// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):\n\t\t\tvOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components\n\t\t\tvOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components\n\n\t\t\t// And these for the searches, they indicate the ends of the loops:\n\t\t\tvOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tSMAABlendingWeightCalculationVS( vUv );\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\t#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform sampler2D tArea;\n\t\tuniform sampler2D tSearch;\n\t\tuniform vec2 resolution;\n\n\t\tvarying vec2 vUv;\n\t\tvarying vec4 vOffset[3];\n\t\tvarying vec2 vPixcoord;\n\n\t\t#if __VERSION__ == 100\n\t\tvec2 round( vec2 x ) {\n\t\t\treturn sign( x ) * floor( abs( x ) + 0.5 );\n\t\t}\n\t\t#endif\n\n\t\tfloat SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {\n\t\t\t// Not required if searchTex accesses are set to point:\n\t\t\t// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);\n\t\t\t// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +\n\t\t\t//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;\n\t\t\te.r = bias + e.r * scale;\n\t\t\treturn 255.0 * texture2D( searchTex, e, 0.0 ).r;\n\t\t}\n\n\t\tfloat SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {\n\t\t\t/**\n\t\t\t\t* @PSEUDO_GATHER4\n\t\t\t\t* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to\n\t\t\t\t* sample between edge, thus fetching four edges in a row.\n\t\t\t\t* Sampling with different offsets in each direction allows to disambiguate\n\t\t\t\t* which edges are active from the four fetched ones.\n\t\t\t\t*/\n\t\t\tvec2 e = vec2( 0.0, 1.0 );\n\n\t\t\tfor ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for\n\t\t\t\te = texture2D( edgesTex, texcoord, 0.0 ).rg;\n\t\t\t\ttexcoord -= vec2( 2.0, 0.0 ) * resolution;\n\t\t\t\tif ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;\n\t\t\t}\n\n\t\t\t// We correct the previous (-0.25, -0.125) offset we applied:\n\t\t\ttexcoord.x += 0.25 * resolution.x;\n\n\t\t\t// The searches are bias by 1, so adjust the coords accordingly:\n\t\t\ttexcoord.x += resolution.x;\n\n\t\t\t// Disambiguate the length added by the last step:\n\t\t\ttexcoord.x += 2.0 * resolution.x; // Undo last step\n\t\t\ttexcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);\n\n\t\t\treturn texcoord.x;\n\t\t}\n\n\t\tfloat SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {\n\t\t\tvec2 e = vec2( 0.0, 1.0 );\n\n\t\t\tfor ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for\n\t\t\t\te = texture2D( edgesTex, texcoord, 0.0 ).rg;\n\t\t\t\ttexcoord += vec2( 2.0, 0.0 ) * resolution;\n\t\t\t\tif ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;\n\t\t\t}\n\n\t\t\ttexcoord.x -= 0.25 * resolution.x;\n\t\t\ttexcoord.x -= resolution.x;\n\t\t\ttexcoord.x -= 2.0 * resolution.x;\n\t\t\ttexcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );\n\n\t\t\treturn texcoord.x;\n\t\t}\n\n\t\tfloat SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {\n\t\t\tvec2 e = vec2( 1.0, 0.0 );\n\n\t\t\tfor ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for\n\t\t\t\te = texture2D( edgesTex, texcoord, 0.0 ).rg;\n\t\t\t\ttexcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign\n\t\t\t\tif ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;\n\t\t\t}\n\n\t\t\ttexcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign\n\t\t\ttexcoord.y -= resolution.y; // WebGL port note: Changed sign\n\t\t\ttexcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign\n\t\t\ttexcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign\n\n\t\t\treturn texcoord.y;\n\t\t}\n\n\t\tfloat SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {\n\t\t\tvec2 e = vec2( 1.0, 0.0 );\n\n\t\t\tfor ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for\n\t\t\t\te = texture2D( edgesTex, texcoord, 0.0 ).rg;\n\t\t\t\ttexcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign\n\t\t\t\tif ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;\n\t\t\t}\n\n\t\t\ttexcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign\n\t\t\ttexcoord.y += resolution.y; // WebGL port note: Changed sign\n\t\t\ttexcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign\n\t\t\ttexcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign\n\n\t\t\treturn texcoord.y;\n\t\t}\n\n\t\tvec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {\n\t\t\t// Rounding prevents precision errors of bilinear filtering:\n\t\t\tvec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;\n\n\t\t\t// We do a scale and bias for mapping to texel space:\n\t\t\ttexcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );\n\n\t\t\t// Move to proper place, according to the subpixel offset:\n\t\t\ttexcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;\n\n\t\t\treturn texture2D( areaTex, texcoord, 0.0 ).rg;\n\t\t}\n\n\t\tvec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {\n\t\t\tvec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );\n\n\t\t\tvec2 e = texture2D( edgesTex, texcoord ).rg;\n\n\t\t\tif ( e.g > 0.0 ) { // Edge at north\n\t\t\t\tvec2 d;\n\n\t\t\t\t// Find the distance to the left:\n\t\t\t\tvec2 coords;\n\t\t\t\tcoords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );\n\t\t\t\tcoords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)\n\t\t\t\td.x = coords.x;\n\n\t\t\t\t// Now fetch the left crossing edges, two at a time using bilinear\n\t\t\t\t// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to\n\t\t\t\t// discern what value each edge has:\n\t\t\t\tfloat e1 = texture2D( edgesTex, coords, 0.0 ).r;\n\n\t\t\t\t// Find the distance to the right:\n\t\t\t\tcoords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );\n\t\t\t\td.y = coords.x;\n\n\t\t\t\t// We want the distances to be in pixel units (doing this here allow to\n\t\t\t\t// better interleave arithmetic and memory accesses):\n\t\t\t\td = d / resolution.x - pixcoord.x;\n\n\t\t\t\t// SMAAArea below needs a sqrt, as the areas texture is compressed\n\t\t\t\t// quadratically:\n\t\t\t\tvec2 sqrt_d = sqrt( abs( d ) );\n\n\t\t\t\t// Fetch the right crossing edges:\n\t\t\t\tcoords.y -= 1.0 * resolution.y; // WebGL port note: Added\n\t\t\t\tfloat e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;\n\n\t\t\t\t// Ok, we know how this pattern looks like, now it is time for getting\n\t\t\t\t// the actual area:\n\t\t\t\tweights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );\n\t\t\t}\n\n\t\t\tif ( e.r > 0.0 ) { // Edge at west\n\t\t\t\tvec2 d;\n\n\t\t\t\t// Find the distance to the top:\n\t\t\t\tvec2 coords;\n\n\t\t\t\tcoords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );\n\t\t\t\tcoords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;\n\t\t\t\td.x = coords.y;\n\n\t\t\t\t// Fetch the top crossing edges:\n\t\t\t\tfloat e1 = texture2D( edgesTex, coords, 0.0 ).g;\n\n\t\t\t\t// Find the distance to the bottom:\n\t\t\t\tcoords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );\n\t\t\t\td.y = coords.y;\n\n\t\t\t\t// We want the distances to be in pixel units:\n\t\t\t\td = d / resolution.y - pixcoord.y;\n\n\t\t\t\t// SMAAArea below needs a sqrt, as the areas texture is compressed\n\t\t\t\t// quadratically:\n\t\t\t\tvec2 sqrt_d = sqrt( abs( d ) );\n\n\t\t\t\t// Fetch the bottom crossing edges:\n\t\t\t\tcoords.y -= 1.0 * resolution.y; // WebGL port note: Added\n\t\t\t\tfloat e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;\n\n\t\t\t\t// Get the area for this direction:\n\t\t\t\tweights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );\n\t\t\t}\n\n\t\t\treturn weights;\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tgl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );\n\n\t\t}"},r={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new e.Vector2(1/1024,1/512)}},vertexShader:"\n\n\t\tuniform vec2 resolution;\n\n\t\tvarying vec2 vUv;\n\t\tvarying vec4 vOffset[ 2 ];\n\n\t\tvoid SMAANeighborhoodBlendingVS( vec2 texcoord ) {\n\t\t\tvOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component\n\t\t\tvOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tSMAANeighborhoodBlendingVS( vUv );\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform sampler2D tColor;\n\t\tuniform vec2 resolution;\n\n\t\tvarying vec2 vUv;\n\t\tvarying vec4 vOffset[ 2 ];\n\n\t\tvec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {\n\t\t\t// Fetch the blending weights for current pixel:\n\t\t\tvec4 a;\n\t\t\ta.xz = texture2D( blendTex, texcoord ).xz;\n\t\t\ta.y = texture2D( blendTex, offset[ 1 ].zw ).g;\n\t\t\ta.w = texture2D( blendTex, offset[ 1 ].xy ).a;\n\n\t\t\t// Is there any blending weight with a value greater than 0.0?\n\t\t\tif ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {\n\t\t\t\treturn texture2D( colorTex, texcoord, 0.0 );\n\t\t\t} else {\n\t\t\t\t// Up to 4 lines can be crossing a pixel (one through each edge). We\n\t\t\t\t// favor blending by choosing the line with the maximum weight for each\n\t\t\t\t// direction:\n\t\t\t\tvec2 offset;\n\t\t\t\toffset.x = a.a > a.b ? a.a : -a.b; // left vs. right\n\t\t\t\toffset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs\n\n\t\t\t\t// Then we go in the direction that has the maximum weight:\n\t\t\t\tif ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical\n\t\t\t\t\toffset.y = 0.0;\n\t\t\t\t} else {\n\t\t\t\t\toffset.x = 0.0;\n\t\t\t\t}\n\n\t\t\t\t// Fetch the opposite color and lerp by hand:\n\t\t\t\tvec4 C = texture2D( colorTex, texcoord, 0.0 );\n\t\t\t\ttexcoord += sign( offset ) * resolution;\n\t\t\t\tvec4 Cop = texture2D( colorTex, texcoord, 0.0 );\n\t\t\t\tfloat s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );\n\n\t\t\t\t// WebGL port note: Added gamma correction\n\t\t\t\tC.xyz = pow(C.xyz, vec3(2.2));\n\t\t\t\tCop.xyz = pow(Cop.xyz, vec3(2.2));\n\t\t\t\tvec4 mixed = mix(C, Cop, s);\n\t\t\t\tmixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));\n\n\t\t\t\treturn mixed;\n\t\t\t}\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tgl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );\n\n\t\t}"};t.SMAABlendShader=r,t.SMAAEdgesShader=n,t.SMAAWeightsShader=o,Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).THREE=t["THREE-STD"]||{},t.THREE)}();
