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
            //Update based on the selected shipping method
            updateOrderSummary(subtotalElement.textContent, this.value);
        });
    }

    //function to update the order summary
    function updateOrderSummary(subtotal, shippingMethod) {
        //Initital total;
        var subtotalValue = parseFloat(subtotal);
        var shippingCost = 0;

        //Update shipping cost based on the user selection
        if (shippingMethod == 'express') {
            shippingCost = 10;
        }

        //Calculate tax: 9.5% of the subtotal
        var tax = 0.095 * subtotalValue;

        //Calculate the total
        var total = subtotalValue + shippingCost + tax;

        //Update the display
        shippingElement.textContent = '$' + shippingCost.toFixed(2);
        taxElement.textContent = '$' + tax.toFixed(2);
        totalElement.textContent = '$' + total.toFixed(2);
    }

    //Initialize the order summary
    updateOrderSummary(subtotalElement.textContent, shippingMethodInputs[0].value);
});