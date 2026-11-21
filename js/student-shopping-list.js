document.getElementById("ingredientForm").addEventListener("submit",function (event) {
    let isValid = true;

    document.getElementById("nameError").textContent = "";
    document.getElementById("qtyError").textContent = "";
    document.getElementById("unitError").textContent = "";
    document.getElementById("successMsg").textContent = "";

    let name = document.getElementById("src").value.trim();
    if (name === "") 
    {
        document.getElementById("nameError").textContent = "Ingredient name is required.";
        isValid = false;
    } 
    else if (name.length < 2) 
    {
        document.getElementById("nameError").textContent = "At least 2 characters required.";
        isValid = false;
    }

    let qty = document.getElementById("srcn").value;
    if (qty === "" || parseFloat(qty) <= 0) 
    {
        document.getElementById("qtyError").textContent = "Quantity must be greater than 0.";
        isValid = false;
    }

    let unit = document.getElementById("unit").value;
    if (unit === "") {
        document.getElementById("unitError").textContent = "Please select a unit.";
        isValid = false;
    }

    event.preventDefault();

    if (isValid) {
        document.getElementById("successMsg").textContent = "Valid";
    }
});