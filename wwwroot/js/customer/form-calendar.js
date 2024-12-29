import {renderTimeColumn} from "./time-picker.js"

const monthYearElement = document.getElementById('monthYear');
const calendarDaysElement = document.getElementById('calendarDays');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const hiddenDateInput = document.getElementById('selectedDate');

const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

let currentDate = new Date();
let selectedDate = new Date(currentDate);
//записываю в скрытое поле с выбранной дату дату сегодняшнего дня
const day = currentDate.getDate();
const month = selectedDate.getMonth() + 1;
const year = selectedDate.getFullYear();
const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
hiddenDateInput.value = formattedDate;


const renderCalendar = () => {
    calendarDaysElement.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    monthYearElement.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const startDay = (firstDay === 0) ? 6 : firstDay - 1;
    for (let i = startDay; i > 0; i--) {
        const day = document.createElement('div');
        day.textContent = daysInPrevMonth - i + 1;
        day.className = 'day inactive';
        calendarDaysElement.appendChild(day);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.className = 'day';
        if (
            currentDate.getFullYear() === selectedDate.getFullYear() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            day === selectedDate.getDate()
        ) {
            dayElement.classList.add('selected');
        }
        if (month === selectedDate.getMonth() && day < currentDay) {
            dayElement.classList.add('inactive');
        }
        dayElement.addEventListener('click', () => {
            if (dayElement.classList.contains('inactive')) {
                return;
            }
            selectedDate = new Date(year, month, day);
            document.querySelectorAll('.day.selected').forEach(el => el.classList.remove('selected'));
            dayElement.classList.add('selected');
        });
        calendarDaysElement.appendChild(dayElement);
    }

    const remainingDays = 42 - (startDay + daysInMonth);
    for (let i = 1; i <= remainingDays; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        day.className = 'day inactive';
        calendarDaysElement.appendChild(day);
    }

    if (currentDate.getFullYear() === new Date().getFullYear() && currentDate.getMonth() === new Date().getMonth()) {
        prevMonthButton.disabled = true;
        prevMonthButton.classList.add('disabled');
    } else {
        prevMonthButton.disabled = false;
        prevMonthButton.classList.remove('disabled');
    }
}

prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

const todayButton = document.getElementById('todayButton');
todayButton.addEventListener('click', () => {
    currentDate = new Date();
    selectedDate = new Date(currentDate);
    renderCalendar();
});

//обработчик на каждый день календаря
calendarDaysElement.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.classList.contains('day') && !target.classList.contains('inactive')) {
        
        //обновляю список времени
        renderTimeColumn(document.getElementById('employee').value);
        
        const day = target.textContent;
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        hiddenDateInput.value = formattedDate;
    }
});

todayButton.addEventListener('click', () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const formattedDate = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
    hiddenDateInput.value = formattedDate;
});

renderCalendar();

export {selectedDate};