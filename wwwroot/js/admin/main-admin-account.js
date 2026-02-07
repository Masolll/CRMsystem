import './employee-list.js';
import './record-list.js';
import './employee-form.js';
import './record-form.js';
import './edit-employee.js';
import './edit-record.js';
import './load-avatar-admin.js';

//выход из аккаунта
const logout = async () => {
    await fetch('/employee/logout', {
        method: 'DELETE'
    })
    window.location.href="/home/index";
}

document.querySelector('.logout-button').addEventListener('click', logout);
