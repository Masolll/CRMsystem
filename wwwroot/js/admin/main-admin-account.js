import './employee-list.js';
import './record-list.js';
import './employee-form.js';
import './record-form.js';
import './edit-employee.js';
import './edit-record.js';

//выход из аккаунта
const logout = async () => {
    await fetch('/employee/logout', {
        method: 'DELETE'
    })
    window.location.href="/admin/registration";
}

document.querySelector('.logout-button').addEventListener('click', logout);
