var youtube = require('youtube-api');

var validate = require('./validate-video-id')( youtube );

/**
 * [exports description]
 * @param  {[type]} keys    [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function( keys, options ) {

	youtube.authenticate({
		type: "key",
		key: keys.youtube.key
	});

	return {
		basepoint: function( id, continuation ) {

			validate( id, function( err ) {

				if ( err ) { 

					continuation( err ); 

				} else {

					youtube.commentThreads.list(

						{
							part: "id,replies,snippet",
							videoId: id,
							textFormat: "plainText"
						}, 
						continuation 

					);

				}

			});

		},
		validate: validate

	};

};