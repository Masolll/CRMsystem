const showEmployeeList = () => {
    document.getElementById('employees').style.display = 'block';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'none';
}

document.querySelector('.show-employees-list').addEventListener('click', () => showEmployeeList());

export { showEmployeeList }
