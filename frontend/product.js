/*
    PRODUCTS JS PAGE
    November 25, 2023
    Angeles Montalvo
    This javascript file is used to dynamically create the products page by fetching the products from the database
*/


const backendApi = 'http://localhost:8080/product';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (productId) {
        fetchAndDisplayProductDetails(productId);
    } else {
        // If not on a product detail page, then display all products
        fetchAndDisplayProducts();
    }
});  


function fetchAndDisplayProducts() {
    fetch(backendApi)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(products => {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ''; // Clear the container
        products.forEach(product => {
            productContainer.appendChild(createProductElement(product));
        });
        attachAddToCartListeners();
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
}   
function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'col4';
    productDiv.setAttribute('data-product-id', product.id);
    productDiv.addEventListener('click', () => {
        window.location.href = `product_details.html?productId=${product.id}`;
    });

    // Setting the innerHTML of the product div
    productDiv.innerHTML = `
        <img src="img/${product.image}" width="200px">
        <h4>${product.name}</h4>
        <p>$${product.price.toFixed(2)}</p>
        <div class="quantitySection">
            <input type="number" class="quantityInput" value="1" min="1" max="99">
        </div>
        <button class="button addToCartBtn">Add To Cart</button>
    `;

    // Find the Add to Cart button and stop the propagation of the click event
    // This is to prevent the product detail page from opening when Add to Cart is clicked
    const addToCartBtn = productDiv.querySelector('.addToCartBtn');
    addToCartBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // This stops the click from "bubbling" up to the parent div
    });

    return productDiv;
}

function attachAddToCartListeners() {
    document.querySelectorAll('.addToCartBtn').forEach(button => {
        button.addEventListener('click', function(event) {
            const productContainer = event.target.closest('.col4');
            const productId = productContainer.getAttribute('data-product-id');
            const quantityInput = productContainer.querySelector('.quantityInput');
            const quantity = parseInt(quantityInput.value, 10);

            if (!isNaN(quantity) && quantity > 0) {
                addToCart(productId, quantity);
            } else {
                console.error('Invalid quantity:', quantity);
            }
        });
    });
} 

function addToCart(productId, quantity) {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
        console.error("User is not logged in");
        window.location.href = 'account.html';
        return;
    }
    const data = { productId, quantity };
    fetch('http://localhost:8080/cart/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to add product to cart: ${response.statusText}`);
        } 
        console.log('Product added to cart');
        window.location.href = 'shopping_cart.html';
    })
    .catch(error => { 
        alert(error.message);
        console.error('Error:', error);
    });
}  
function fetchAndDisplayProductDetails(productId) { 
    const authToken = localStorage.getItem('token');
    if (!authToken) {
        console.error("User is not logged in");
        // Handle the case where the user is not logged in
        return;
    } 

    fetch(`${backendApi}/${productId}`,{
        headers: {
            'Authorization': 'Bearer ' + authToken
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(product => {
            updateProductDetailsDOM(product);
        })
        .catch(error => { 
            document.getElementById('product-container').innerHTML = `<p>Error loading product details. Please try again later.</p>`;
            console.error('Error fetching product details:', error);
        });
}

function updateProductDetailsDOM(product) {
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('productDescription').textContent = product.shortDescription;
    const productImage = document.querySelector('.single_product .col2 img');
    if(productImage) {
        if (product.image && !product.image.startsWith('http')) {
            productImage.src = `img/${product.image}`;
        } else {
            productImage.src = product.image;
        }
        productImage.alt = product.name;
    }
    const addToCartBtn = document.getElementById('addToCartBtn');
    if(addToCartBtn) {
        addToCartBtn.disabled = false; // Enable the button
        addToCartBtn.addEventListener('click', () => {
            const quantityInput = document.getElementById('quantityInput');
            const quantity = parseInt(quantityInput.value, 10);
            if (!isNaN(quantity) && quantity > 0) {
                addToCart(product.id, quantity);
            } else {
                console.error('Invalid quantity:', quantity);
            }
        });
    }
}

function updateProductDetailsDOM(product) {
    // Make sure these elements exist on your product_details.html page
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productDescription = document.getElementById('productDescription');
    const productImage = document.getElementById('productImage'); // Make sure you have an element with ID 'productImage'
    
    if (productName) productName.textContent = product.name;
    if (productPrice) productPrice.textContent = `$${product.price.toFixed(2)}`;
    if (productDescription) productDescription.textContent = product.shortDescription;
    if (productImage) {
        productImage.src = product.image.startsWith('http') ? product.image : `img/${product.image}`;
        productImage.alt = product.name;
    }
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.disabled = false;
        addToCartBtn.addEventListener('click', () => {
            const quantityInput = document.getElementById('quantityInput');
            const quantity = parseInt(quantityInput.value, 10);
            if (!isNaN(quantity) && quantity > 0) {
                addToCart(product.id, quantity);
            } else {
                console.error('Invalid quantity:', quantity);
            }
        });
    }
} 

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    
    if (productContainer) {
        fetchAndDisplayProducts();
    } else if (productId) {
        fetchAndDisplayProductDetails(productId);
    } 
    
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', fetchAndDisplayProducts);
    }
});
