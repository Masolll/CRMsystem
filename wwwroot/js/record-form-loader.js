import { RECORDS } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const recordId = params.get('id');
    const record = RECORDS.find(record => record.id === recordId);

    if (record) {
        const signNameInput = document.getElementById('sign-name');
        signNameInput.value = `${record.name}. Стоимость: ${record.price}`;

        const employeeSelect = document.getElementById('employee');
        Object.entries(record.employee).forEach(([id, name]) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = name;
            employeeSelect.appendChild(option);
        });
    } else {
        document.body.innerHTML = '';
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Запись не найдена';
        errorMessage.classList.add('error-message');
        document.body.appendChild(errorMessage);
    }
});
