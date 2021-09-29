document.querySelector(".register-form").addEventListener("submit", async (event) => {
  event.preventDefault();

	const username = document.querySelector("#username").value.trim();
	const email = document.querySelector("#email").value.trim();
	const password = document.querySelector("#password").value.trim();
	const message = document.getElementById("register-message");
  const body = { username, email, password };

	if (username && email && password) {
			const response = await fetch('/api/user/register', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			message.innerText = "Invalid Inputs! Try again";
			message.style.color = "red";
			setTimeout(function(){
				message.style.color = "black";
    		message.innerText = 'Must be 8+ Characters in Length';
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