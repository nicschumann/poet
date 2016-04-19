
var key 		= require('.keys.json').key;
var options 	= require('config.json');
var server		= require('./router')( key, options );


server(  );