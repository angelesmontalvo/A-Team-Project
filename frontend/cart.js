document.addEventListener('DOMContentLoaded', function() {
    fetchCart();
}); 

function fetchCart() {
    console.log('Fetching cart...');

    //Retrive the token from local storage
    const authToken = localStorage.getItem('token');

    if (!authToken) {
        console.error("User is not logged in");
        // Redirect to login page if the user is not logged in
        window.location.href = 'account.html';
        return;
    }

    // Make a request to the server to get the cart items
    fetch('http://localhost:8080/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
    }) 
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(cartDto => { // Assuming the response will be a CartDto
        console.log(cartDto);
        displayCartItems(cartDto.cartItems); // Assuming cartItems is a field in CartDto
    })
    .catch(error => console.error('Error:', error));
}
function updateCartItem(itemId, newQuantity) {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
        console.error("User is not logged in");
        window.location.href = 'account.html';
        return;
    }

    fetch(`http://localhost:8080/cart/items/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify({ quantity: newQuantity })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchCart(); // Refresh the cart to reflect the update
    })
    .catch(error => console.error('Error:', error));
} 

function removeItemFromCart(itemId) {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
        console.error("User is not logged in");
        window.location.href = 'account.html';
        return;
    }

    fetch(`http://localhost:8080/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchCart(); // Refresh the cart to reflect the item removal
    })
    .catch(error => console.error('Error:', error));
}


// Function to display cart items on the shopping cart page
function displayCartItems(cartItems) {
    const cartTable = document.getElementById('cart-table-body'); 
    const totalSubtotalElement = document.getElementById('total_subtotal');
    if (!cartTable || !totalSubtotalElement) {
        console.error("Required HTML elements not found");
        return;
    } 

    cartTable.innerHTML = '';
    let totalSubtotal = 0; 

    // Iterate through cart items and display them in the table
    if (cartItems && cartItems.length > 0) {
        cartItems.forEach(item => {
            const row = cartTable.insertRow();
            row.insertCell().textContent = item.productName; // Make sure your item object has a 'productName' property
            
            const quantityCell = row.insertCell();
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = '1';
            quantityInput.addEventListener('change', (e) => {
                updateCartItem(item.productId, e.target.value);
            });
            quantityCell.appendChild(quantityInput);

            // Subtotal
            row.insertCell().textContent = `$${item.subtotal.toFixed(2)}`;
            
            // Remove button
            const removeCell = row.insertCell();
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeItemFromCart(item.productId);
            });
            removeCell.appendChild(removeButton);

            totalSubtotal += item.subtotal;
        });

        // Display the total subtotal
    } else {
        cartTable.innerHTML = '<tr><td colspan="3">No items in cart</td></tr>';
    } 

    totalSubtotalElement.textContent = `$${totalSubtotal.toFixed(2)}`;

} 