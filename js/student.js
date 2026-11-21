document.getElementById("btnAdd").addEventListener("click", function () {
    let isValid = true;

    document.getElementById("errormsg").textContent = "";

    let day = document.getElementById("day").value;
    if (day === "") 
    {
        document.getElementById("errormsg").textContent = "Please select a day.";
        document.getElementById("errormsg").style.color = "red";
        isValid = false;
    }
    let meal = document.getElementById("mealtime").value;
    if (meal === "" && isValid) 
    {
        document.getElementById("errormsg").textContent = "Please select a meal.";
        document.getElementById("errormsg").style.color = "red";
        isValid = false;
    }
    if (isValid)
    {
        document.getElementById("errormsg").textContent = "Valid";
        document.getElementById("errormsg").style.color = "green";
    }
});