const generateUniqueId = (data) => {
    let newId;
    let idExists = true;
    while (idExists) {
        newId = Math.floor(100000 + Math.random() * 900000).toString();
        idExists = data.some(employee => employee.id === newId);
    }
    return newId;
}

const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@%-_';
    let password = '';
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}

const addEmployee = (employeeList, newEmployee) => {
    employeeList.push(newEmployee)
}

const addRecord = (recordList, newRecord) => {
    recordList.push(newRecord)
}

const formFieldsReset = () => {
    document.querySelector('.employee-form').reset();
    document.querySelector('.record-form').reset();
}

export { generateUniqueId, generateRandomPassword, addEmployee, addRecord, formFieldsReset }
