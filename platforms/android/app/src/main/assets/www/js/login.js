var loginForm = document.getElementById('form-login');

loginForm.addEventListener('submit', register);

function register(e) {
    e.preventDefault();

    var email = (document.getElementById('form-email').value).trim();
    var password = document.getElementById('form-password').value;

    if (email == "" || password == "") {
        snackbar('Please enter email & password');
    } else if (email == "admin" && password == "admin") {
        localStorage.setItem('id', 0);
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
            var res = response.split(" ");
            console.log(res[0]);
            if (res[0] == 'success') {

                localStorage.setItem('id', res[1]);
                window.location = "index.html";
            } else {
                snackbar('Invalid credentials');
            }
            // window.location = "login.html";
        });
    }



}