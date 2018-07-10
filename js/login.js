// Init
const auth = new Auth();
const ui = new UI;

// Init Elements
const form = document.forms['login-form'];
const email = form.elements['email'];
const password = form.elements['password'];

//Check auth state
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location = 'index.html';
    }
});

//Events
form.addEventListener("submit", onLogin);

function onLogin(e) {
    e.preventDefault();
    if (email.value && password.value) {
        auth.login(email.value, password.value)
            .then(() => window.location = 'index.html')
            .catch(err => {
                ui.showAlert(err.message, 'error');
            });
    } else {
        ui.showAlert('Please, fill in all the fields', 'error');
    }
}