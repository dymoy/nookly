// Add Comments
// Calls POST fetch to commentRoutes API route to add a comment to a listing

// document.getElementById('add-comment').addEventListener('click', addComment);
function addComment() {
    const content = document.querySelector('#comment-content').value;
    const listingId = document.querySelector('#listing-id').value;

    fetch('/api/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        document.querySelector('#comment-content').value = '';
    })
}

module.exports = addComment;