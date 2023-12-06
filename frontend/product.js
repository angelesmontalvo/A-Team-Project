/*
    SORT PRODUCTS
    November 25, 2023
    Angeles Montalvo
    This javascript file is used to sort the products and dynamically create a page for a single product
*/

//Function used to sort the products based on user slection
function sortProducts() {
    console.log('sortproducts function called');
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

    //Iterate through products
    products.forEach(function (product, index) {
        var clonedProduct = product.cloneNode(true);
        row.appendChild(clonedProduct);

        // Assign unique class names for quantity input
        var quantityInput = clonedProduct.querySelector('.quantityInput');

        // Add event listener for quantity changes
        quantityInput.addEventListener('input', function () {
            updateCartItemSubtotal(clonedProduct, quantityInput.value);
        });

        // Add event listener for "Add to Cart" button
        clonedProduct.querySelector('.button.addToCartBtn').addEventListener('click', function () {
            console.log('button clicked'); //console log message
            var productId = clonedProduct.getAttribute('data-product-id');
            var quantity = quantityInput.value;

            // Send a request to the server to add the product to the cart
            addToCart(productId, quantity);
        });

        // Check if 4 products are added or if it's the last product
        if ((index + 1) % 4 === 0 || index === products.length - 1) {
            productContainer.appendChild(row.cloneNode(true));
            row.innerHTML = ''; // Clear the row for the next set of products
        }
    }); 


    // Assign unique class names for quantity input
    var quantityInputs = Array.from(productContainer.getElementsByClassName('quantityInput'));

    // Add event listener for quantity changes
    quantityInputs.forEach(function (quantityInput, index) {
        quantityInput.addEventListener('input', function () {
            // Note: Use the appropriate logic in updateCartItemSubtotal
            updateCartItemSubtotal(products[index], quantityInput.value);
        });
    });

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.button.addToCartBtn').forEach(function (button) {
        button.addEventListener('click', function () {
            console.log('button clicked'); //console log message

            // Find the closest product container
            var productContainer = button.closest('.col4');
            var productId = productContainer.getAttribute('data-product-id');
            
            // Find the quantity input within the product container
            var quantityInput = productContainer.querySelector('.quantityInput');
            var quantity = quantityInput.value

            // Send a request to the server to add the product to the cart
            addToCart(productId, quantity);
        });
    });

    //Fetch and update cart
    fetchCart();
}  

//function to handle the API request
function addToCart(productId, quantity) {
    //Retrive the token from local storage
    const authToken = localStorage.getItem('token');

    if (!authToken) {
        console.error("User is not logged in");

        //Redirect to login page if user is not logged in
        window.location.href = 'account.html';

        return;
    }

    const data = {
        productId: productId,
        quantity: quantity
    };

    console.log('Adding to cart:', data); //console log message

    fetch('http://localhost:8080/cart/items', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            console.log('Product added to cart'); //console log message
            //Redirect user to updated shopping cart
            window.location.href = 'shopping_cart.html';
        } else {
            console.error('Failed to add product to cart'); //console log message
        }
    })
    .catch(error => console.error('Error:', error));
}