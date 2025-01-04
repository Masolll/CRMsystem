import './employee-calendar.js';

//выход из аккаунта
const logout = async () => {
    await fetch('/employee/logout', {
        method: 'DELETE'
    })
    window.location.href="/home/index";
}

document.querySelector('.logout-button').addEventListener('click', logout);