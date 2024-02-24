/**
 * @function newListingFormHandler
 * @param {*} event
 *
 * Handles the event the user is adding a new listing in addListing.handlebars
 */
async function newListingFormHandler(event) {
  	event.preventDefault();

	// Retrieve the file from the input field
	const inputFile = document.getElementById("listing-img");
	var img_file_name;

	if (inputFile) {
		// Create a FormData object to work with multer
		const formData = new FormData();
		formData.append("listing-img", inputFile.files[0]);

		// Call the multer post method to save the file in the public/uploads directory
		const multer_res = await fetch("/upload", {
			method: "POST",
			body: formData,
			enctype: "multipart/form-data",
		});

		// If successful, assign the file name to img_file_name
		if (multer_res.ok) {
			var result = await multer_res.json();
			img_file_name = result.filename;
		} else {
			alert(multer_res.statusText);
		}
	} else {
		// Reload the page and notify the user the input fields must not be empty
		document.location.reload();
		alert("Please add an image file before attempting to create new listing.");
	}

	// Get values from input fields
	const title = document.getElementById("listing-title").value;
	const price = document.getElementById("listing-price").value;
	const category = document.getElementById("listing-category").value;
	const condition = document.getElementById("listing-condition").value;
	const content = document.getElementById("listing-content").value;

	// Check that all fields were not empty
	if (title && price && category && condition && content) {
		// Call the listingRoutes.js POST api route to create a new listing in the database
		const listing_res = await fetch(`/api/listings`, {
			method: "POST",
			body: JSON.stringify({
				title,
				price,
				category,
				condition,
				content,
				img_file_name,
			}),
			headers: { "Content-Type": "application/json" },
		});

		// Redirect the user back to the profile page when the listing has been created
		if (listing_res.ok) {
			document.location.replace("/profile");
		} else {
			alert(listing_res.statusText);
		}
	} else {
		// Reload the page and notify the user the input fields must not be empty
		document.location.reload();
		alert(
			"Please fill all input fields before attempting to create new listing.",
		);
	}
}

document.querySelector(".new-listing-form").addEventListener("submit", newListingFormHandler);
