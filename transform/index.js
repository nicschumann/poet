var Firebase = require('firebase');


module.exports = function( retrieve, options ) {

	var memory = new Firebase( options.firebase );

	var persist = require('./persist')( memory );

	var resume = require('./resume')( persist );

	var state = {
		initial: require('./state/initial-state')
	}

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

						persist.retrieveComposition( composition_id, function( composition ) {

							done( null, composition_id, composition );

						});

					} else {

						retrieve.basepoint( basepoint_id, function( err, data ) {

							if ( err ) { done( err ); }

							var initialState = state.initial( data );

							persist.createComposition( basepoint_id, initialState, function( err, id ) {

								done( err, id, initialState );

							});

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