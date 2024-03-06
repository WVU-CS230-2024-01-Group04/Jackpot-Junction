document.addEventListener("DOMContentLoaded", function() {
    let signUpForm = document.getElementById("Registration");
    signUpForm.addEventListener("submit", checkForm);

    function checkForm(event) {
        let newUsername = document.getElementById("newUsername");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let reEnterPassword = document.getElementById("reEnterPassword");

        // Validation for re-entering the pass
        if (password.value !== reEnterPassword.value) {
            alert("Passwords do not match!");
            event.preventDefault(); 
        }
        
        if (password.length <= 8) {
            alert("Password needs to be 8 or more characters!");
            event.preventDefault();
        }
    
        // If more validation is needed later add it here

        console.log("registered user "+newUsername.value);
    }
});

console.log("running");