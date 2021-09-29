document.querySelector(".login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("login-message");

  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      message.innerText = "Incorrect email or password";
      message.style.color = "red";
      setTimeout(() => {
        message.innerText = "Must be 8+ Characters in Length";
        message.style.color = "black";
      }, 3000);
    }
  } else {
    message.innerText = "Please fill out all input fields";
    message.style.color = "red";
    setTimeout(function(){
      message.style.color = "black";
      message.innerText = 'Must be 8+ Characters in Length';
    }, 3000);
  }
})