import { renderTimeColumn, timeInputEvent } from './time-picker.js';

const form = document.querySelector('.sign-form');
const timeInput = document.getElementById('custom-time');
const signContainer = document.querySelector('.sign-container');
const confirmationContainer = document.querySelector('.confirmation-container');
const successMessage = document.querySelector('.success-message');
const editButton = document.querySelector('.edit-form-button');

renderTimeColumn();
timeInputEvent();

const showErrorMessage = () => {
    const errorMessage = document.createElement("div");
    errorMessage.textContent = 'Выберите время в формате HH:MM';
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "12px";
    timeInput.parentElement.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 3000);
}

const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const timeValue = timeInput.value.trim();
    const timeRegex = /^(0[8-9]|1[0-9]|2[0-2]):([0-5][0-9])$/;

    if (!timeRegex.test(timeValue)) {
        timeInput.focus();
        showErrorMessage(timeInput);
    } else {
        signContainer.style.display = 'none';
        confirmationContainer.style.display = 'block';
        window.scrollTo(0, 0);

        const params = new URLSearchParams(window.location.search);
        const recordId = params.get('id');
        const record = RECORDS.find(record => record.id === recordId);

        const employeeId = document.getElementById('employee').value;
        const employee = EMPLOYEE.find(emp => emp.id === employeeId);

        const date = document.getElementById("selectedDate").value.trim();
        const time = timeInput.value.trim();

        document.querySelector(".confirmation-title").textContent = record['name'];
        document.querySelector(".description-container p").textContent = record['description'];
        document.getElementById("employee-name-confirmation").textContent = employee['name'];
        document.getElementById("date-time-confirmation").textContent = `${date} ${time}`;
        document.getElementById("address-confirmation").textContent = record['address'];
        document.getElementById("phone-confirmation").textContent = employee['phone'];
        document.getElementById("comment-confirmation").textContent = document.getElementById("comment").value || 'Не добавлен';
    }
};

const handleEditButtonClick = () => {
    confirmationContainer.style.display = 'none';
    signContainer.style.display = 'block';
};

const handleSuccessButtonClick = () => {
    successMessage.style.display = 'block';
    document.body.classList.add('no-scroll');
};

const handleGoHomeButtonClick = () => {
    window.location.href = 'index.html';
    document.body.classList.remove('no-scroll');
};

form.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);
document.querySelector('.confirm-button').addEventListener('click', handleSuccessButtonClick);
document.getElementById('go-home-button').addEventListener('click', handleGoHomeButtonClick);
