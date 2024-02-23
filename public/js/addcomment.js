// Add Comments
// Calls POST fetch to commentRoutes API route to add a comment to a listing

async function addComment(event) {
  event.preventDefault();

  // Get the value of the comment input
  const comment = document.getElementById("comment-content").value;

  // Retrieve the post ID from window
  const listing_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
    ];
  // If the comment is not empty Fetch POST to add the comment to commentRoutes API
  if (comment) {
    const response = await fetch("/api/commentRoutes", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, listing_id }),
    }).then(() => {
      document.location.reload();
    });
  } else {
    alert("Please enter a comment before submitting");
  }
}

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", addComment);
