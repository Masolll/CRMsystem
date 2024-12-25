const timeColumn = document.querySelector('.time-column');
const timeInput = document.getElementById('custom-time');
const timeDropdown = document.querySelector('.time-dropdown');

const startHour = 8;
const endHour = 22;
const times = [];

for (let hour = startHour; hour <= endHour; hour++) {
    const timeString = hour.toString().padStart(2, '0') + ':00';
    times.push(timeString);
}

const renderTimeColumn = () => {
    timeColumn.innerHTML = '';
    times.forEach(time => {
        const timeButton = document.createElement('button');
        timeButton.type = 'button';
        timeButton.textContent = time;
        timeButton.addEventListener('click', () => {
            timeInput.value = time;
            timeDropdown.classList.remove('active');
        });
        timeColumn.appendChild(timeButton);
    });
};

const timeInputEvent = () => {
    timeInput.addEventListener('focus', () => {
        timeDropdown.classList.add('active');
    });
    document.addEventListener('click', (evt) => {
        if (!evt.target.closest('.custom-time-picker')) {
            timeDropdown.classList.remove('active');
        }
    });
};

export { renderTimeColumn, timeInputEvent };
