document.addEventListener('DOMContentLoaded', function () {
    //Get elements
    var shippingMethodInput = document.getElementsByName('shipping-method');
    var subtotalElement = document.getElementById('subtotal');
    var shippingElement =  document.getElementById('shipping');
    var taxElement = document.getElementById('tax');
    var totalElement = document.getElementById('total');

    //Set an event listener for changes in shipping method
    for (var i = 0; i < shippingMethodInput.length; i++) {
        shippingMethodInput[i].addEventListener('change', function (){
            //Update the total based on the selected shipping method
            updateOrderSummary();
        });
    }

    //function to update the order summary
    function updateOrderSummary() {
        //Value as numbers
        var subtotalValue = parseFloat(subtotalElement.textContent) || 0;
        var shippingCost = 0;

        //Get the selected shipping method
        var shippingMethodSelected = document.querySelector('input[name="shipping-method"]:checked').value;

        //Update shipping cost based on the user selection
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