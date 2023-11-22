function updatePrice() {
    var dropdown = document.getElementById('sizeDropdown');
    var selectedSize = dropdown.options[dropdown.selectedIndex].value;
    var priceElement = document.getElementById('productPrice');
    priceElement.innerText = '$' + selectedSize;
}