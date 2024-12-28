import { renderTimeColumn, timeInputEvent } from './time-picker.js';
import {getEmployeesFromDb, getRecordsFromDb} from "../util.js";
import {selectedDate} from "./form-calendar.js";

const form = document.querySelector('.sign-form');
const timeInput = document.getElementById('custom-time');
const signContainer = document.querySelector('.sign-container');
const confirmationContainer = document.querySelector('.confirmation-container');
const successMessage = document.querySelector('.success-message');
const editButton = document.querySelector('.edit-form-button');

const records = await getRecordsFromDb();
const employees = await getEmployeesFromDb();
const params = new URLSearchParams(window.location.search);
const recordId = params.get("recordId");
const currentRecord = records.find(e => e.Id == recordId);
const currentEmployees = employees.filter(e => currentRecord.EmployeesLogins.includes(e.Login));

const getSelectEmployee = () => currentEmployees.filter(e => e.Login === document.getElementById('employee').value)[0];
const getSelectDateTimeString = () => {
    let date = document.getElementById('selectedDate').value;
    let time = document.getElementById('custom-time').value;
    return `${date}T${time}`;//такой формат год:месяц:деньТчасы:минуты нужен серверу для создания ордера
}

renderTimeColumn("");//по умолчанию сотрудник не выбран поэтому логин равен пустой строке
timeInputEvent();//красит кнопку в зеленый цвет при нажатии или наведении

const renderForm = async () => {
    document.getElementById('sign-name').value = currentRecord.Name;
    const employeesList = document.getElementById('employee');
    
    //заполняю список сотрудников
    currentEmployees.forEach((employee) => {
        let option = document.createElement('option');
        option.value = employee.Login;
        option.classList.add("employee-item");
        option.textContent = `${employee.Surname} ${employee.Name} ${employee.Patronymic}`;
        employeesList.appendChild(option);
    })
    
    //после клика на сотрудника обновляю список времени, так как у разных сотрудников доступны разные временные слоты
    const employeesListItems = document.querySelectorAll('.employee-item');
    employeesListItems.forEach( e => e.addEventListener('click', () => {
        renderTimeColumn(employeesList.value);
    }));
}
renderForm();



const handleFormSubmit = (evt) => {
    evt.preventDefault();
    
    signContainer.style.display = 'none';
    confirmationContainer.style.display = 'block';
    window.scrollTo(0, 0);
    //чтобы получить цену записи нужно currentRecord.Price это если решим добавить поле с ценой
    document.querySelector(".confirmation-title").textContent = currentRecord.Name;
    document.querySelector(".description-container p").textContent = currentRecord.Description;
    document.getElementById("employee-name-confirmation").textContent = `${getSelectEmployee().Surname} ${getSelectEmployee().Name} ${getSelectEmployee().Patronymic}`;
    document.getElementById("date-time-confirmation").textContent = `${document.getElementById('selectedDate').value} ${document.getElementById('custom-time').value}`;
    document.getElementById("address-confirmation").textContent = currentRecord.Address;
    document.getElementById("phone-confirmation").textContent = document.getElementById('phone').value;
    document.getElementById("comment-confirmation").textContent = document.getElementById("comment").value || 'Не добавлен';
};

const handleEditButtonClick = () => {
    confirmationContainer.style.display = 'none';
    signContainer.style.display = 'block';
};

const handleSuccessButtonClick = async () => {
    const clientName = `${document.getElementById('surname').value} ${document.getElementById('name').value} ${document.getElementById('patronymic').value}`;
    const clientEmail = document.getElementById('email').value;
    const clientPhone = document.getElementById('phone').value;
    const clientComment = document.getElementById('comment').value;
    const params = new URLSearchParams(window.location.search);
    const paramsString = `?recordId=${params.get("recordId")}&employeeLogin=${document.getElementById('employee').value}&dateTime=${getSelectDateTimeString()}&clientName=${clientName}&clientEmail=${clientEmail}&clientPhone=${clientPhone}&clientComment=${clientComment}`;
    
    const response = await fetch(`/order/create${paramsString}`, {
        method: 'POST'
    })
    if(!response.ok){
        alert('при отправке формы произошла ошибка!')
    }
    successMessage.style.display = 'block';
    document.body.classList.add('no-scroll');
};

const handleGoHomeButtonClick = () => {
    window.location.href = '/';
    document.body.classList.remove('no-scroll');
};

form.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);
document.querySelector('.confirm-button').addEventListener('click', handleSuccessButtonClick);
document.getElementById('go-home-button').addEventListener('click', handleGoHomeButtonClick);
