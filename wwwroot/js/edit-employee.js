import { EMPLOYEE } from './data.js';
import { showEmployeeList } from './employee-list.js';

const togglePasswordsVisibility = () => {
    const passwordField = document.getElementById('edit-password');
    const confirmPasswordField = document.getElementById('edit-confirm-password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        confirmPasswordField.type = 'text';
    } else {
        passwordField.type = 'password';
        confirmPasswordField.type = 'password';
    }
}

const showEditEmployeeForm = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'block';
    document.getElementById('editRecord').style.display = 'none';
}

//находит по id сотрудника и заполняет поля формы Редактирование сотрудника и отображет их
// const openEditEmployeeForm = (employeeId) => {
//     document.getElementById('edit-employee-id-hidden').value = employeeId;
//     const employee = EMPLOYEE.find(e => e.id === employeeId);
//     if (!employee) {
//         console.error('Сотрудник не найден');
//         return;
//     }
//
//     document.getElementById('edit-employee-name').value = employee.name;
//     document.getElementById('edit-position').value = employee.position;
//     document.getElementById('edit-phone').value = employee.phone;
//     document.getElementById('edit-email').value = employee.email;
//     document.getElementById('edit-employee-id').value = employee.id;
//     document.getElementById('edit-password').value = employee.password;
//     document.getElementById('edit-confirm-password').value = employee.password;
//     document.querySelector('.edit-password-visibility').addEventListener('click', () => togglePasswordsVisibility());
//
//     showEditEmployeeForm();
// };

// const handleEditEmployeeSubmit = () => {
//     const employeeId = document.getElementById('edit-employee-id-hidden').value;
//     const employee = EMPLOYEE.find(e => e.id === employeeId);
//     if (!employee) {
//         console.error('Сотрудник не найден');
//         return;
//     }
//
//     const password = document.getElementById('edit-password').value;
//     const confirmPassword = document.getElementById('edit-confirm-password').value;
//     if (password !== confirmPassword) {
//         alert('Пароли не совпадают');
//         return;
//     }
//
//     employee.name = document.getElementById('edit-employee-name').value;
//     employee.position = document.getElementById('edit-position').value;
//     employee.phone = document.getElementById('edit-phone').value;
//     employee.email = document.getElementById('edit-email').value;
//     employee.id = document.getElementById('edit-employee-id').value;
//     employee.password = password;
//
//     showEmployeeList();
//     alert('Данные сотрудника обновлены!');
// };
//
// document.querySelector('.edit-employee-form').addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     handleEditEmployeeSubmit();
// });

// export { openEditEmployeeForm };
