import {formFieldsReset } from "/js/util.js";

const showAddEmployeeForm = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'block';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'none';

    formFieldsReset()
}

const togglePasswordsVisibility = () => {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        confirmPasswordField.type = 'text';
    } else {
        passwordField.type = 'password';
        confirmPasswordField.type = 'password';
    }
}

document.querySelector('.show-add-employees-form').addEventListener('click', () => showAddEmployeeForm());
document.querySelector('.password-visibility').addEventListener('click', () => togglePasswordsVisibility());

export { togglePasswordsVisibility };
