const monthYearElement = document.getElementById('monthYear');
const calendarDaysElement = document.getElementById('calendarDays');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const timeSlotsElement = document.querySelector('.time-slots');

const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

let currentDate = new Date();
let selectedDate = new Date(currentDate);

const renderCalendar = () => {
    calendarDaysElement.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

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
            showTimeSlots();
        }
        dayElement.addEventListener('click', () => {
            selectedDate = new Date(year, month, day);
            document.querySelectorAll('.day.selected').forEach(el => el.classList.remove('selected'));
            dayElement.classList.add('selected');
            showTimeSlots();
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
    showTimeSlots();
}

prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

const showTimeSlots = () => {
    const today = new Date();
    const isSameDay =
        today.getFullYear() === selectedDate.getFullYear() &&
        today.getMonth() === selectedDate.getMonth() &&
        today.getDate() === selectedDate.getDate();

    timeSlotsElement.style.display = isSameDay ? 'block' : 'none';

    const dateHeaderElement = document.querySelector('.date-header h1');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const year = selectedDate.getFullYear();
    dateHeaderElement.textContent = `${day}.${month}.${year}`;
}

const todayButton = document.getElementById('todayButton');
todayButton.addEventListener('click', () => {
    currentDate = new Date();
    selectedDate = new Date(currentDate);
    renderCalendar();
});

renderCalendar();
