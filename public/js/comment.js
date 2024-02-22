// Add Comments
// Calls POST fetch to commentRoutes API route to add a comment to a listing

async function addComment(event) {
  event.preventDefault();

  // Get the value of the comment input
  const comment = document.querySelector("#comment-content").value.trim();

  // If the comment is not empty Fetch POST to add the comment to commentRoutes API
  if (comment) {
    const response = await fetch("/api/commentRoutes", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    }).then(() => {
      document.location.reload();
    });
  } else {
    alert("Please enter a comment before submitting");
  }
}

document.querySelector("#add-comment").addEventListener("submit", addComment);
