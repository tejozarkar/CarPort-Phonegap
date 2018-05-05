var registerForm = document.getElementById('form-register');

registerForm.addEventListener('submit', register);

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function register(e) {
    e.preventDefault();
    var name = document.getElementById('form-name').value;
    var mobile = document.getElementById('form-mobile').value;
    var email = document.getElementById('form-email').value;
    var password = document.getElementById('form-password').value;
    var passwordAgain = document.getElementById('form-password-again').value;

    if (name == "" && mobile == "" && email == "" && password == "" && passwordAgain == "") {
        snackbar('Please provide all details');
    } else if (password != passwordAgain) {
        snackbar('Passwords do not match');
    } else if (!validateEmail(email)) {
        snackbar('Invalid email');
    } else {


        $.ajax({
            type: "POST",
            url: "http://carport.xrobotics.io/register.php",
            data: {
                name: name,
                mobile: mobile,
                email: email,
                password: password
            }
        }).done(function(response) {
            console.log(response);
            if (response == "Success") {
                window.location = "login.html";
            } else {
                snackbar(response);
            }

        });
    }
}