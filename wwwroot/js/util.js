const formFieldsReset = () => {
    document.querySelector('.employee-form').reset();
    document.querySelector('.record-form').reset();
}

const getOrdersFromDb = () => {
    // Отправка GET-запроса
    return fetch('/order/dbInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

const getEmployeesFromDb = () => {
    // Отправка GET-запроса
    return fetch('/employee/dbInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

const getRecordsFromDb = () => {
    // Отправка GET-запроса
    return fetch('/record/dbInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}



export { formFieldsReset, getOrdersFromDb, getEmployeesFromDb, getRecordsFromDb }
