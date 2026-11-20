var USERS = 
{
  admin: { password: "admin123", role: "admin", page: "pages/admin.html"},
  cook: { password: "cook123", role: "cook", page: "pages/cook.html"},
  health: { password: "health123", role: "health", page: "pages/health-dashboard.html"},
  student: { password: "student123", role: "student", page: "pages/student.html"}
};

var loginForm = document.getElementById("loginForm");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var usernameError = document.getElementById("usernameError");
var passwordError = document.getElementById("passwordError");
var notice = document.getElementById("notice");
var remember = document.getElementById("remember");

function clearMessages()
{
    usernameError.textContent = "";
    passwordError.textContent = "";
    notice.textContent = "";
    notice.hidden = true;

    usernameInput.parentElement.classList.remove("invalid");
    passwordInput.parentElement.classList.remove("invalid");
}


var Username = localStorage.getItem("rememberedUser");

if (Username)
{
    usernameInput.value = Username;
    remember.checked = true;
}

document.getElementById("eye").addEventListener("click", function ()
{
    if (passwordInput.type === "password")
    {
        passwordInput.type = "text";
        this.setAttribute("aria-label", "Hide password");
    }
    else
    {
        passwordInput.type = "password";
        this.setAttribute("aria-label", "Show password");
    }
});

var demoButtons = document.querySelectorAll(".chips button");

for (var i = 0; i < demoButtons.length; i++)
{
    demoButtons[i].addEventListener("click", function ()
    {
        clearMessages();

        usernameInput.value = this.getAttribute("data-user");
        passwordInput.value = this.getAttribute("data-pass");
    });
}

document.getElementById("forgotLink").addEventListener("click", function (event)
{
    event.preventDefault();
    alert("Password reset feature is not available yet.");
});

loginForm.addEventListener("submit", function (event)
{
    event.preventDefault();
    clearMessages();

    var username = usernameInput.value.trim().toLowerCase();
    var password = passwordInput.value;
    var isValid = true;

    if (username === "")
    {
        usernameError.textContent = "Enter your username.";
        usernameInput.parentElement.classList.add("invalid");
        isValid = false;
    }

    if (password === "")
    {
        passwordError.textContent = "Enter your password.";
        passwordInput.parentElement.classList.add("invalid");
        isValid = false;
    }

    if (isValid === false)
    {
        return;
    }

    // Account check
    var user = USERS[username];

    if (!user || user.password !== password)
    {
        passwordError.textContent = "Username or password is incorrect.";
        passwordInput.parentElement.classList.add("invalid");
        return;
    }

    

    window.location.href = user.page;
});