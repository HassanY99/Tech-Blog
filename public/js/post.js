document.querySelector(".comment-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const comment = document.getElementById("comment").value.trim();
  const post_id = document.querySelector(".comment-form").dataset.post;
  console.log(post_id)
  
  if (comment) {
    const response = await fetch('/api/comment', {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
			headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      document.querySelector(".comment-form").requestFullscreen();
    }
  }
});