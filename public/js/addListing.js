/**
 * @function newListingFormHandler
 * @param {*} event 
 * 
 * Handles the event the user is adding a new listing in addListing.handlebars
 */
async function newListingFormHandler(event) {
	event.preventDefault();
  
    // Get values from input fields 
    const title = document.getElementById('listing-title').value;
    const price = document.getElementById('listing-price').value;
    const category = document.getElementById('listing-category').value;
    const condition = document.getElementById('listing-condition').value;
    const content = document.getElementById('listing-content').value;
  
    // Check that all fields were not empty 
    if (title && price && category && condition && content) {
        // Call the listingRoutes.js POST api route to create a new listing in the database
        const response = await fetch(`/api/listings`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                price, 
                category,
                condition,
                content
                // TODO: Add image file when creating Listing instance
            }),
            headers: {'Content-Type': 'application/json'}
        });
      
        // Redirect the user back to the profile page when the post has been created
        if (response.ok) {
              document.location.replace('/profile');
        } else {
              alert(response.statusText);
        }
    } else {
        // Reload the page and notify the user the input fields must not be empty
        document.location.reload();
        alert('Please fill all input fields before attempting to create new listing.');
    }
}
  
document.querySelector('.new-listing-form').addEventListener('submit', newListingFormHandler);
