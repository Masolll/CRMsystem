import './employee-calendar.js';

//выход из аккаунта
const logout = async () => {
    await fetch('/employee/logout', {
        method: 'DELETE'
    })
    window.location.href="/admin/registration";
}

document.querySelector('.logout-button').addEventListener('click', logout);