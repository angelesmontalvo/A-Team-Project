/*
    SORT PRODUCTS
    November 25, 2023
    Angeles Montalvo
    This javascript file is used to sort the products from high to low or low to high based on selection
*/

function sortProducts() {
    var selectElement = document.getElementById('sort-select');
    var selectedOption = selectElement.options[selectElement.selectedIndex].text;

    var productContainer = document.getElementById('product-container');
    var products = Array.from(productContainer.getElementsByClassName('col4'));

    if (selectedOption === 'Price Low to High') {
        products.sort(function (a, b) {
            var priceA = parseFloat(a.querySelector('p').innerText.slice(1));
            var priceB = parseFloat(b.querySelector('p').innerText.slice(1));
            return priceA - priceB;
        });
    } else if (selectedOption === 'Price High to Low') {
        products.sort(function (a, b) {
            var priceA = parseFloat(a.querySelector('p').innerText.slice(1));
            var priceB = parseFloat(b.querySelector('p').innerText.slice(1));
            return priceB - priceA;
        });
    }

    // Create a new document fragment
    var fragment = document.createDocumentFragment();

    // Append the sorted products to the fragment
    products.forEach(function (product) {
        fragment.appendChild(product.cloneNode(true));
    });

    // Clear the current product container
    productContainer.innerHTML = '';

    // Append the sorted products back to the container
    productContainer.appendChild(fragment);
}