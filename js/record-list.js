import { RECORDS } from './data.js';
import { openEditRecordForm } from './edit-record.js';

const renderRecordList = (recordArray) => {
    const recordListContainer = document.getElementById('recordList');
    const recordListTemplate = document.getElementById('record-template').content;
    recordListContainer.innerHTML = '';

    if (recordArray.length === 0) {
        recordListContainer.innerHTML = `<p class="no-records-found">Записи не найдены</p>`;
        return;
    }

    recordArray.forEach(record => {
        const recordItem = document.importNode(recordListTemplate, true);

        recordItem.querySelector('.full-name').innerHTML = `${record.name}<br><strong>Стоимость:</strong> ${record.price}`;
        Object.entries(record.employee).forEach(([, name]) => {
            const employeeElement = document.createElement('p');
            employeeElement.textContent = name;
            recordItem.querySelector('.record-employees').appendChild(employeeElement);
        });
        recordItem.querySelector('.record-description').innerHTML = `<strong>Описание:</strong><br>${record.description}`;
        recordItem.querySelector('.record-adress').innerHTML = `<strong>Адрес:</strong><br>${record.address}`;

        recordItem.querySelector('.record-edit').addEventListener('click', () => openEditRecordForm(record.id));

        recordListContainer.appendChild(recordItem);
    });
}

const searchRecord = () => {
    const search = document.getElementById('searchInputRecord').value.trim().toLowerCase();
    const filteredRecords = RECORDS.filter(record => 
        record.name.toLowerCase().includes(search) || 
        record.description.toLowerCase().includes(search)
    );
    renderRecordList(filteredRecords);
}

const clearRecordSearch = () => {
    document.getElementById('searchInputRecord').value = '';
    renderRecordList(RECORDS);
}

const showRecordList = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'block';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'none';

    clearRecordSearch();
}

document.querySelector('.show-record-list').addEventListener('click', () => showRecordList());
document.getElementById('searchInputRecord').addEventListener('input', () => searchRecord())
document.querySelector('.clear-record-search-button').addEventListener('click', () => clearRecordSearch())

document.addEventListener('DOMContentLoaded', () => {
    renderRecordList(RECORDS);
});

export { renderRecordList, showRecordList }
