var toast = document.getElementById("toast");
var searchInput = document.getElementById("userSearch");
var roleFilter = document.getElementById("roleFilter");
var statusFilter = document.getElementById("statusFilter");

function showToast(message)
{
    toast.textContent = message;
    toast.style.display = "block";
}

toast.addEventListener("click", function ()
{
    toast.style.display = "none";
});

function filterUsers()
{
    var rows = document.querySelectorAll(".user");

    rows.forEach(function (row)
    {
        var name = row.children[0].textContent.toLowerCase();
        var email = row.children[1].textContent.toLowerCase();
        var role = row.children[2].textContent.trim();
        var status = row.children[3].textContent.trim();

        var matchesSearch = name.includes(searchInput.value.toLowerCase()) ||  email.includes(searchInput.value.toLowerCase());

        var matchesRole =  roleFilter.value === "All Roles" || role === roleFilter.value;

        var matchesStatus = statusFilter.value === "All Status" || status === statusFilter.value;

        row.style.display =
            matchesSearch && matchesRole && matchesStatus ? "" : "none";
    });
}

searchInput.addEventListener("input", filterUsers);
roleFilter.addEventListener("change", filterUsers);
statusFilter.addEventListener("change", filterUsers);

document.querySelectorAll("#userManagement button").forEach(function (button)
{
    button.addEventListener("click", function ()
    {
        var row = button.parentElement.parentElement;
        var status = row.children[3].querySelector(".active, .suspended");
        var action = button.textContent.trim();

        if (action === "Delete")
        {
            row.remove();
            showToast("User removed from this demo.");
        }
        else if (action === "Suspend")
        {
            status.textContent = "Suspended";
            status.className = "suspended";
            button.textContent = "Activate";
            button.className = "activate";
            showToast("User suspended in this demo.");
        }
        else
        {
            status.textContent = "Active";
            status.className = "active";
            button.textContent = "Suspend";
            button.className = "suspend";
            showToast("User activated in this demo.");
        }

        filterUsers();
    });
});

document.querySelectorAll("#accountApprovals button").forEach(function (button)
{
    button.addEventListener("click", function ()
    {
        var action = button.textContent.trim();
        button.parentElement.parentElement.remove();
        showToast(action + " completed in this demo.");
    });
});

document.querySelectorAll("#recipeModeration button").forEach(function (button)
{
    button.addEventListener("click", function ()
    {
        var row = button.parentElement.parentElement;

        if (button.textContent.trim() === "View")
        {
            showToast("Recipe: " + row.children[0].textContent);
        }
        else
        {
            row.remove();
            showToast("Recipe removed from this demo.");
        }
    });
});