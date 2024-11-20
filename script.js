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
    const deadHeadMiles = parseFloat(document.getElementById("deadHeadMiles").value);
    const totalRate = parseFloat(document.getElementById("totalRateAdvanced").value);
    const mpg = parseFloat(document.getElementById("mpg").value);
    const fuelCostPerGallon = parseFloat(document.getElementById("fuelCost").value);
    const dispatchPercent = parseFloat(document.getElementById("dispatchPercent").value) || 0;
    const factoringPercent = parseFloat(document.getElementById("factoringPercent").value) || 0;

    if (
        isNaN(totalMiles) ||
        isNaN(deadHeadMiles) ||
        isNaN(totalRate) ||
        isNaN(mpg) ||
        isNaN(fuelCostPerGallon) ||
        totalMiles <= 0 ||
        mpg <= 0 ||
        deadHeadMiles < 0
    ) {
        alert("Please enter valid numbers for all required fields.");
        return;
    }

    // Calculate fuel cost for the dead head trip to origin
    const gallonsNeededToOrigin = deadHeadMiles / mpg;
    const fuelCostToOrigin = gallonsNeededToOrigin * fuelCostPerGallon;

    // Calculate fuel cost for the loaded trip
    const gallonsNeededForTrip = totalMiles / mpg;
    const fuelCostForTrip = gallonsNeededForTrip * fuelCostPerGallon;

    // Calculate dispatch and factoring payments
    const dispatchPayment = (dispatchPercent / 100) * totalRate;
    const factoringPayment = (factoringPercent / 100) * totalRate;

    // Calculate net rate after all costs
    const netRate =
        totalRate - fuelCostToOrigin - fuelCostForTrip - dispatchPayment - factoringPayment;

    // Update the results on the page
    document.getElementById("fuelCostToOrigin").textContent = `$${fuelCostToOrigin.toFixed(2)}`;
    document.getElementById("fuelCostResult").textContent = `$${fuelCostForTrip.toFixed(2)}`;
    document.getElementById("dispatchPayment").textContent = `$${dispatchPayment.toFixed(2)}`;
    document.getElementById("factoringPayment").textContent = `$${factoringPayment.toFixed(2)}`;
    document.getElementById("netRate").textContent = `$${netRate.toFixed(2)}`;
}

// Reset function for Basic Mode
function resetBasic() {
    document.getElementById("rateCalculatorBasic").reset();
    document.getElementById("ratePerMileBasic").textContent = "$0.00";
}

// Reset function for Advanced Mode
function resetAdvanced() {
    document.getElementById("rateCalculatorAdvanced").reset();
    document.getElementById("fuelCostToOrigin").textContent = "$0.00";
    document.getElementById("fuelCostResult").textContent = "$0.00";
    document.getElementById("dispatchPayment").textContent = "$0.00";
    document.getElementById("factoringPayment").textContent = "$0.00";
    document.getElementById("netRate").textContent = "$0.00";
}

// Validation for MPG and Fuel Cost Per Gallon
document.getElementById("mpg").addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9.]/g, ""); // Allow only numbers and decimal
    if (!/^\d{0,2}(\.\d{0,2})?$/.test(this.value)) {
        this.value = this.value.slice(0, -1); // Enforce format
    }
});

document.getElementById("fuelCost").addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9.]/g, ""); // Allow only numbers and decimal
    if (!/^\d{0,2}(\.\d{0,2})?$/.test(this.value)) {
        this.value = this.value.slice(0, -1); // Enforce format
    }
});

// Toggle calculator tabs
function openCalcTab(evt, mode) {
    // Hide all calculator tab content
    const calcTabContents = document.getElementsByClassName("calc-tabcontent");
    for (let i = 0; i < calcTabContents.length; i++) {
        calcTabContents[i].style.display = "none";
    }

    // Remove "active" class from all calculator tab links
    const calcTabLinks = document.getElementsByClassName("calc-tablinks");
    for (let i = 0; i < calcTabLinks.length; i++) {
        calcTabLinks[i].className = calcTabLinks[i].className.replace(" active", "");
    }

    // Show the selected tab and add "active" class
    document.getElementById(mode).style.display = "block";
    evt.currentTarget.className += " active";
}

// Toggle instruction tabs and update calculator labels
// Toggle instruction tabs and update calculator labels and placeholders
function openInstructionTab(evt, language) {
    console.log(`Switching to ${language}`); // Debugging step

    // Hide all instruction tab content
    const instTabContents = document.getElementsByClassName("inst-tabcontent");
    for (let i = 0; i < instTabContents.length; i++) {
        instTabContents[i].style.display = "none";
    }

    // Remove "active" class from all instruction tab links
    const instTabLinks = document.getElementsByClassName("inst-tablinks");
    for (let i = 0; i < instTabLinks.length; i++) {
        instTabLinks[i].className = instTabLinks[i].className.replace(" active", "");
    }

    // Show the selected tab and add "active" class
    document.getElementById(language).style.display = "block";
    evt.currentTarget.className += " active";

    // Update calculator labels and placeholders
    updateCalculatorLabelsAndPlaceholders(language);
}

// Update calculator labels and placeholders dynamically
function updateCalculatorLabelsAndPlaceholders(language) {
    const content = {
        english: {
            totalMiles: { label: "Total Miles:", placeholder: "Enter total miles" },
            totalRate: { label: "Total Rate ($):", placeholder: "Enter total rate" },
            deadHeadMiles: { label: "Dead Head Miles to Origin:", placeholder: "Enter dead head miles (empty driving)" },
            mpg: { label: "Miles per Gallon (MPG):", placeholder: "Enter average MPG (e.g., 10.50)" },
            fuelCost: { label: "Fuel Cost per Gallon ($):", placeholder: "Enter fuel cost (e.g., 4.25)" },
            dispatchPercent: { label: "Dispatch Percentage (%):", placeholder: "Enter dispatch percentage (optional)" },
            factoringPercent: { label: "Factoring Company Percentage (%):", placeholder: "Enter factoring percentage (optional)" },
            calculate: "Calculate",
            reset: "Reset",
            results: {
                ratePerMile: "Rate Per Mile:",
                fuelCostToOrigin: "Fuel Cost to Origin:",
                fuelCostResult: "Fuel Cost for Trip:",
                dispatchPayment: "Dispatch Payment:",
                factoringPayment: "Factoring Payment:",
                netRate: "Net Rate After Costs:",
            },
        },
        spanish: {
            totalMiles: { label: "Millas Totales:", placeholder: "Ingrese las millas totales" },
            totalRate: { label: "Tarifa Total ($):", placeholder: "Ingrese la tarifa total" },
            deadHeadMiles: { label: "Millas en Vacío al Origen:", placeholder: "Ingrese las millas en vacío (sin carga)" },
            mpg: { label: "Millas por Galón (MPG):", placeholder: "Ingrese el rendimiento en MPG (ej., 10.50)" },
            fuelCost: { label: "Costo del Combustible por Galón ($):", placeholder: "Ingrese el costo del combustible (ej., 4.25)" },
            dispatchPercent: { label: "Porcentaje del Despachador (%):", placeholder: "Ingrese el porcentaje del despachador (opcional)" },
            factoringPercent: { label: "Porcentaje de Factoring (%):", placeholder: "Ingrese el porcentaje de factoring (opcional)" },
            calculate: "Calcular",
            reset: "Restablecer",
            results: {
                ratePerMile: "Tarifa por Milla:",
                fuelCostToOrigin: "Costo de Combustible al Origen:",
                fuelCostResult: "Costo de Combustible para el Viaje:",
                dispatchPayment: "Pago al Despachador:",
                factoringPayment: "Pago de Factoring:",
                netRate: "Tarifa Neta Después de Costos:",
            },
        },
    };

    const selected = content[language];

    // Update labels
    document.querySelector("#totalMilesBasicLabel").textContent = selected.totalMiles.label;
    document.querySelector("#totalRateBasicLabel").textContent = selected.totalRate.label;
    document.querySelector("#totalMilesAdvancedLabel").textContent = selected.totalMiles.label;
    document.querySelector("#deadHeadMilesLabel").textContent = selected.deadHeadMiles.label;
    document.querySelector("#totalRateAdvancedLabel").textContent = selected.totalRate.label;
    document.querySelector("#mpgLabel").textContent = selected.mpg.label;
    document.querySelector("#fuelCostLabel").textContent = selected.fuelCost.label;
    document.querySelector("#dispatchPercentLabel").textContent = selected.dispatchPercent.label;
    document.querySelector("#factoringPercentLabel").textContent = selected.factoringPercent.label;

    // Update placeholders
    document.querySelector("#totalMilesBasic").placeholder = selected.totalMiles.placeholder;
    document.querySelector("#totalRateBasic").placeholder = selected.totalRate.placeholder;
    document.querySelector("#totalMilesAdvanced").placeholder = selected.totalMiles.placeholder;
    document.querySelector("#deadHeadMiles").placeholder = selected.deadHeadMiles.placeholder;
    document.querySelector("#totalRateAdvanced").placeholder = selected.totalRate.placeholder;
    document.querySelector("#mpg").placeholder = selected.mpg.placeholder;
    document.querySelector("#fuelCost").placeholder = selected.fuelCost.placeholder;
    document.querySelector("#dispatchPercent").placeholder = selected.dispatchPercent.placeholder;
    document.querySelector("#factoringPercent").placeholder = selected.factoringPercent.placeholder;

    // Update button text
    document.querySelector("#calculateBasicButton").textContent = selected.calculate;
    document.querySelector("#resetBasicButton").textContent = selected.reset;
    document.querySelector("#calculateAdvancedButton").textContent = selected.calculate;
    document.querySelector("#resetAdvancedButton").textContent = selected.reset;

    // Update result labels
    document.querySelector("#resultBasic p").firstChild.textContent = selected.results.ratePerMile + " ";
    document.querySelector("#fuelCostToOrigin").previousSibling.textContent = selected.results.fuelCostToOrigin + " ";
    document.querySelector("#fuelCostResult").previousSibling.textContent = selected.results.fuelCostResult + " ";
    document.querySelector("#dispatchPayment").previousSibling.textContent = selected.results.dispatchPayment + " ";
    document.querySelector("#factoringPayment").previousSibling.textContent = selected.results.factoringPayment + " ";
    document.querySelector("#netRate").previousSibling.textContent = selected.results.netRate + " ";

    console.log(`Updated calculator to ${language}`); // Debugging step
}




// Set default tabs on page load
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("defaultCalcTab").click(); // Default to Basic Mode
    document.getElementById("defaultInstructionTab").click(); // Default to English Instructions
});

