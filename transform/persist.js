var uuid = require('node-uuid');

module.exports = function( firebase ) {

	var basepoints = firebase.child('basepoints');

	var compositions = firebase.child('compositions');

	return {
		/**
		 * Checks to see if the machine is already working on 
		 * a composition at a given basepoint.
		 * 
		 * @param  {String}   basepoint_id [description]
		 * @param  {Function} next     	continuation called with (Error, Boolean).
		 */
		compositionExists: function( basepoint_id, next ) {
			basepoints.child( basepoint_id ).once('value', function( snapshot ) {

				next( snapshot.exists(), snapshot.val() );				

			});
		},

		/**
		 * Retreives the composition for a given ID
		 * 
		 * @param  {String}   id       	the composition ID
		 * @param  {Function} next     	continuation called with Error if relevant
		 */
		retrieveComposition: function( id, next ) {

			compositions.child( id ).once( 'value', function( snapshot ) {

				next( snapshot.val() );

			});

		},

		/**
		 * Transitions the composition into a new state.
		 * It is the responsibility of the client to track any persistants
		 * or invariants across the state.
		 * 
		 * @param  {String}   id       	the composition ID
		 * @param  {State}   newState 	the Updated State Object
		 * @param  {Function} next     	continuation called with Error if relevant
		 */
		updateComposition: function( id, newState, next ) {

			compositions.child( id ).update( newState, function( err ) {

				if ( err ) { next( err ); }

				next();

			});

		},

		/**
		 * creates a composition reference in the DB corresponding
		 * to a given basepoint ID.
		 * 
		 * @param  {String}   id           Youtube Identifier
		 * @param  {State}   initialState State Object to act as initial
		 * @param  {Function} next         a continuation, which is called with (Error-State, Composition ID)
		 */
		createComposition: function( id, initialState, next ) {

			var newComposition = compositions.push( initialState, function( err ) {

				if ( err ) { next( err ); }

				basepoints.child( id ).set( newComposition.key(), function( err ) {

					if ( err ) { next( err ); }

					next( null, newComposition.key() );

				});

			});


		}
	};

};