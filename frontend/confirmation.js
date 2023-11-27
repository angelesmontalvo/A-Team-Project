/*
    DISPLAY EMAIL ADDRESS 
    November 15, 2023
    Angeles Montalvo
    This javascript file is used to obtain the email address the confirmation email was sent to
*/

document.addEventListener('DOMContentLoaded', function () {
    var userEmail = document.getElementById('userEmail');
    userEmail.textContent = localStorage.getItem('userEmail');
});