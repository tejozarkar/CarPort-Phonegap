var loginForm = document.getElementById('form-login');

loginForm.addEventListener('submit', register);

function register(e) {
    e.preventDefault();

    var email = document.getElementById('form-email').value;
    var password = document.getElementById('form-password').value;

    if (email == "" || password == "") {
        snackbar('Please enter email & password');
    } else if (email == "admin" && password == "admin") {
        window.location = "admin.html";
    } else {
        $.ajax({
            type: "POST",
            url: "http://carport.xrobotics.io/login.php",
            data: {
                email: email,
                password: password
            }
        }).done(function(response) {
            console.log(response);
            if (response == 'success') {
                localStorage.setItem('email', 'set');
                window.location = "index.html";
            } else {
                snackbar('Invalid credentials');
            }
            // window.location = "login.html";
        });
    }



}