/*
    DISPLAY EMAIL ADDRESS 
    November 15, 2023
    Angeles Montalvo
    This javascript file is used to obtain the email address the confirmation email was sent to
*/

// Extract user email from the query parameter and display it
const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('email');
document.getElementById('userEmail').innerText = userEmail;