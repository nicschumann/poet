module.exports = function( youtube ) {
	return function( id, continuation ) {

		if ( /[a-zA-Z0-9_-]{11}/.test(id) ) {

			youtube.videos.list({
				part: 'id',
				id: id
			}, function( err, data ) {
				if ( err ) { 
					continuation( {
						'success': false,
						'error': false,
						'friendly': 'Looks like something went wrong with the validation request!',
						'unfriendly': err.message			
					}, false); 
				}  

				if ( data.pageInfo.totalResults == 1 ) {

					continuation( null, true );

				} else {

					continuation( {
						'success': false,
						'error': false,
						'friendly': "It doesn\'t look like any video with that ID exists."
					}, false);

				}

			});

		} else {

			continuation({
				'success': false,
				'error': false,
				'friendly': "That doesn't look like a YouTube id."
			}, false);

		}

	};
};