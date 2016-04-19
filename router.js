var express 	= require('express');
var api 		= require('youtube-api');

/**
 * [exports description]
 * @param  {[type]} key     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function( key, options ) {

	var app = express();






	return function( continuation ) {

		app.listen( process.ENV.PORT || options.port, continuation );

	};
};