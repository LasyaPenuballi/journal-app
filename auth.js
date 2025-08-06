// auth.js

// Change these to whatever username and password you want
const correctUsername = "lasya";
const correctPassword = "28072016";

const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === correctUsername && password === correctPassword) {
    // Save login status
    localStorage.setItem("isLoggedIn", "true");
    // Redirect to the journal
    window.location.href = "index.html";
  } else {
    errorMsg.textContent = "Invalid username or password.";
  }
});
