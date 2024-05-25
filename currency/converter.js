amount = document.getElementById("amount")
rate = document.getElementById("rate")
result = document.getElementById("result")

rate.value = localStorage.getItem("rate")

amount.addEventListener("input", function() {
    var resultValue = convert(amount.value, rate.value);
    result.value = resultValue.toFixed(2);
});

rate.addEventListener("input", function() {
    localStorage.setItem("rate", rate.value)
    var resultValue = convert(amount.value, rate.value);
    result.value = resultValue.toFixed(2);
});

function convert(amount, rate) {
    return amount * rate;
}

