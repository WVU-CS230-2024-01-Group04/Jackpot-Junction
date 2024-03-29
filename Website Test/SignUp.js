document.addEventListener("DOMContentLoaded", function() {
    let signUpForm = document.getElementById("Registration");
    signUpForm.addEventListener("submit", checkForm);

    function checkForm(event) {
        let newUsername = document.getElementById("newUsername");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let reEnterPassword = document.getElementById("reentrypassword");

        // Validation for re-entering the pass
        if (password.value !== reEnterPassword.value) {
            alert("Passwords do not match!");
            event.preventDefault(); 
        }
        // Validation for checking the password length
        else if (password.value.length < 8) {
            alert("Password needs to be 8 or more characters!");
            event.preventDefault();
        }
        // Validation for checking for an uppercase letter
        else if(!(/[A-Z]/.test(password.value))) {
            alert("Password needs at least one uppercase letter!");
            event.preventDefault();
        }
        // Validation for checking for special charcters
        // Feel free to add more special characters as needed
        else if(!(/[!@$#?*%&]/.test(password.value))) {
            alert("Password needs at least one special character!")
            event.preventDefault();
        }
        else { //password is valid
            console.log("registering user "+newUsername.value);
            localStorage.setItem("loginInfo", JSON.stringify({username: newUsername.value, email: email.value, pw: password.value}))
        }
    }
});

console.log("running");