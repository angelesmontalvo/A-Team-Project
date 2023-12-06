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
    fetch('http://localhost:8080/cart/items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
    })

    .then(response => response.json())
    .then(cartItems => {
        // Update the UI with the cart items
        displayCartItems(cartItems);
    })
    .catch(error => console.error('Error:', error));
}
  
    
// Function to display cart items on the shopping cart page
function displayCartItems(cartItems) {
    const cartTable = document.getElementById('cart-table');
    const totalSubtotalElement = document.getElementById('total_subtotal');
    let totalSubtotal = 0;

    // Clear existing cart items
    cartTable.innerHTML = '';

    // Iterate through cart items and display them in the table
    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>${item.subtotal.toFixed(2)}</td>
        `;
        cartTable.appendChild(row);

        // Update the total subtotal
        totalSubtotal += item.subtotal;
    });

    // Display the total subtotal
    totalSubtotalElement.textContent = totalSubtotal.toFixed(2);
}

// Call fetchCart when the shopping_cart.html page is loaded
document.addEventListener('DOMContentLoaded', function () {
    fetchCart();
});

