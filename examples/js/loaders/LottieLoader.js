( function () {

	( function ( global, factory ) {

		typeof exports === 'object' && typeof module !== 'undefined' ? factory( exports, require( 'three' ) ) :
			typeof define === 'function' && define.amd ? define( [ 'exports', 'three' ], factory ) :
				( global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory( global.THREE = global.THREE || {}, global.THREE ) );

	} )( this, ( function ( exports, three ) {

		'use strict';

		class LottieLoader extends three.Loader {

	  setQuality( value ) {

	    this._quality = value;

			}

	  load( url, onLoad, onProgress, onError ) {

	    const quality = this._quality || 1;
	    const texture = new three.CanvasTexture();
	    texture.minFilter = three.NearestFilter;
	    const loader = new three.FileLoader( this.manager );
	    loader.setPath( this.path );
	    loader.setWithCredentials( this.withCredentials );
	    loader.load( url, function ( text ) {

	      const data = JSON.parse( text ); // bodymoving uses container.offetWidth and offsetHeight
	      // to define width/height

	      const container = document.createElement( 'div' );
	      container.style.width = data.w + 'px';
	      container.style.height = data.h + 'px';
	      document.body.appendChild( container );
	      const animation = bodymovin.loadAnimation( {
	        container: container,
	        animType: 'canvas',
	        loop: true,
	        autoplay: true,
	        animationData: data,
	        rendererSettings: {
	          dpr: quality
	        }
	      } );
	      texture.animation = animation;
	      texture.image = animation.container;
	      animation.addEventListener( 'enterFrame', function () {

	        texture.needsUpdate = true;

					} );
	      container.style.display = 'none';

	      if ( onLoad !== undefined ) {

	        onLoad( texture );

					}

				}, onProgress, onError );
	    return texture;

			}

		}

		exports.LottieLoader = LottieLoader;

		Object.defineProperty( exports, '__esModule', { value: true } );

	} ) );

} )();
