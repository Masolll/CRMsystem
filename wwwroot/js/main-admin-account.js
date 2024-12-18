import { ORGANIZATIONS } from './data.js';

import './employee-list.js';
import './record-list.js';
import './employee-form.js';
import './record-form.js';

window.addEventListener('DOMContentLoaded', () => {
    const isNewOrganization = localStorage.getItem('isNewOrganization');

    if (isNewOrganization) {
        const storedOrganization = localStorage.getItem('newOrganization');
        if (storedOrganization) {
            const organization = JSON.parse(storedOrganization);

            document.querySelector('h1').textContent = organization.orgName;
            document.querySelector('.profile-info p:nth-child(1)').textContent = organization.surname;
            document.querySelector('.profile-info p:nth-child(2)').textContent = organization.name;
            document.querySelector('.profile-info p:nth-child(3)').textContent = organization.patronymic;
            document.getElementById('user-id').value = organization.login;
            document.getElementById('phone-side').value = organization.phone;
            document.getElementById('email-side').value = organization.email;

            localStorage.removeItem('isNewOrganization');
        }
    } else {
        const currentOrgId = localStorage.getItem('currentOrgId');
        if (currentOrgId) {
            const existingOrganization = ORGANIZATIONS.find(org => org.id === currentOrgId);
            if (existingOrganization) {
                document.querySelector('h1').textContent = existingOrganization.orgName;
                document.querySelector('.profile-info p:nth-child(1)').textContent = existingOrganization.surname;
                document.querySelector('.profile-info p:nth-child(2)').textContent = existingOrganization.name;
                document.querySelector('.profile-info p:nth-child(3)').textContent = existingOrganization.patronymic;
                document.getElementById('user-id').value = existingOrganization.login;
                document.getElementById('phone-side').value = existingOrganization.phone;
                document.getElementById('email-side').value = existingOrganization.email;
            }
        }
    }
});

