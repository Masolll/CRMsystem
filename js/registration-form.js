import { ORGANIZATIONS } from './data.js';
import { generateUniqueId } from './util.js';

document.querySelector('.registration-form').addEventListener('submit', function(evt) {
    evt.preventDefault();

    const orgName = document.getElementById('org-name').value;
    const inn = document.getElementById('inn').value;
    const surname = document.getElementById('surname').value;
    const name = document.getElementById('name').value;
    const patronymic = document.getElementById('patronymic').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const newOrganization = {
        id: generateUniqueId(ORGANIZATIONS),
        orgName: orgName,
        inn: inn,
        surname: surname,
        name: name,
        patronymic: patronymic,
        email: email,
        phone: phone,
        login: login,
        password: password
    };

    ORGANIZATIONS.push(newOrganization);

    localStorage.setItem('newOrganization', JSON.stringify(newOrganization));
    localStorage.setItem('isNewOrganization', 'true');
    window.location.href = 'admin-account.html';
});
