import { EMPLOYEE } from './data.js';

document.querySelector('.login-form-employee').addEventListener('submit', (evt) => {
    evt.preventDefault();

    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;

    const employee = EMPLOYEE.find(emp => emp.id === id && emp.password === password);

    if (employee) {
        localStorage.setItem('currentEmployeeId', employee.id);
        window.location.href = 'employee-account.html';
    } else {
        alert('Неверный ID или пароль');
    }
});
