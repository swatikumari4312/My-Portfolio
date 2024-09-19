const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@{apiVersion}/{date}/{endpoint}";



for(code in countryList){
  console.log(code,countryList[code]);
  }
const dropdowns = document.querySelectorAll(".dropdown select");

// Function to populate dropdowns with countryList data
const populateDropdowns = () => {
    dropdowns.forEach((select) => {
        for (let currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = `${currCode}`;
            newOption.value = currCode;
            if (select.name === "from" && currCode === "USD") {
                newOption.selected = true;
            } else if (select.name === "to" && currCode === "INR") {
                newOption.selected = true;
            }
            select.appendChild(newOption);
        }

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target.value);
        });
    });
};

// Function to handle currency conversion
const updateFlag = (currencyCode) => {
    console.log(currencyCode); // Placeholder for actual conversion logic

    // Example: Fetch exchange rate from BASE_URL and update UI
    fetch(BASE_URL)
        .then(response => response.json())
        .then(data => {
            // Example: Update UI with fetched data
            const exchangeRate = data[currencyCode];
            document.getElementById("exchangeRateMsg").textContent = `1 ${currencyCode} = ${exchangeRate} EUR`;
        })
        .catch(error => console.error('Error fetching exchange rate:', error));
};

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
    populateDropdowns();

    // Add event listener for Get Exchange Rate button
    const getExchangeRateBtn = document.getElementById("getExchangeRateBtn");
    getExchangeRateBtn.addEventListener("click", () => {
        const fromCurrencySelect = document.getElementById("fromCurrency");
        const selectedCurrency = fromCurrencySelect.value;
        updateFlag(selectedCurrency);
    });
});
