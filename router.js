var express 	= require('express');
var util 		= require('util');
/**
 * [exports description]
 * @param  {[type]} key     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function( keys, options ) {

	var retrieve = require('./retrieve/youtube')( keys, options );
	var transform = require('./transform')( retrieve, options );
	var app = express();


	/**
	 * In the terminology of the system, a basepoint is a seed, or 
	 * starting point for a poetic composition, a kind of initial value,
	 * so to speak. For the time being, we're focusing on YouTube,
	 * and the basepoints are specific YouTube videos, represented by
	 * 	
	 * 
	 */
	app.get('/basepoints/:id', function( req, res ) {

		transform.basepoint( req.params.id, function( err, id, state ) {

			res.setHeader('Content-Type', 'application/json');

			if ( err ) { 

				res.send( util.inspect( err, false, null ) ); 

			} else {

				 res.send( util.inspect( state, false, null ) ); 

			}

		});
	
	});

	//app.get('/compositions/:id', /*...*/ );




	return function( continuation ) {

		app.listen( options.port, continuation );

	};
};