import { ORGANIZATIONS } from './data.js';

document.querySelector('.login-form-admin').addEventListener('submit', (evt) => {
    evt.preventDefault();

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const organization = ORGANIZATIONS.find(org => org.login === login && org.password === password);

    if (organization) {
        localStorage.setItem('currentOrgId', organization.id);
        window.location.href = 'admin-account.html';
    } else {
        alert('Неверный логин или пароль');
    }
});
