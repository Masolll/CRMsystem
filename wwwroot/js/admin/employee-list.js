const employeeItems = document.querySelectorAll('.employee-item');
employeeItems.forEach(item => {
    const employeeId = item.querySelector('.employee-id').textContent.slice(4);
    const employeePassword = item.querySelector('.employee-password').value;

    item.querySelector('.copy-data').addEventListener('click', () => {
        navigator.clipboard.writeText(`ID: ${employeeId}, Password: ${employeePassword}`)
            .then(() => {
                const message = document.createElement('div');
                message.textContent = 'Данные сотрудника скопированы в буфер обмена';
                message.style.position = 'fixed';
                message.style.top = '12px';
                message.style.left = '50%';
                message.style.transform = 'translateX(-50%)';
                message.style.backgroundColor = '#4CAF50';
                message.style.color = '#FFFFFF';
                message.style.fontWeight = 'bold';
                message.style.padding = '10px 20px';
                message.style.border = '1px solid #388E3C';
                message.style.borderRadius = '8px';
                message.style.fontSize = '16px';
                message.style.zIndex = '999';
                document.body.appendChild(message);

                setTimeout(() => {
                    message.style.display = 'none';
                }, 2000);
            })
            .catch(err => alert('Не удалось скопировать данные: ' + err));
    });
});

const showEmployeeList = () => {
    document.getElementById('employees').style.display = 'block';
    document.getElementById('records').style.display = 'none';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'none';
}

const searchEmployeeList = () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    employeeItems.forEach(item => {
        const fullName = item.querySelector('.full-name').textContent.toLowerCase();
        const position = item.querySelector('.job-title p').textContent.toLowerCase();
        const employeeId = item.querySelector('.employee-id').textContent.toLowerCase();

        if (fullName.includes(searchInput) || position.includes(searchInput) || employeeId.includes(searchInput)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
};

const clearSearch = () => {
    document.getElementById('searchInput').value = '';
    const employeeItems = document.querySelectorAll('.employee-item');
    employeeItems.forEach(item => {
        item.style.display = 'flex';
    });
};

document.getElementById('searchInput').addEventListener('input', searchEmployeeList);
document.querySelector('.clear-employee-search-button').addEventListener('click', clearSearch);
document.querySelector('.show-employees-list').addEventListener('click', () => showEmployeeList());

export { showEmployeeList }
