/**
 * @function logout
 * Destroys the current session 
 */
async function logout() {
    // Calls userRoutes POST /logout API route to destroy the session 
    const response = await fetch('/api/users/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
    });
  
    // Redirect the user to the home page 
    if (response.ok) {
      	document.location.replace('/');
    } else {
      	alert(response.statusText);
    }
}
  
document.getElementById('logout').addEventListener('click', logout);
