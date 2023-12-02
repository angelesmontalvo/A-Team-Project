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

// Function to handle Sign In form submission
function handleSignInSubmit(event) {
    event.preventDefault();

    // Extract data from the form
    var username = SigninForm.querySelector('input[type="text"]').value;
    var password = SigninForm.querySelector('input[type="password"]').value;

    // Send data to your backend
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
        document.getElementById('signInSuccessMessage').textContent = 'Login successful!';
        console.log('Sign In Success:', data);

        //Handle successful sign-in, by redirecting user to account info html
        window.location.href = 'account_info.html';
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle Sign Up form submission
function handleSignUpSubmit(event) {
    event.preventDefault();

    // Extract data from the form
    // Update these to match your form's input names and your API's expected format
    var firstName = SignupForm.querySelector('input[placeholder="First name"]').value;
    var lastName = SignupForm.querySelector('input[placeholder="Last Name"]').value;
    var username = SignupForm.querySelector('input[placeholder="Username"]').value;
    var email = SignupForm.querySelector('input[placeholder="Email"]').value;
    var password = SignupForm.querySelector('input[placeholder="Password"]').value;

    // Log the extracted values
    console.log('Form Data:', { firstName, lastName, username, email, password });

    // Send data to your backend
    fetch('http://localhost:8080/auth/register', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, username, email, password })
    })

    .then(response => {
        if (response.status === 409) {
            //User already exists
            throw new Error('Username already taken');
        }
        return response.json();
    })

    .then(data => {
        //Display an alert indicating susccesful sign-up
        window.alert('Registration sucessful!');

        document.getElementById('signUpSuccessMessage').textContent = 'Registration successful!';
        console.log('Sign Up Success:', data);

        //close the success modal
        closeSuccessModal();
    })
    .catch(error => {
        //display error message to user
        document.getElementById('registrationErrorMessage').textContent = error.message;
    });
}

//Event listeners to the forms
SigninForm.addEventListener('submit', handleSignInSubmit);
SignupForm.addEventListener('submit', handleSignUpSubmit);

// Function to close the success modal
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}