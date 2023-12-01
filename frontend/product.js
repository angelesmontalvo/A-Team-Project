/*
    SORT PRODUCTS
    November 25, 2023
    Angeles Montalvo
    This javascript file is used to sort the products and dynamically create a page for a single product
*/

//Function used to sort the products based on user slection
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
    } else if (selectedOption === 'Sort by Default') {
        // If "Sort by Default" is selected, revert to the original order
        products.sort(function (a, b) {
            return a.getAttribute('data-product-id') - b.getAttribute('data-product-id');
        });
    }

    // Clear the current product container
    productContainer.innerHTML = '';

    // Append the sorted products back to the container in rows
    var row = document.createElement('div');
    row.className = 'row';

    products.forEach(function (product, index) {
        row.appendChild(product.cloneNode(true));

        // Check if 4 products are added or if it's the last product
        if ((index + 1) % 4 === 0 || index === products.length - 1) {
            productContainer.appendChild(row.cloneNode(true));
            row.innerHTML = ''; // Clear the row for the next set of products
        }
    }); 


    // Assign unique class names for quantity input
    var quantityInputs = productContainer.getElementsByClassName('quantityInput');

    // Iterate through quantityInputs to get values
    quantityInputs.forEach(function (quantityInput) {
        var quantity = quantityInput.value;
    });

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.button.addToCartBtn').forEach(function (button, index) {
        button.addEventListener('click', function () {
            var productId = products[index].getAttribute('data-product-id');
            var quantity = quantityInputs[index].value;

        // Send a request to the server to add the product to the cart
        addToCart(productId, quantity);
    });
});


}    


//function to handle the API request
function addToCart(productId, quantity) {
    var data = {
        productId: productId,
        quantity: quantity
    };

    fetch('/api/addToCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response (e.g., update the UI)
        console.log('Product added to cart:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

