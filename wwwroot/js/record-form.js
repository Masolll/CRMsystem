import { EMPLOYEE, RECORDS } from './data.js';
import { generateUniqueId, addRecord, formFieldsReset } from './util.js';
import { renderRecordList, showRecordList} from './record-list.js';

const populateEmployeeSelect = () => {
    const employeeSelect = document.getElementById('employee');
    employeeSelect.innerHTML = '';

    EMPLOYEE.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = `ID: ${employee.id} - ${employee.name}`;
        employeeSelect.appendChild(option);
    });
}

const showRecordForm = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'block';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'none';
    populateEmployeeSelect();

    formFieldsReset();
}

const handleRecordRegistration = () => {
    const selectedEmployeeData = Array.from(document.getElementById('employee').selectedOptions).map(option => {
        const employeeId = option.value;
        const employee = EMPLOYEE.find(emp => emp.id === employeeId);
        return employee;
    });

    const recordName = document.getElementById('record-name').value;
    const price = document.getElementById('price').value;
    const employee = selectedEmployeeData.reduce((acc, employee) => {
        acc[employee.id] = employee.name;
        return acc;
    }, {});
    const address = document.getElementById('address').value;
    const description = document.getElementById('description').value;

    const newRecord = {
        id: generateUniqueId(RECORDS),
        name: recordName,
        price: price,
        employee: employee,
        address: address,
        description: description
    };
    addRecord(RECORDS, newRecord);

    renderRecordList(RECORDS);
    showRecordList();

    // Здесь можно отправить данные на сервер
}

document.querySelector('.show-record-form').addEventListener('click', () => showRecordForm());
document.querySelector('.record-form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleRecordRegistration();
});
