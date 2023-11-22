/*
    PRICE UPDATE
    November 15, 2023
    Angeles Montalvo
    This javascript file is used to update price of product based on size selected
*/

//updatePrice(): updates price based on the value of size selected
function updatePrice() {
    var dropdown = document.getElementById('sizeDropdown');
    var selectedSize = dropdown.options[dropdown.selectedIndex].value;
    var priceElement = document.getElementById('productPrice');
    priceElement.innerText = '$' + selectedSize;
}