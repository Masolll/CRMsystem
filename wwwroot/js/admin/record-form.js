import { formFieldsReset } from '/js/util.js';

//скрытие всех блоков кроме создания записи
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

document.querySelector('.show-record-form').addEventListener('click', () => showRecordForm());
