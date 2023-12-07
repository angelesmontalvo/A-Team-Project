/*
    ACCOUNT SIGN IN & SIGN UP FORMS
    October 22, 2023
    Angeles Montalvo
    This javascript file is used to handle when the user signs in and signs
*/

// 'signup()': responsible for transitioning to the sign in form when clicking 'sign up'
function signup() {
    var SignupForm = document.getElementById("SignupForm");
    var SigninForm = document.getElementById("SigninForm");
    var Indicator = document.getElementById("Indicator");
    
    if (SignupForm && SigninForm && Indicator) {
        SignupForm.style.transform = "translateX(0px)";
        SigninForm.style.transform = "translateX(0px)";
        Indicator.style.transform = "translateX(100px)";
    }
}

// 'signin()': responsible for transitioning to the sign in form when clicking 'sign in'
function signin() {
    var SignupForm = document.getElementById("SignupForm");
    var SigninForm = document.getElementById("SigninForm");
    var Indicator = document.getElementById("Indicator");

    if (SignupForm && SigninForm && Indicator) {
        SignupForm.style.transform = "translateX(300px)";
        SigninForm.style.transform = "translateX(300px)";
        Indicator.style.transform = "translateX(0px)";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var SigninForm = document.getElementById("SigninForm");
    var SignupForm = document.getElementById("SignupForm");

    // Add event listeners to forms
    if (SigninForm) {
        SigninForm.addEventListener('submit', handleSignInSubmit);
    } else {
        console.log('SigninForm not found');
    }

    if (SignupForm) {
        SignupForm.addEventListener('submit', handleSignUpSubmit);
    } else {
        console.log('SignupForm not found');
    }

    // Function to handle Sign In form submission
    function handleSignInSubmit(event) {
        event.preventDefault();

        var username = SigninForm.querySelector('input[type="text"]').value;
        var password = SigninForm.querySelector('input[type="password"]').value;

        fetch('http://localhost:8080/auth/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid username or password');
                } else {
                    throw new Error('Login failed');
                }
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.jwt);
            document.getElementById('signInSuccessMessage').textContent = 'Login successful!';
            window.location.href = 'account_info.html';
        })
        .catch(error => console.error('Error:', error));
    }

    // Function to handle Sign Up form submission
    function handleSignUpSubmit(event) {
        event.preventDefault();

        var firstName = SignupForm.querySelector('input[placeholder="First name"]').value;
        var lastName = SignupForm.querySelector('input[placeholder="Last Name"]').value;
        var username = SignupForm.querySelector('input[placeholder="Username"]').value;
        var email = SignupForm.querySelector('input[placeholder="Email"]').value;
        var password = SignupForm.querySelector('input[placeholder="Password"]').value;

        fetch('http://localhost:8080/auth/register', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, username, email, password })
        })
        .then(data => {
            document.getElementById('signUpSuccessMessage').textContent = 'Registration successful!';
            setTimeout(closeSuccessModal, 3000);
        })
        .catch(error => console.error('Error:', error));
    }

    // Function to close the success modal
    function closeSuccessModal() {
        document.getElementById('successModal').style.display = 'none';
    }
});