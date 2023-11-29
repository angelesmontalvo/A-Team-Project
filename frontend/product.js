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
}



//Function to dynamically create a page for a single product
function createProductDetailsPage(productId) {
    // Fetch product details based on productId (you might want to load this dynamically from a server or local data)
    var productDetails = getProductDetails(productId);

    // Create dynamic HTML content for the product details page
    var dynamicContent = `
        <div class="smallcontainer single_product">
            <div class="row">
                <div class="col2">
                    <img src="${productDetails.image}" width="100%">
                </div>
                <div class="col2">
                    <h2>${productDetails.category}</h2>
                    <h1 id="prdctname">${productDetails.name}</h1>
                    <h4 id="productPrice">$${productDetails.price.toFixed(2)}</h4>
                    <input type="number" value="1" min="0" max="99">
                    <a href="" class="button" id="addToCartBtn">Add To Cart</a>
                    <h3>Overview</h3>
                    <p>${productDetails.description}</p>
                    <ul>
                        <li>${productDetails.feature1}</li>
                        <li>${productDetails.feature2}</li>
                        <li>${productDetails.feature3}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Create a new HTML document
    var newPage = document.implementation.createHTMLDocument('Product Details');

    // Set the content of the new page
    newPage.documentElement.innerHTML = dynamicContent;

    // Open the new page in a new tab or window
    var newWindow = window.open('');
    newWindow.document.write(newPage.documentElement.innerHTML);
}

// Function to fetch product details based on productId (replace this with actual data retrieval logic)
function getProductDetails(productId) {
    return fetch(`/api/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(product => {
            return {
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                image: product.image,
                description: product.description,
                // Add other fields as needed
            };
        })
        .catch(error => console.error('Error fetching product details:', error));
}

