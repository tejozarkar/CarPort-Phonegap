var registerForm = document.getElementById('form-register');

registerForm.addEventListener('submit', register);

function register(e) {
    e.preventDefault();
    var name = document.getElementById('form-name').value;
    var mobile = document.getElementById('form-mobile').value;
    var email = document.getElementById('form-email').value;
    var password = document.getElementById('form-password').value;
    var passwordAgain = document.getElementById('form-password-again').value;

    if (password != passwordAgain) {
        snackbar('Passwords do not match');
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
            }

        });
    }
}