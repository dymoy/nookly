/**
 * @function deleteListingFormHandler
 * @param {*} event 
 * 
 * Handles the event the user is deleting a listing in updateListing.hbs
 */
async function deleteListingFormHandler(event) {
    event.preventDefault();
    
    // Retrieve id from window
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Call the listingRoute DELETE api route to delete the listing by id
    const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id
        }),
        headers: {'Content-Type': 'application/json'}
    });
    
    // Redirect the user back to profile once the listing has been deleted 
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
  }
  
  document.querySelector('.delete-listing-btn').addEventListener('click', deleteListingFormHandler);
  