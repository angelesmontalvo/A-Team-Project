/*
    CHECK OUT UPDATE TOTAL
    November 15, 2023
    Angeles Montalvo
    This javascript file is used to calculate the tax, and calculate the total based on subtotal, tax and shipping method selected
*/

document.addEventListener('DOMContentLoaded', function () {
    //Declaration of variables obtained from account.html by Id
    var shippingMethodInput = document.getElementsByName('shipping-method');
    var subtotalElement = document.getElementById('subtotal');
    var shippingElement =  document.getElementById('shipping');
    var taxElement = document.getElementById('tax');
    var totalElement = document.getElementById('total');

    //Event listener for changes in the shipping method selected
    for (var i = 0; i < shippingMethodInput.length; i++) {
        shippingMethodInput[i].addEventListener('change', function (){
            //Update the total based on the selected shipping method
            updateOrderSummary();
        });
    }

    //'updateOrderSummary()': updates the taxes, shipping fees, and total
    function updateOrderSummary() {
        //Value as numbers
        var subtotalValue = parseFloat(subtotalElement.textContent) || 0;
        var shippingCost = 0;

        //Get the shipping method selected by the user
        var shippingMethodSelected = document.querySelector('input[name="shipping-method"]:checked').value;

        //Update shipping cost to $10 if the user selects 'Express' shipping
        if (shippingMethodSelected == 'express') {
            shippingCost = 10;
        }

        //Calculate tax: 9.5% of the subtotal
        var tax = 0.095 * subtotalValue;

        //Calculate the total
        var total = subtotalValue + shippingCost + tax;

        //Update the display of tax, shipping cost and total
        shippingElement.textContent = '$' + shippingCost.toFixed(2);
        taxElement.textContent = '$' + tax.toFixed(2);
        totalElement.textContent = '$' + total.toFixed(2);
    }

    //Initialize the order summary
    updateOrderSummary();

});

//This one stores the user's email in localStorage
document.addEventListener('DOMContentLoaded', function () {
    var emailInput = document.querySelector('input[type="email"]');
    emailInput.addEventListener('input', function () {
        localStorage.setItem('userEmail', emailInput.value);
    });
});