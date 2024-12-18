import './employee-calendar.js';
import { EMPLOYEE } from './data.js';

window.addEventListener('DOMContentLoaded', () => {
    const currentEmployeeId = localStorage.getItem('currentEmployeeId');
    if (currentEmployeeId) {
        const existingEmployee = EMPLOYEE.find(emp => emp.id === currentEmployeeId);
        if (existingEmployee) {
            const nameParts = existingEmployee.name.split(' ');
            const surname = nameParts[0];
            const name = nameParts[1];
            const patronymic = nameParts[2];

            document.querySelector('.profile-info p:nth-child(1)').textContent = surname;
            document.querySelector('.profile-info p:nth-child(2)').textContent = name;
            document.querySelector('.profile-info p:nth-child(3)').textContent = patronymic;
            document.getElementById('user-id').value = existingEmployee.id;
            document.getElementById('phone').value = existingEmployee.phone;
            document.getElementById('email').value = existingEmployee.email;
        }
    }
});
