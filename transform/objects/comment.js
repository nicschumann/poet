
/**
 * given a raw youtube#comment object off of the API,
 * return a structured internal representation for that content.
 * 
 * @param  {youtube#comment} raw raw input off of the youtube DATA API
 * @return {Comment}     a structured comment object for internal use
 */
module.exports = function( raw ) {

	return {

		type: "text",

		id: raw.id,

		video_id: raw.snippet.videoId,

		author_id: raw.snippet.authorChannelId.value,

		author: raw.snippet.authorDisplayName,

		text: raw.snippet.textDisplay,

		likes: raw.snippet.likeCount,

		time: {
			published: raw.snippet.publishedAt,

			updated: raw.snippet.updatedAt
		}

	};

};