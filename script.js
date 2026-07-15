const converterform = document.getElementById('converter-form');
const fromcurrency = document.getElementById('from-currency');
const Tocurrency = document.getElementById('to-currency');
const AmountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');

window.addEventListener("load", fetchcurrencies);
converterform.addEventListener("submit", convertcurrencies);

async function fetchcurrencies() {
    const response = await fetch('https://api.frankfurter.dev/v1/latest?base=USD');
    const data = await response.json();

    console.log(data);
    const currencyoptions = Object.keys(data.rates);

    currencyoptions.forEach((currency) => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromcurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        Tocurrency.appendChild(option2);
    });
}

async function convertcurrencies(e) {
    e.preventDefault();

    const amount = parseFloat(AmountInput.value);
    const fromcurrencyvalue = fromcurrency.value;
    const Tocurrencyvalue = Tocurrency.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please Enter a valid Amount');
        return;
    }

    const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${fromcurrencyvalue}`);
    const data = await response.json();
    const rate = data.rates[Tocurrencyvalue];
    const convertedamount = (amount * rate).toFixed(2);

    resultDiv.textContent = `${amount} ${fromcurrencyvalue} = ${convertedamount} ${Tocurrencyvalue}`;
}
