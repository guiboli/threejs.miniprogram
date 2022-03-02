( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ), require( './ColladaLoader.js' ), require( '../libs/fflate.module.js' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three', './ColladaLoader', '../libs/fflate.module' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE ) );

	} )( this, ( function ( exports, three, ColladaLoader_js, fflate ) {

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

		var fflate__namespace = /*#__PURE__*/_interopNamespace( fflate );

		class KMZLoader extends three.Loader {

	  constructor( manager ) {

	    super( manager );

			}

	  load( url, onLoad, onProgress, onError ) {

	    const scope = this;
	    const loader = new three.FileLoader( scope.manager );
	    loader.setPath( scope.path );
	    loader.setResponseType( 'arraybuffer' );
	    loader.setRequestHeader( scope.requestHeader );
	    loader.setWithCredentials( scope.withCredentials );
	    loader.load( url, function ( text ) {

	      try {

	        onLoad( scope.parse( text ) );

					} catch ( e ) {

	        if ( onError ) {

	          onError( e );

						} else {

	          console.error( e );

						}

	        scope.manager.itemError( url );

					}

				}, onProgress, onError );

			}

	  parse( data ) {

	    function findFile( url ) {

	      for ( const path in zip ) {

	        if ( path.slice( - url.length ) === url ) {

	          return zip[ path ];

						}

					}

				}

	    const manager = new three.LoadingManager();
	    manager.setURLModifier( function ( url ) {

	      const image = findFile( url );

	      if ( image ) {

	        console.log( 'Loading', url );
	        const blob = new Blob( [ image.buffer ], {
	          type: 'application/octet-stream'
	        } );
	        return URL.createObjectURL( blob );

					}

	      return url;

				} ); //

	    const zip = fflate__namespace.unzipSync( new Uint8Array( data ) ); // eslint-disable-line no-undef

	    if ( zip[ 'doc.kml' ] ) {

	      const xml = new DOMParser().parseFromString( fflate__namespace.strFromU8( zip[ 'doc.kml' ] ), 'application/xml' ); // eslint-disable-line no-undef

	      const model = xml.querySelector( 'Placemark Model Link href' );

	      if ( model ) {

	        const loader = new ColladaLoader_js.ColladaLoader( manager );
	        return loader.parse( fflate__namespace.strFromU8( zip[ model.textContent ] ) ); // eslint-disable-line no-undef

					}

				} else {

	      console.warn( 'KMZLoader: Missing doc.kml file.' );

	      for ( const path in zip ) {

	        const extension = path.split( '.' ).pop().toLowerCase();

	        if ( extension === 'dae' ) {

	          const loader = new ColladaLoader_js.ColladaLoader( manager );
	          return loader.parse( fflate__namespace.strFromU8( zip[ path ] ) ); // eslint-disable-line no-undef

						}

					}

				}

	    console.error( 'KMZLoader: Couldn\'t find .dae file.' );
	    return {
	      scene: new three.Group()
	    };

			}

		}

		exports.KMZLoader = KMZLoader;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
