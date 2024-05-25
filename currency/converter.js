amount = document.getElementById("amount")
rate = document.getElementById("rate")
result = document.getElementById("result")

rate.value = document.cookie
  .split("; ")
  .find((row) => row.startsWith("rate="))
  ?.split("=")[1];

amount.addEventListener("input", function() {
    var resultValue = convert(amount.value, rate.value);
    result.value = resultValue.toFixed(2);
});

rate.addEventListener("input", function() {
    document.cookie = "rate=" + rate.value
    var resultValue = convert(amount.value, rate.value);
    result.value = resultValue.toFixed(2);
});

function convert(amount, rate) {
    return amount * rate;
}

