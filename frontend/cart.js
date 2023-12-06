document.addEventListener('DOMContentLoaded', function() {
    fetchCart();
});
    
function fetchCart() {
    console.log('Fetching cart...');
    const backendUrl = 'http://localhost:8080';

    //Retrive the token from local storage
    const authToken = localStorage.getItem('token');

    // Include authentication token if required
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken,
    };

    fetch(backendUrl + '/cart', { headers: headers })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cartData => {
            updateCartUI(cartData);
        })
        .catch(error => console.error('Error fetching cart:', error));
}
  
    
function updateCartUI(cartData) {
    // Update the UI based on the cartData received from the server

    // Example: Update the subtotal
    const totalSubtotalElement = document.getElementById('total_subtotal');

    if (cartData.subtotal !== undefined) {
        totalSubtotalElement.textContent = cartData.subtotal.toFixed(2);
    }

    // Example: Update the cart items
    const cartTable = document.getElementById('cart-table');
    console.log('cartTable:', cartTable);

    cartData.items.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartTable.appendChild(cartItemElement);
    });
}
 
function createCartItemElement(item) {
    // Create the outer row element
    const row = document.createElement('tr');

    // Create the first cell with the cart_info structure
    const cartInfoCell = document.createElement('td');
    const cartInfoDiv = document.createElement('div');
    cartInfoDiv.className = 'cart_info';

    const innerDiv = document.createElement('div');

    const productName = document.createElement('p');
    productName.className = 'prodname';
    productName.textContent = item.name;

    const price = document.createElement('small');
    price.textContent = `Price: $${item.price.toFixed(2)}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeCartItem(item.id));

    innerDiv.appendChild(productName);
    innerDiv.appendChild(price);
    innerDiv.appendChild(document.createElement('br'));
    innerDiv.appendChild(removeButton);

    cartInfoDiv.appendChild(innerDiv);
    cartInfoCell.appendChild(cartInfoDiv);

    // Create the second cell with the quantity input
    const quantityCell = document.createElement('td');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = item.quantity;
    quantityInput.min = '1';
    quantityInput.max = '99';
    quantityCell.appendChild(quantityInput);

    // Create the third cell with the item subtotal
    const subtotalCell = document.createElement('td');
    const subtotal = document.createElement('span');
    subtotal.id = `subtotal_${item.id}`;  // You can use a unique identifier based on your item
    subtotal.textContent = `$${item.subtotal.toFixed(2)}`;
    subtotalCell.appendChild(subtotal);

    // Append the cells to the row
    row.appendChild(cartInfoCell);
    row.appendChild(quantityCell);
    row.appendChild(subtotalCell);

    return row;
}


// Call fetchCart when the page loads
window.addEventListener('load', function () {
    fetchCart();
});

// Define quantityInputs here (assuming you have a collection of quantity inputs)
const quantityInputs = document.querySelectorAll('.quantity-input');

// Add event listener for quantity changes
quantityInputs.forEach(function (quantityInput) {
    quantityInput.addEventListener('input', function () {
        var productContainer = quantityInput.closest('.col4');
        updateCartItemSubtotal(productContainer, quantityInput.value);    
    });
});

function updateCartItemSubtotal(product, newQuantity) {
    // Send a request to the server to update the cart item quantity
    const productId = product.getAttribute('data-product-id');
    const authToken = localStorage.getItem('token');
    fetch('http://localhost:8080/cart/items', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Cart item quantity updated');
            fetchCart();
        } else {
            console.error('Failed to update cart item quantity');
        }
    })
    .catch(error => console.error('Error:', error));
}

