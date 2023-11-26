document.addEventListener('DOMContentLoaded', function () {
    const welcomeMessage = document.getElementById('welcome-message');
    const startShoppingBtn = document.getElementById('start-shopping-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Check if the user is logged in (you can use a token or session)
    const isLoggedIn = true; // Replace with your actual check

    if (isLoggedIn) {
        // Fetch user information from the backend (replace with actual API call)
        fetch('/api/user')
            .then(response => response.json())
            .then(user => {
                welcomeMessage.textContent = `Hello, ${user.name}`;
            })
            .catch(error => console.error('Error fetching user information:', error));

        startShoppingBtn.addEventListener('click', function () {
            // Implement shopping logic here
            console.log('Start shopping');
        });

        logoutBtn.addEventListener('click', function () {
            // Implement logout logic here (e.g., invalidate session/token)
            console.log('Logout');
        });
    } else {
        // Redirect to the login page if not logged in
        window.location.href = '/login.html'; // Replace with your actual login page
    }
});