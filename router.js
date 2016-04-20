"use strict";


var express 		= require('express');
var util 		= require('util');
var swig 		= require('swig');
var path 		= require('path');
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

	app.engine('html', swig.renderFile);
	app.set('view engine', 'html');
	app.set('views', path.join(__dirname, 'represent', 'web', 'templates') );

	app.use('/static', express.static( path.join( __dirname, 'represent', 'web', 'static') ) );

	app.set('view cache', !options.debug );

	swig.setDefaults({cache: !options.debug });

	/**
	 * In the terminology of the system, a basepoint is a seed, or 
	 * starting point for a poetic composition, a kind of initial value,
	 * so to speak. For the time being, we're focusing on YouTube,
	 * and the basepoints are specific YouTube videos, represented by identifiers
	 */
	app.get('/basepoints/:id', function( req, res ) {

		transform.basepoint( req.params.id, function( err, id, state ) {

			if ( err ) { 

				res.render('error.html', {
					message: err.friendly,
					debug: options.debug
				});

			} else {

				res.render('composition.html', {
					id: id,
					state: state,
					debug: options.debug
				});

			}

		});
	
	});

	/**
	 * This endpoint works exactly as above, but renders
	 * the JSON underlying the rendering, instead of the 
	 * human-readable form.
	 */
	app.get('/basepoints/:id/json', function( req, res ) {

		transform.basepoint( req.params.id, function( err, id, state ) {

			if ( err ) { 

				res.render('error.html', {
					message: err.friendly,
					debug: options.debug
				});

			} else {

				res.setHeader('Content-Type', 'application/json' );
				res.send( util.inspect( state, false, null ) );

			}

		});
	
	});


	return function( continuation ) {

		app.listen( options.port, continuation );

	};
};