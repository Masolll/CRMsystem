import {getOrdersFromDb} from "../util.js";
import {selectedDate} from "./form-calendar.js";

const timeColumn = document.querySelector('.time-column');
const timeInput = document.getElementById('custom-time');
const timeDropdown = document.querySelector('.time-dropdown');
const monthYearElement = document.getElementById('monthYear');

const renderTimeColumn = async (employeeLogin) => {
    let times = [];
    const startHour = 8;
    const endHour = 22;

    for (let hour = startHour; hour <= endHour; hour++) {
        const timeString = hour.toString().padStart(2, '0') + ':00';
        times.push(timeString);
    }
    
    if(employeeLogin !== ""){//логин "" стоит по умолчанию для случая когда пользователь еще не выбрал сотрудника
        const orders = await getOrdersFromDb();
        const params = new URLSearchParams(window.location.search);
        const recordId = params.get("recordId");
        const ordersSelectEmployee = orders.filter(e => e.EmployeeLogin === employeeLogin);
        
        for(let i = 0; i < ordersSelectEmployee.length; i++){
            let currentOrderDateTime = new Date(ordersSelectEmployee[i].DateTime);
            if (selectedDate.getDay() === currentOrderDateTime.getDay() //проверяю соотетствет ли выбранная пользователем дата с датой ордера
                && selectedDate.getMonth() === currentOrderDateTime.getMonth()//если соответствует значит есть какой-то ордер на эту дату, 
                && selectedDate.getFullYear() === currentOrderDateTime.getFullYear()){//а значит и время этого ордера нужно убрать из доступного времени для записи
                
                //исключаю время ордера из списка доступного времени
                times = times.filter(e => e != (currentOrderDateTime.getHours().toString().padStart(2, '0') + ':00'));
            }
        }
    }
    document.getElementById('custom-time').value = "";//очищаю время так как при смене сотрудника или даты должно сбрасываться выбранное ранее время
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
