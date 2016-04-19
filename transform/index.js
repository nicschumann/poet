var Firebase = require('firebase');


module.exports = function( retrieve, options ) {

	var memory = new Firebase( options.firebase );

	var persist = require('./persist')( memory );

	var resume = require('./resume')( persist );

	return {
		/**
		 * [basepoint description]
		 * @param  {[type]}   id   [description]
		 * @param  {Function} done [description]
		 * @return {[type]}        [description]
		 */
		basepoint: function( basepoint_id, done ) {

			console.log( basepoint_id );

			retrieve.validate( basepoint_id, function( err, valid ) {

				if ( err ) { done( err ); }

				persist.compositionExists( basepoint_id, function( exists, composition_id ) {

					if ( exists ) {

						console.log( exists );
						console.log( composition_id );

						persist.retrieveComposition( composition_id, function( composition ) {

							done( null, composition_id, composition );

						});

					} else {

						var initialState = {state:'empty'};

						persist.createComposition( basepoint_id, initialState, function( err, id ) {

							done( err, id, initialState );

						});

					}

				});

			});
		},

		/**
		 * [composition description]
		 * @param  {[type]} id           [description]
		 * @param  {[type]} continuation [description]
		 * @return {[type]}              [description]
		 */
		composition: function( id, continuation ) {

		}

	};

};