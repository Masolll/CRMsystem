const generateUniqueId = (data) => {
    let newId;
    let idExists = true;
    while (idExists) {
        newId = Math.floor(100000 + Math.random() * 900000).toString();
        idExists = data.some(employee => employee.id === newId);
    }
    return newId;
}

const formFieldsReset = () => {
    document.querySelector('.employee-form').reset();
    document.querySelector('.record-form').reset();
}

export { generateUniqueId, formFieldsReset }
