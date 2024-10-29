// Function to switch between Basic and Advanced tabs
function openTab(evt, tabName) {
    // Hide all tabcontent elements
    const tabContents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Remove the "active" class from all tablinks
    const tabLinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Show the selected tab and add "active" class to the button
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Set Basic Mode as default tab on page load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("defaultOpen").click();
});

// Basic Mode Calculation
function calculateRateBasic() {
    const totalMiles = parseFloat(document.getElementById("totalMilesBasic").value);
    const totalRate = parseFloat(document.getElementById("totalRateBasic").value);

    if (isNaN(totalMiles) || isNaN(totalRate) || totalMiles <= 0) {
        alert("Please enter valid numbers for total miles and rate.");
        return;
    }

    const ratePerMile = totalRate / totalMiles;
    document.getElementById("ratePerMileBasic").textContent = `$${ratePerMile.toFixed(2)}`;
}

// Advanced Mode Calculation
function calculateRateAdvanced() {
    const totalMiles = parseFloat(document.getElementById("totalMilesAdvanced").value);
    const totalRate = parseFloat(document.getElementById("totalRateAdvanced").value);
    const mpg = parseFloat(document.getElementById("mpg").value);
    const fuelCostPerGallon = parseFloat(document.getElementById("fuelCost").value);
    const dispatchPercent = parseFloat(document.getElementById("dispatchPercent").value) || 0;
    const factoringPercent = parseFloat(document.getElementById("factoringPercent").value) || 0;

    if (isNaN(totalMiles) || isNaN(totalRate) || isNaN(mpg) || isNaN(fuelCostPerGallon) || totalMiles <= 0 || mpg <= 0) {
        alert("Please enter valid numbers for miles, rate, MPG, and fuel cost.");
        return;
    }

    const gallonsNeeded = totalMiles / mpg;
    const fuelCost = gallonsNeeded * fuelCostPerGallon;
    const dispatchPayment = (dispatchPercent / 100) * totalRate;
    const factoringPayment = (factoringPercent / 100) * totalRate;
    const netRate = totalRate - fuelCost - dispatchPayment - factoringPayment;

    document.getElementById("fuelCostResult").textContent = `$${fuelCost.toFixed(2)}`;
    document.getElementById("dispatchPayment").textContent = `$${dispatchPayment.toFixed(2)}`;
    document.getElementById("factoringPayment").textContent = `$${factoringPayment.toFixed(2)}`;
    document.getElementById("netRate").textContent = `$${netRate.toFixed(2)}`;
}
