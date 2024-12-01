import { EMPLOYEE } from "./data.js";
import { generateUniqueId, generateRandomPassword, addEmployee, formFieldsReset } from "./util.js";
import { renderEmployeeList, showEmployeeList } from "./employee-list.js";

const showAddEmployeeForm = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'block';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'none';

    formFieldsReset()

    const id = generateUniqueId(EMPLOYEE);
    document.getElementById('employee-id').value = id;

    const password = generateRandomPassword();
    document.getElementById('password').value = password;
    document.getElementById('confirm-password').value = password;
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

const handleEmployeeRegistration = () => {
    const employeeName = document.getElementById('employee-name').value;
    const position = document.getElementById('position').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const employeeId = document.getElementById('employee-id').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }
    const newEmployee = {
        id: employeeId,
        name: employeeName,
        position: position,
        phone: phone,
        email: email,
        password: password
    };
    addEmployee(EMPLOYEE, newEmployee);

    renderEmployeeList(EMPLOYEE);
    showEmployeeList();
}

document.querySelector('.show-add-employees-form').addEventListener('click', () => showAddEmployeeForm());
document.querySelector('.password-visibility').addEventListener('click', () => togglePasswordsVisibility());
document.querySelector('.employee-form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleEmployeeRegistration();
});

export { togglePasswordsVisibility };
