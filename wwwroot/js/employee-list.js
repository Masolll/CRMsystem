import { EMPLOYEE } from './data.js';
import { openEditEmployeeForm } from './edit-employee.js';

const renderEmployeeList = (employeeArray) => {
    const employeeListContainer = document.getElementById('employeeList');
    const employeeListTemplate = document.getElementById('employee-template').content;
    employeeListContainer.innerHTML = '';

    if (employeeArray.length === 0) {
        employeeListContainer.innerHTML = `<p class="no-employees-found">Сотрудники не найдены</p>`;
        return;
    }

    employeeArray.forEach(employee => {
        const employeeItem = document.importNode(employeeListTemplate, true);

        employeeItem.querySelector('.full-name').textContent = employee.name;
        employeeItem.querySelector('.job-title p').textContent = employee.position;
        employeeItem.querySelector('.employee-id').textContent = `ID: ${employee.id}`;

        employeeItem.querySelector('.employee-profile').addEventListener('click', () => {
            alert(`Профиль сотрудника: ${employee.name}`);
        });
        employeeItem.querySelector('.copy-data').addEventListener('click', () => {
            navigator.clipboard.writeText(`ID: ${employee.id}, Password: ${employee.password}`)
                .then(() => alert('Данные скопированы в буфер обмена!'))
                .catch(err => alert('Не удалось скопировать данные: ' + err));
        });
        employeeItem.querySelector('.employee-edit').addEventListener('click', () => openEditEmployeeForm(employee.id));

        employeeListContainer.appendChild(employeeItem);
    });
}

const searchEmployee = () => {
    const search = document.getElementById('searchInput').value.trim().toLowerCase();
    const filteredEmployees = EMPLOYEE.filter(employee => 
        employee.name.toLowerCase().includes(search) || 
        employee.position.toLowerCase().includes(search) ||
        employee.id.toLowerCase().includes(search)
    );
    renderEmployeeList(filteredEmployees);
}

const clearSearch = () => {
    document.getElementById('searchInput').value = '';
    renderEmployeeList(EMPLOYEE);
}

const showEmployeeList = () => {
    document.getElementById('employees').style.display = 'block';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'none';
    
    clearSearch();
}

document.querySelector('.show-employees-list').addEventListener('click', () => showEmployeeList());
document.getElementById('searchInput').addEventListener('input', () => searchEmployee())
document.querySelector('.clear-employee-search-button').addEventListener('click', () => clearSearch())

// Инициализация списка сотрудников при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderEmployeeList(EMPLOYEE);
});

export { renderEmployeeList, showEmployeeList }
