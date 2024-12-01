import { EMPLOYEE, RECORDS } from './data.js';
import { showRecordList } from './record-list.js';

const showEditRecordForm = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'block';
}

const openEditRecordForm = (recordId) => {
    document.getElementById('edit-record-id-hidden').value = recordId;
    const record = RECORDS.find(r => r.id === recordId);
    if (!record) {
        console.error('Запись не найдена');
        return;
    }

    document.getElementById('edit-record-name').value = record.name;
    document.getElementById('edit-price').value = record.price;
    document.getElementById('edit-address').value = record.address;
    document.getElementById('edit-description').value = record.description;

    const employeeSelect = document.getElementById('edit-employee');
    employeeSelect.innerHTML = '';
    EMPLOYEE.forEach((employee) => {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = `${employee.id} - ${employee.name}`;
        employeeSelect.appendChild(option);
    })
    showEditRecordForm();
};

const handleEditRecordSubmit = () => {
    const recordId = document.getElementById('edit-record-id-hidden').value;
    const record = RECORDS.find(r => r.id === recordId);
    if (!record) {
        console.error('Запись не найдена');
        return;
    }

    record.name = document.getElementById('edit-record-name').value;
    record.price = document.getElementById('edit-price').value;
    record.address = document.getElementById('edit-address').value;
    record.description = document.getElementById('edit-description').value;

    const employeeSelect = document.getElementById('edit-employee');
    const selectedEmployeeIds = Array.from(employeeSelect.selectedOptions).map(option => option.value);
    
    const updatedEmployees = {};
    selectedEmployeeIds.forEach(employeeId => {
        const employee = EMPLOYEE.find(emp => emp.id === employeeId);
        if (employee) {
            updatedEmployees[employeeId] = employee.name;
        }
    });
    record.employee = updatedEmployees;

    showRecordList();
    alert('Данные записи обновлены!');
};

document.querySelector('.edit-record-form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleEditRecordSubmit();
});

export { openEditRecordForm };
