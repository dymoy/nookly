/**
 * @function updateListingFormHandler
 * @param {*} event 
 * 
 * Handles when the update listing button in updateListing.hbs is clicked
 */
async function updateListingFormHandler(event) {
	event.preventDefault();

    console.log("Entered update form handler...");

    // Retrieve the post ID from window
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  
    // Retrieve the file from the input field 
    const inputFile = document.getElementById('listing-img');
    var img_file_name;

    // Check if a new file was uploaded 
    if (inputFile.value) {
        // Create a FormData object to work with multer 
        const formData = new FormData();
        formData.append("listing-img", inputFile.files[0]);
    
        // Call the multer post method to save the file in the public/uploads directory 
        const multer_res = await fetch('/upload', {
            method: 'POST',
            body: formData,
            enctype: 'multipart/form-data',
        });

        // If successful, assign the file name to img_file_name
        if (multer_res.ok) {
            var result = await multer_res.json();
            img_file_name = result.filename;
        } else {
            alert(multer_res.statusText);
        }
    }

    // Get values from input fields 
    const title = document.getElementById('listing-title').value;
    const price = document.getElementById('listing-price').value;
    const category = document.getElementById('listing-category').value;
    const condition = document.getElementById('listing-condition').value;
    const content = document.getElementById('listing-content').value;

    // Call the listingRoutes PUT api route to update the listing in the database by id
    const listing_res = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            price, 
            category,
            condition,
            content,
            img_file_name
        }),
        headers: {'Content-Type': 'application/json'}
    });

    // Redirect the user back to the profile page when the listing has been created
    if(listing_res.ok) {
        document.location.replace('/profile');
    } else {
        alert(listing_res.statusText);
    }
}
  
document.querySelector('.update-listing-form').addEventListener('submit', updateListingFormHandler);
