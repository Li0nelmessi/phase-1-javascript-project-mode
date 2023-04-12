fetch('http://localhost:3000/football')
			.then(response => response.json())
			.then(data => newComment(data))

// Function to handle form submission
function submitForm(event) {event.preventDefault(); // Prevent form from submitting
  const form = event.target;
  const commentInput = form.querySelector("#comments");
  const comment = commentInput.value;
  const matchName = form.parentNode.querySelector("#name").textContent;

  // Send comment to server-side endpoint
  fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ matchName, comment })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to submit comment");
    }
  })
  .then(data => {
    // Add comment to the page
    const commentList = form.parentNode.querySelector("#comment-list");
    const newComment = document.createElement("li");
    newComment.textContent = data.comment;
    commentList.appendChild(newComment);
    commentInput.value = ""; // Clear comment input field
  })
  .catch(error => console.error(error));
}

// Function to handle form submission for deleting comments
function deleteComment(event) {
  event.preventDefault();
  const form = event.target;
  const commentListItem = form.parentNode;
  const comment = commentListItem.textContent.trim();

  // Send comment to server-side endpoint for deletion
  fetch("/comments", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comment })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to delete comment");
    }
  })
  .then(data => {
    // Remove comment from the page
    commentListItem.remove();
  })
  .catch(error => console.error(error));
}

// Add event listeners to submit form and delete comment forms
const submitForms = document.querySelectorAll("#submit-form");
submitForms.forEach(form => {
  form.addEventListener("submit", submitForm);
});

const deleteForms = document.querySelectorAll("#submit-form input[type='submit'][value='Delete Comment']");
deleteForms.forEach(form => {
  form.addEventListener("click", deleteComment);
});
      
