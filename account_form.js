/*
    ACCOUNT TOGGLE FORM
    October 22, 2023
    Angeles Montalvo
    This javascript file is used to switch between the sign in and sign up form based on user selection
*/

//Declaration of variables obtained from account.html by Id
var SigninForm = document.getElementById("SigninForm");
var SignupForm = document.getElementById("SignupForm");
var Indicator = document.getElementById("Indicator");

    //'signup()': responsible for transitioning to the sign up form when clicking 'sign up'
    function signup() {
        SignupForm.style.transform = "translateX(0px)";
        SigninForm.style.transform = "translateX(0px)";
        Indicator.style.transform = "translateX(100px)";
    }

    //'signin()': responsible for transitioning to the sign in form when clicking 'sign in'
    function signin() {
        SignupForm.style.transform = "translateX(300px)";
        SigninForm.style.transform = "translateX(300px)";
        Indicator.style.transform = "translateX(0px)";
    }