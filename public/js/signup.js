/**
 * @function signupFormHandler
 * @param {*} event 
 * 
 * Handles the event the user is signing up to create an account
 */
async function signupFormHandler(event) {
    event.preventDefault();
  
	// Collect username, email, and password from signup form fields
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
	// Verify the values are not empty
    if (username && email && password) {
		// Call the userRoutes.js POST api route to create a user and log them in
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: { 'Content-Type': 'application/json' },
   		});
  
		if (response.ok) {
			document.location.replace('/profile');
		} else {
			alert('Failed to sign up.');
		}
    } else {
		document.location.reload();
		alert("Please enter username, password, and email.");
	}
};

/* Add event listener */
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
