const renderComments = () => {
  return function () {
    console.dir(this)
    const postState = this.nextElementSibling.style.display
    if (postState === "none") {
      this.nextElementSibling.style.display = "block"
      this.innerText = "Minimize"
    } else {
      this.nextElementSibling.style.display = "none"
      this.innerText = "View Comments"
    }
  }
}

const addComment = () => {
  return async function (event) {
    event.preventDefault();
  
    const body = this.children[1].value.trim();
    const post_id = this.dataset.post
    
    if (body) {
      const response = await fetch('/api/comment', {
        method: "POST",
        body: JSON.stringify({ body, post_id }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace(`/`);
      } else {
        document.querySelector(".comment-form").reset();
      }
    }
  }
}
 
const mini = document.querySelectorAll(".minimize");
const commentForm = document.querySelectorAll('.comment-form');

for (let i = 0; i < mini.length; i++) {
  mini[i].addEventListener("click", renderComments())
}

for (let i = 0; i < commentForm.length; i++) {
  commentForm[i].addEventListener("submit", addComment())
}