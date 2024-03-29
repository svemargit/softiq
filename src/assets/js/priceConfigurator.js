const radioButtons = document.querySelectorAll('input[name="inlineRadioOptions"]');
const checkboxes = document.querySelectorAll('.configurator-box');
const priceElement = document.getElementById('Price');
const priceElementDiscount = document.getElementById('PriceDiscount');
const monthlyPriceElementDiscount = document.getElementById('MonthlyPrice');
const webLevel = document.getElementById('WebLevel');

const orderServicesElement = document.getElementById("orderServices");
const confirmedTotalPriceElement = document.getElementById("confirmedTotalPrice");
const confirmedMonthlyPriceElement =  document.getElementById("confirmedMonthlyPrice");

let hasDiscount = false;
let confirmedMonthlyPrice = 0;
let confirmedTotalPrice = 0;
let webLevelText;

window.addEventListener('DOMContentLoaded', (event) => {
    updatePrice();
    fillOutForm();
});

radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', updatePrice);
    fillOutForm();
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePrice);
    fillOutForm();
});

function updatePrice() {
    const selectedValue = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    let basePrice;

    // Update base price based on selected radio option
    switch (selectedValue) {
        case 'SMART':
            basePrice = 13000;
            break;
        case 'SILVER':
            basePrice = 13500;
            break;
        case 'TOWER':
            basePrice = 14000;
            break;
        case 'CASUAL':
            basePrice = 15500;
            break;
        case 'EXCLUSIVE':
            basePrice = 20000;
            break;
        default:
            basePrice = 25000; // Default price
    }

    // Calculate total price
    let totalPrice = basePrice;
    let totalMonthlyPrice = 0;
    let totalCountOfModules = 0;

    // Individual checkbox prices
    const checkboxPrices = {
        myHero: 3000,
        myEmail: 1200,
        myServices: 1500,
        myListings: 7000,
        myReviews: 3000,
        myBlog: 10000,
        myForm: 1200
    };

    // monthly licences
    const checkboxMonthlyPrices = {
        myHero: 440,
        myEmail: 120,
        myServices: 0,
        myListings: 120,
        myReviews: 0,
        myBlog: 120,
        myForm: 0
    };


    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            totalCountOfModules += 1;
            // Add the price associated with the checkbox
            const priceToAdd = checkboxPrices[checkbox.id];
            totalPrice += priceToAdd;

            const monthlyPriceToAdd = checkboxMonthlyPrices[checkbox.id];
            totalMonthlyPrice += monthlyPriceToAdd;
        }
    });

    // Update the price element
    hasDiscount = totalCountOfModules > 6;
    let totalPriceAfterDiscount = totalPrice * 0.9;
    if (hasDiscount) {
        priceElement.innerHTML = `<span>s 10% slevou od </span>${(totalPriceAfterDiscount).toLocaleString()}<sup>Kč</sup>`;
        priceElementDiscount.innerHTML = `<span>Původní cena ${(totalPrice).toLocaleString()}Kč.</span>`;
    } else {
        priceElementDiscount.innerHTML = `<span>Slevu 10 % při zakoupení všech modulů`;
        priceElement.innerHTML = `<span>od</span>${(totalPrice).toLocaleString()}<sup>Kč</sup>`;
    }
    monthlyPriceElementDiscount.innerHTML = `<span>${(totalMonthlyPrice).toLocaleString()} Kč měsíčně servisní poplatek za provoz domény a serveru.</span>`;
    confirmedMonthlyPrice=(totalMonthlyPrice).toLocaleString();
    confirmedTotalPrice = hasDiscount ?(totalPriceAfterDiscount).toLocaleString(): (totalPrice).toLocaleString() ;

    switch (totalCountOfModules) {
        case 1:
        case 2:
        case 3:
            webLevelText = "Standardní";
            break;
        case 4:
            webLevelText = "Nadstandardní";
            break;
        case 5:
        case 6:
            webLevelText = "Prémiový";
            break;
        case 7:
            webLevelText = "Exkluzivní";
            break;
    }
    webLevel.innerHTML=`<span>${webLevelText}</span>`;
    fillOutForm();
}

function fillOutForm() {
    // Access the select element by its id
    const selectElement = document.getElementById('option');
    selectElement.value = webLevelText;
    const checkedOptions = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedOptions.push(checkbox.id);
        }
    });
    orderServicesElement.value = checkedOptions.join(', ');
    confirmedTotalPriceElement.value = confirmedTotalPrice + " Kč";
    confirmedMonthlyPriceElement.value = confirmedMonthlyPrice +" Kč měsíční výdaje";
}

function enableFormValues() {
    document.getElementById("option").disabled = false;
    orderServicesElement.disabled = false;
    confirmedTotalPriceElement.disabled = false;
    confirmedMonthlyPriceElement.disabled = false;
}
