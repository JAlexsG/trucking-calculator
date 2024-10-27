function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateNumber(input) {
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Accepts numbers with up to two decimal places
    return regex.test(input);
}

function calculateRate() {
    const totalMiles = sanitizeInput(document.getElementById("totalMiles").value.trim());
    const totalRate = sanitizeInput(document.getElementById("totalRate").value.trim());

    if (!validateNumber(totalMiles) || !validateNumber(totalRate)) {
        alert("Please enter valid numeric values.");
        return;
    }

    const miles = parseFloat(totalMiles);
    const rate = parseFloat(totalRate);

    if (isNaN(miles) || isNaN(rate) || miles <= 0) {
        alert("Please enter valid numbers for total miles and rate.");
        return;
    }

    const ratePerMile = rate / miles;
    document.getElementById("ratePerMile").textContent = `$${ratePerMile.toFixed(2)}`;
}
