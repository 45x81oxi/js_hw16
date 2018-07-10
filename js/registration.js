// Init
const auth = new Auth();
const ui = new UI;

// Init Elements
const form = document.forms['registration-form'];
const email = form.elements['email'];
const password = form.elements['password'];
const confirmPassword = form.elements['confirm-password'];


//Events
form.addEventListener("submit", onRegistration);


function onRegistration(e) {
    e.preventDefault();
    if (email.value && password.value && confirmPassword.value) {
        if (password.value === confirmPassword.value) {
            auth.register(email.value, password.value)
                .then(() => {
                    // Show success message
                    ui.showAlert('Welcome!', 'success');
                    window.location = 'index.html';
                })
                .catch(err => {
                    //Show error
                    ui.showAlert(err.message, 'error');
                });
        }
    } else {
        ui.showAlert('Please, fill in all the fields', 'error');
    }
}