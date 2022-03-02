( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ), require( './NURBSUtils.js' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three', './NURBSUtils' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE, global.THREE ) );

	} )( this, ( function ( exports, three, NURBSUtils ) {

		'use strict';

		function _interopNamespace( e ) {

			if ( e && e.__esModule ) return e;
			var n = Object.create( null );
			if ( e ) {

				Object.keys( e ).forEach( function ( k ) {

					if ( k !== 'default' ) {

						var d = Object.getOwnPropertyDescriptor( e, k );
						Object.defineProperty( n, k, d.get ? d : {
							enumerable: true,
							get: function () {

								return e[ k ];

							}
						} );

					}

				} );

			}

			n[ 'default' ] = e;
			return Object.freeze( n );

		}

		var NURBSUtils__namespace = /*#__PURE__*/_interopNamespace( NURBSUtils );

		/**
	 * NURBS curve object
	 *
	 * Derives from Curve, overriding getPoint and getTangent.
	 *
	 * Implementation is based on (x, y [, z=0 [, w=1]]) control points with w=weight.
	 *
	 **/

		class NURBSCurve extends three.Curve {

	  constructor( degree, knots
	  /* array of reals */
	  , controlPoints
	  /* array of Vector(2|3|4) */
	  , startKnot
	  /* index in knots */
	  , endKnot
	  /* index in knots */
	  ) {

	    super();
	    this.degree = degree;
	    this.knots = knots;
	    this.controlPoints = []; // Used by periodic NURBS to remove hidden spans

	    this.startKnot = startKnot || 0;
	    this.endKnot = endKnot || this.knots.length - 1;

	    for ( let i = 0; i < controlPoints.length; ++ i ) {

	      // ensure Vector4 for control points
	      const point = controlPoints[ i ];
	      this.controlPoints[ i ] = new three.Vector4( point.x, point.y, point.z, point.w );

				}

			}

	  getPoint( t, optionalTarget = new three.Vector3() ) {

	    const point = optionalTarget;
	    const u = this.knots[ this.startKnot ] + t * ( this.knots[ this.endKnot ] - this.knots[ this.startKnot ] ); // linear mapping t->u
	    // following results in (wx, wy, wz, w) homogeneous point

	    const hpoint = NURBSUtils__namespace.calcBSplinePoint( this.degree, this.knots, this.controlPoints, u );

	    if ( hpoint.w !== 1.0 ) {

	      // project to 3D space: (wx, wy, wz, w) -> (x, y, z, 1)
	      hpoint.divideScalar( hpoint.w );

				}

	    return point.set( hpoint.x, hpoint.y, hpoint.z );

			}

	  getTangent( t, optionalTarget = new three.Vector3() ) {

	    const tangent = optionalTarget;
	    const u = this.knots[ 0 ] + t * ( this.knots[ this.knots.length - 1 ] - this.knots[ 0 ] );
	    const ders = NURBSUtils__namespace.calcNURBSDerivatives( this.degree, this.knots, this.controlPoints, u, 1 );
	    tangent.copy( ders[ 1 ] ).normalize();
	    return tangent;

			}

		}

		exports.NURBSCurve = NURBSCurve;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
