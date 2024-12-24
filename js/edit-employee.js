import { EMPLOYEE } from './data.js';
import { showEmployeeList } from './employee-list.js';

const showEditEmployeeForm = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'block';
    document.getElementById('editRecord').style.display = 'none';
}

const openEditEmployeeForm = (employeeId) => {
    document.getElementById('edit-employee-id-hidden').value = employeeId;
    const employee = EMPLOYEE.find(e => e.id === employeeId);
    if (!employee) {
        console.error('Сотрудник не найден');
        return;
    }

    document.getElementById('edit-employee-name').value = employee.name;
    document.getElementById('edit-position').value = employee.position;
    document.getElementById('edit-phone').value = employee.phone;
    document.getElementById('edit-email').value = employee.email;
    document.getElementById('edit-employee-id').value = employee.id;

    showEditEmployeeForm();
};

const handleEditEmployeeSubmit = () => {
    const employeeId = document.getElementById('edit-employee-id-hidden').value;
    const employee = EMPLOYEE.find(e => e.id === employeeId);
    if (!employee) {
        console.error('Сотрудник не найден');
        return;
    }

    employee.name = document.getElementById('edit-employee-name').value;
    employee.position = document.getElementById('edit-position').value;
    employee.phone = document.getElementById('edit-phone').value;
    employee.email = document.getElementById('edit-email').value;
    employee.id = document.getElementById('edit-employee-id').value;

    showEmployeeList();
    alert('Данные сотрудника обновлены!');
};

document.querySelector('.edit-employee-form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleEditEmployeeSubmit();
});

export { openEditEmployeeForm };
