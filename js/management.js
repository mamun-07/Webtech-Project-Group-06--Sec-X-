var toast = document.getElementById("toast");
var searchInput = document.getElementById("userSearch");
var roleFilter = document.getElementById("roleFilter");
var statusFilter = document.getElementById("statusFilter");

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

function filterUsers() {
  var rows = document.querySelectorAll(".user-row");
  var searchText = searchInput.value.toLowerCase();
  var selectedRole = roleFilter.value;
  var selectedStatus = statusFilter.value;

  rows.forEach(function (row) {
    var userName = row.children[0].textContent.toLowerCase();
    var email = row.children[1].textContent.toLowerCase();
    var role = row.children[2].textContent;
    var status = row.children[3].textContent.trim();
    var matchesSearch = userName.includes(searchText) || email.includes(searchText);
    var matchesRole = selectedRole === "All Roles" || role === selectedRole;
    var matchesStatus = selectedStatus === "All Status" || status === selectedStatus;

    if (matchesSearch && matchesRole && matchesStatus) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterUsers);
roleFilter.addEventListener("change", filterUsers);
statusFilter.addEventListener("change", filterUsers);

document.querySelectorAll(".user-action").forEach(function (button) {
  button.addEventListener("click", function () {
    var row = button.parentElement.parentElement;
    var status = row.children[3].querySelector(".status");
    var action = button.textContent.trim();

    if (action === "Suspend") {
      status.textContent = "Suspended";
      status.className = "status suspended-status";
      button.textContent = "Activate";
      button.className = "action-button activate-button user-action";
      showToast("User suspended in this demo.");
    } else if (action === "Activate") {
      status.textContent = "Active";
      status.className = "status active-status";
      button.textContent = "Suspend";
      button.className = "action-button suspend-button user-action";
      showToast("User activated in this demo.");
    } else if (action === "Delete") {
      row.parentElement.removeChild(row);
      showToast("User removed from this demo.");
    }

    filterUsers();
  });
});

document.querySelectorAll(".approval-action").forEach(function (button) {
  button.addEventListener("click", function () {
    var row = button.parentElement.parentElement;
    var action = button.textContent.trim();
    row.parentElement.removeChild(row);
    showToast(action + " completed in this demo.");
  });
});

document.querySelectorAll(".recipe-action").forEach(function (button) {
  button.addEventListener("click", function () {
    var row = button.parentElement.parentElement;
    var action = button.textContent.trim();

    if (action === "View") {
      showToast("Recipe: " + row.children[0].textContent);
    } else {
      row.parentElement.removeChild(row);
      showToast("Recipe removed from this demo.");
    }
  });
});
