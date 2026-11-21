var viewRequestsLink = document.getElementById("viewAllRequests");

viewRequestsLink.addEventListener("click", function (event)
{
    var approvalRows = document.querySelectorAll(".approval-row");

    if (approvalRows.length === 0)
    {
        event.preventDefault();
        alert("There are no pending requests.");
    }
});