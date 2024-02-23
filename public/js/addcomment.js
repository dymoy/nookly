/**
 * @function addCommentFormHandler
 * @param {*} event 
 * 
 * Handles the event that the user is adding a new comment to a listing
 */
async function addCommentFormHandler(event) {
	event.preventDefault();

	// Retrieve the comment text 
	const content = document.getElementById('comment-content').value;

	// Retrieve listing_id from window 
	const listing_id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];

	// Validate that inputted comment is not empty 
	if (content) {
		// Call commentRoutes.js POST api route to create a new comment in the database
		const response = await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				content,
				listing_id
			}),
			headers: {'Content-Type': 'application/json'}
		});
	
		if (response.ok) {
			// If the POST request was successful, reload the page to render the new added comment
			document.location.reload();
		} else {
			alert(response.statusText);
		}
	}
}

document.querySelector(".new-comment-form").addEventListener("submit", addCommentFormHandler);
