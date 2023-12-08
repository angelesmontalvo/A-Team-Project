/*
    CHECK OUT UPDATE TOTAL
    November 15, 2023
    Angeles Montalvo
    This javascript file is used to calculate the tax, and calculate the total based on subtotal, tax and shipping method selected
*/

document.addEventListener('DOMContentLoaded', function () {
    //Declaration of variables obtained from account.html by Id
    var subtotalElement = document.getElementById('subtotal');
    var shippingElement =  document.getElementById('shipping');
    var taxElement = document.getElementById('tax');
    var totalElement = document.getElementById('total');

    //Retrive the totalSubtotal from local storage
    updateOrderSummary(); 

    //'updateOrderSummary()': updates the taxes, shipping fees, and total
    function updateOrderSummary() {
        //Value as numbers
        var storedSubtotal = localStorage.getItem('totalSubtotal') || 0;
        var subtotalValue = parseFloat(storedSubtotal) || 0;
        subtotalElement.textContent = subtotalValue.toFixed(2);

        //Get the shipping method selected by the user
        var shippingCost = 0;
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

    var shippingMethodInput = document.getElementsByName('shipping-method');
    for (var i = 0; i < shippingMethodInput.length; i++) {
        shippingMethodInput[i].addEventListener('change', function() {
            updateOrderSummary();
        });

    }

});

//This one stores the user's email in localStorage
document.addEventListener('DOMContentLoaded', function () {
   
});