const radioButtons = document.querySelectorAll('input[name="inlineRadioOptions"]');
const checkboxes = document.querySelectorAll('.configurator-box');
const priceElement = document.getElementById('Price');
const priceElementDiscount = document.getElementById('PriceDiscount');
const monthlyPriceElementDiscount = document.getElementById('MonthlyPrice');

let confirmedMonthlyPrice = 0;
let confirmedTotalPrice = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    updatePrice();
});

radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', updatePrice);
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePrice);
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
        myListings: 3000,
        myReviews: 7000,
        myBlog: 20000,
        myForm: 1200
    };

    // monthly licences
    const checkboxMonthlyPrices = {
        myHero: 300,
        myEmail: 0,
        myServices: 0,
        myListings: 150,
        myReviews: 25,
        myBlog: 500,
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
    if (totalCountOfModules > 6) {
        let totalPriceAfterDiscount = totalPrice * 0.9;
        priceElement.innerHTML = `<span>s 10% slevou od </span>${(totalPriceAfterDiscount).toLocaleString()}<sup>Kč</sup>`;
        priceElementDiscount.innerHTML = `<span>Původní cena ${(totalPrice).toLocaleString()}Kč.</span>`;
    } else {
        priceElementDiscount.innerHTML = `<span>Slevu 10 % při zakoupení všech modulů`;
        priceElement.innerHTML = `<span>od</span>${(totalPrice).toLocaleString()}<sup>Kč</sup>`;
    }
    monthlyPriceElementDiscount.innerHTML = `<span>${(totalMonthlyPrice).toLocaleString()} Kč měsíčně servisní poplatek za provoz domény a serveru.</span>`;
    confirmedMonthlyPrice=(totalMonthlyPrice).toLocaleString();
    confirmedTotalPrice = (totalPrice).toLocaleString();
}

function fillOutForm() {
    const checkedOptions = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedOptions.push(checkbox.id);
        }
    });

    console.log("Zakaznik na zajem o "+checkedOptions)
    console.log(`${confirmedTotalPrice} Kč faktura`)
    console.log(`${confirmedMonthlyPrice} Kč měsíčně servisní poplatek za provoz domény a serveru.`);
}
