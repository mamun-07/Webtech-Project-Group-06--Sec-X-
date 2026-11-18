var toast = document.getElementById("toast");

function showToast(message) {
  if (toast) {
    toast.textContent = message;
    toast.style.display = "block";
  }
}

if (toast) {
  toast.addEventListener("click", function () {
    toast.style.display = "none";
  });
}

document.querySelectorAll(".message-button").forEach(function (button) {
  button.addEventListener("click", function () {
    var message = button.textContent.trim();

    if (message.includes("Management")) {
      message = "The Management page will be built separately.";
    } else if (message.includes("Moderate Recipes")) {
      message = "The recipe moderation tools will be added to the Management page.";
    } else if (message.includes("View All Requests")) {
      message = "Demo only: approval requests will be managed on the Management page.";
    } else if (message.includes("Review")) {
      message = "Demo only: account review will be connected on the Management page.";
    } else if (message.includes("Post Announcement")) {
      message = "The announcement tool will be added to the Management page.";
    }

    showToast(message);
  });
});

document.querySelectorAll(".scroll-button").forEach(function (button) {
  button.addEventListener("click", function () {
    showToast(button.textContent.trim());
  });
});