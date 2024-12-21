const showRecordList = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'block';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'none';
}

document.querySelector('.show-record-list').addEventListener('click', () => showRecordList());

export {  showRecordList }
