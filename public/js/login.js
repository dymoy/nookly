/**
 * @function loginFormHandler
 * @param {*} event 
 * 
 * Handles the event the user is logging in with their credentials
 */
async function loginFormHandler(event) {
    event.preventDefault();

    // Collect email and password values from the login form fields
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
	// Verify that email and password is not empty
    if (email && password) {
      	// Call the userRoute.js POST /login API route to validate credentials and start the session
      	const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
    	});

		// If successful, redirect the browser to the profile page
		if (response.ok) {
			document.location.replace('/profile');
		} else {
			alert('Failed to login. The email or password entered is incorrect or does not exist.');
		}
	} else {
		document.location.reload();
		alert("Please enter username and password to log into your account.");
	}
};
  
/* Add event listener */
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  