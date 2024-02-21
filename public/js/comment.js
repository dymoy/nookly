// Add Comments
// Calls POST fetch to commentRoutes API route to add a comment to a listing

// document.getElementById('add-comment').addEventListener('click', addComment);
function addComment() {
    const content = document.getElementById('comment-content').value;
    const listingId = document.getElementById('listing-id').value;

    const data = {
        content,
        listingId
    }

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
        document.getElementById('comment-content').value = '';
    })
}

module.exports = addComment;