
/**
 * [exports description]
 * @param  {youtube#commentThread} raw a raw API response from youtube
 * @return {[type]}     the internal, serializeable thread representation
 */

var comment = require('./comment');

module.exports = function( raw ) {

	var replies = [];

	if ( typeof raw.replies !== "undefined" ) {
		replies = raw.replies.comments;
	}

	return {

		type: 'thread',

		id: raw.id,

		basepoint_id: raw.snippet.videoId,

		length: raw.snippet.totalReplyCount + 1,

		comments: [ comment( raw.snippet.topLevelComment ) ].concat( ((raw.replies && raw.replies.comments) || []).map( comment ) )

	};

};