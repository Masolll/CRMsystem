import {getEmployeesFromDb} from "../util.js";

var editEmployeeButtons = document.querySelectorAll('.employee-edit');
editEmployeeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        let employeeLogin = event.target.getAttribute('data-employee-login');//получаю логин сотрудника на которого нажали
        generateEditEmployeeForm(employeeLogin)//генерирую страницу редактирования сотрудника
        showEditEmployeeForm()//отображаю страницу редактирования сотрудника
    });
})

const showEditEmployeeForm = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'block';
    document.getElementById('editRecord').style.display = 'none';
}

const generateEditEmployeeForm = async (employeeLogin) => {
    var employees = await getEmployeesFromDb();
    let currentEmployee = employees.filter(employee => employee.Login === employeeLogin)[0];
    document.getElementById('edit-employee-name').value = currentEmployee.Name;
    document.getElementById('edit-employee-surname').value = currentEmployee.Surname;
    document.getElementById('edit-employee-patronymic').value = currentEmployee.Patronymic;
    document.getElementById('edit-position').value = currentEmployee.Position;
    document.getElementById('edit-phone').value = currentEmployee.Phone;
    document.getElementById('edit-email').value = currentEmployee.Email;
    document.getElementById('edit-employee-id').value = currentEmployee.Login;
    // document.getElementById('edit-password').value = currentEmployee.Password;
    // document.getElementById('edit-confirm-password').value = currentEmployee.Password;
    // document.querySelector('.edit-password-visibility').addEventListener('click', () => togglePasswordsVisibility());
};

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




