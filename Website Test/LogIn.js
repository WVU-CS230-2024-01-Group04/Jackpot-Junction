document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById("LoggingIn").addEventListener("submit", function(event){
        let username = document.getElementById("username");
        let pw = document.getElementById("password");

        let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
        console.log(loginInfo.username+" "+loginInfo.pw);
        if (username.value !== loginInfo.username || pw.value !== loginInfo.pw){
            alert("Incorrect Username or Password");
            event.preventDefault();
        }
    })
})