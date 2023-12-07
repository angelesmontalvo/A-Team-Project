/*
    CHECK OUT UPDATE TOTAL
    November 25, 2023
    Angeles Montalvo
    This javascript file is used to redirect the user to account_info.html if they sign in or sign up sucessfully in account.html
*/

document.addEventListener('DOMContentLoaded', function () {
    const welcomeMessage = document.getElementById('welcome-message');
    const startShoppingBtn = document.getElementById('start-shopping-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Check if the user is logged in
    const authToken = localStorage.getItem('token');
    const isLoggedIn = authToken !== null; 

    if (isLoggedIn) {
        // Fetch user information from the backend
        fetch('http://localhost:8080/auth/me', {
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(user => {
                welcomeMessage.textContent = `Hello, ${user.name}`;
            })
            .catch(error => console.error('Error fetching user information:', error));

        startShoppingBtn.addEventListener('click', function () {
            // Implement shopping logic
            console.log('Start shopping');
        });

        logoutBtn.addEventListener('click', function () {
            // Implement logout logic
            console.log('Logout');
            localStorage.removeItem('token');
            console.log('Logout');

            //Redirect user to account sign-in html
            window.location.href = 'account.html';
        });
    } else {
        // Redirect to the login page if not logged in
        window.location.href = 'account.html';
    }
});