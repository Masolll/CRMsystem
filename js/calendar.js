const monthYearElement = document.getElementById("monthYear");
const calendarDaysElement = document.getElementById("calendarDays");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const timeSlotsElement = document.querySelector(".time-slots");

const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

let currentDate = new Date(); // Текущая дата
let selectedDate = new Date(currentDate); // Выбранная дата

function renderCalendar() {
    calendarDaysElement.innerHTML = ""; // Очищаем текущие дни
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Устанавливаем название месяца и года
    monthYearElement.textContent = `${monthNames[month]} ${year}`;

    // Определяем количество дней в месяце и первый день
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Выводим дни предыдущего месяца
    const startDay = (firstDay === 0) ? 6 : firstDay - 1; // Исправляем смещение дней
    for (let i = startDay; i > 0; i--) {
        const day = document.createElement("div");
        day.textContent = daysInPrevMonth - i + 1;
        day.className = "day inactive";
        calendarDaysElement.appendChild(day);
    }

    // Выводим дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        dayElement.className = "day";

        // Если день совпадает с текущим, выделяем его
        if (
            currentDate.getFullYear() === selectedDate.getFullYear() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            day === selectedDate.getDate()
        ) {
            dayElement.classList.add("selected");
            showTimeSlots();
        }

        dayElement.addEventListener("click", () => {
            // Обновляем выбранную дату
            selectedDate = new Date(year, month, day);

            // Убираем выделение с других дней
            document.querySelectorAll(".day.selected").forEach(el => el.classList.remove("selected"));

            // Выделяем текущий день
            dayElement.classList.add("selected");

            // Обновляем отображение записи
            showTimeSlots();
        });

        calendarDaysElement.appendChild(dayElement);
    }

    // Выводим дни следующего месяца
    const remainingDays = 42 - (startDay + daysInMonth); // Всего 6 недель по 7 дней = 42 ячейки
    for (let i = 1; i <= remainingDays; i++) {
        const day = document.createElement("div");
        day.textContent = i;
        day.className = "day inactive";
        calendarDaysElement.appendChild(day);
    }

    // Скрываем запись, если выбран другой месяц
    showTimeSlots();
}

// Навигация между месяцами
prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Отображение записи только для выбранной даты
function showTimeSlots() {
    const today = new Date();
    const isSameDay =
        today.getFullYear() === selectedDate.getFullYear() &&
        today.getMonth() === selectedDate.getMonth() &&
        today.getDate() === selectedDate.getDate();

    // Обновляем отображение записи
    timeSlotsElement.style.display = isSameDay ? "block" : "none";

    // Обновляем дату в .date-header
    const dateHeaderElement = document.querySelector(".date-header h1");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const year = selectedDate.getFullYear();
    dateHeaderElement.textContent = `${day}.${month}.${year}`;
}

const todayButton = document.getElementById("todayButton");
todayButton.addEventListener("click", () => {
    // Устанавливаем текущую дату
    currentDate = new Date();
    selectedDate = new Date(currentDate); // Устанавливаем выбранную дату в текущую

    // Перерисовываем календарь с учетом новой даты
    renderCalendar();
});


// Инициализация календаря
renderCalendar();
