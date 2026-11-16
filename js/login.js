var USERS = {
  admin: {
    password: "admin123",
    role: "admin",
    page: "pages/admin.html"
  },
  cook: {
    password: "cook123",
    role: "cook",
    page: "pages/cook.html"
  },
  health: {
    password: "health123",
    role: "health",
    page: "pages/health.html"
  },
  student: {
    password: "student123",
    role: "student",
    page: "pages/student.html"
  }
};

var loginForm = document.getElementById("loginForm");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var usernameError = document.getElementById("usernameError");
var passwordError = document.getElementById("passwordError");
var formError = document.getElementById("formError");
var notice = document.getElementById("notice");
var remember = document.getElementById("remember");

function clearMessages() {
  usernameError.textContent = "";
  passwordError.textContent = "";
  formError.textContent = "";
  notice.textContent = "";

  formError.hidden = true;
  notice.hidden = true;

  usernameInput.parentElement.classList.remove("invalid");
  passwordInput.parentElement.classList.remove("invalid");
}

function showFieldError(input, errorElement, message) {
  errorElement.textContent = message;
  input.parentElement.classList.add("invalid");
}

try {
  var savedUsername = localStorage.getItem("rememberedUser");

  if (savedUsername) {
    usernameInput.value = savedUsername;
    remember.checked = true;
  }
} catch (error) {
  
}


document.getElementById("togglePw").addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    this.setAttribute("aria-label", "Hide password");
  } else {
    passwordInput.type = "password";
    this.setAttribute("aria-label", "Show password");
  }
});


document.querySelectorAll(".chips button").forEach(function (button) {
  button.addEventListener("click", function () {
    clearMessages();
    usernameInput.value = button.getAttribute("data-user");
    passwordInput.value = button.getAttribute("data-pass");
  });
});


document.getElementById("forgotLink").addEventListener("click", function (event) {
  event.preventDefault();
  clearMessages();

  if (usernameInput.value.trim() === "") {
    showFieldError(
      usernameInput,
      usernameError,
      "Enter your username first."
    );
    return;
  }

  notice.textContent = "If the account exists, a reset link has been sent.";
  notice.hidden = false;
});


loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearMessages();

  var username = usernameInput.value.trim().toLowerCase();
  var password = passwordInput.value;
  var isValid = true;

  if (username === "") {
    showFieldError(usernameInput, usernameError, "Enter your username.");
    isValid = false;
  }

  if (password === "") {
    showFieldError(passwordInput, passwordError, "Enter your password.");
    isValid = false;
  } else if (password.length < 6) {
    showFieldError(
      passwordInput,
      passwordError,
      "Password must be at least 6 characters."
    );
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  var user = USERS[username];

  if (!user || user.password !== password) {
    formError.textContent = "Username or password is incorrect.";
    formError.hidden = false;
    return;
  }

  try {
    sessionStorage.setItem(
      "session",
      JSON.stringify({
        username: username,
        role: user.role
      })
    );

    if (remember.checked) {
      localStorage.setItem("rememberedUser", username);
    } else {
      localStorage.removeItem("rememberedUser");
    }
  } catch (error) {
    
  }

  window.location.href = user.page;
});