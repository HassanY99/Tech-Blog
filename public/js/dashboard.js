document.querySelector('.new-post').addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const message = document.getElementById("message");

  if(title && body) {
    const response = await fetch('/api/post', {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      document.querySelector(".new-post").reset();
    }
  } else {
    message.innerText = "Please fill out all input fields";
    message.style.color = "red";
    setTimeout(function(){
      message.style.color = "black";
      message.innerText = '';
    }, 3000);
  }
})

const deletePost = () => {
  return async function () {
    const id = this.dataset.post
    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace('/dashboard')
    }
  }
}

const updateform = () => {
  return async function (event) {
    event.preventDefault(); 

    const id = this.dataset.post
    console.dir(this);
    console.log(id)
    const title = this[0].value.trim();
    const body = this[1].value.trim();
    const message = document.getElementById("update-message");

    if(title && body) {
      const response = await fetch(`/api/post/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, body }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (response.ok) {
        document.location.replace('/dashboard')
      }
    } else {
      message.innerText = "Please fill out all input fields";
      message.style.color = "red";
      setTimeout(function(){
        message.style.color = "black";
        message.innerText = '';
      }, 3000);
    }

  }
}

const updatePost = () => {
  return function () {
    const formEl = this.parentElement.nextElementSibling;
    const formState = formEl.style.display;
    if (formState === "block") {
      formEl.style.display = "none"
      this.innerText = "Update"
    } else {
      formEl.style.display = "block"
      this.innerText = "Minimize"
    }
  }
}

const delbuttons = document.querySelectorAll('#delete');
const upbuttons = document.querySelectorAll('#update');
const upform = document.querySelectorAll('.update-form');

for (let i = 0; i < delbuttons.length; i++) {
  delbuttons[i].addEventListener("click", deletePost())
}

for (let i = 0; i < upbuttons.length; i++) {
  upbuttons[i].addEventListener("click", updatePost())
}

for (let i = 0; i < upform.length; i++) {
  upform[i].addEventListener("submit", updateform())
}