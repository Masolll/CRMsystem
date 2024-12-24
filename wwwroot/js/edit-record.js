import {getEmployeesFromDb} from "./edit-employee.js"

var editRecordButtons = document.querySelectorAll('.record-edit');
editRecordButtons.forEach((element) => {
    element.addEventListener('click', (event) => {
        let recordId = event.target.getAttribute("data-record-id");
        generateEditRecordForm(recordId);
        showEditRecordForm();
    })
})

let getRecordsFromDb = () => {
    // Отправка GET-запроса
    return fetch('/record/dbInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
const generateEditRecordForm = async (recordId) => {
    let records = await getRecordsFromDb();
    let currentRecord = records.filter(e => e.Id === recordId)[0];
    
    document.getElementById('edit-record-name').value = currentRecord.Name;
    document.getElementById('edit-price').value = currentRecord.Price;
    document.getElementById('edit-address').value = currentRecord.Address;
    document.getElementById('edit-description').value = currentRecord.Description;
    document.getElementById('edit-record-id-hidden').value = currentRecord.Id;

    //генерирую список всех сотрудников
    let employees = await getEmployeesFromDb();
    const employeesSelectList = document.getElementById('edit-employee');
    employeesSelectList.innerHTML = '';
    employees.forEach((employee) => {
        const option = document.createElement('option');
        option.value = employee.Login;
        option.textContent = `${employee.Login} - ${employee.Surname} ${employee.Name} ${employee.Patronymic}`;
        
        if(currentRecord.EmployeesLogins.includes(employee.Login)){ //если сотрудник на текущей итерации уже содержится в записи то делаю его "выбранным"
            option.selected = true;
        }
        employeesSelectList.appendChild(option);
    })
}

const showEditRecordForm = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'block';
}

