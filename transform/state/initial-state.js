/**
 * given a raw channel-dump for a given basepoint id,
 * This module constructs an initial state
 * 
 * @param  {[yT CommentThread API Response]} data [description]
 * @return {State}    the newly constructed initial state for this composition  
 */

var thread = require('../objects/thread');

module.exports = function( data ) {

	//return data;

	return {

		type: "alternatives",

		alternatives: data.items.map( thread )

	};

};