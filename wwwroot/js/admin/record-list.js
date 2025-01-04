const showRecordList = () => {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('records').style.display = 'block';
    document.getElementById('addEmployee').style.display = 'none';
    document.getElementById('addRecord').style.display = 'none';
    document.getElementById('editEmployee').style.display = 'none';
    document.getElementById('editRecord').style.display = 'none';
}

const searchRecordList = () => {
    const searchInput = document.getElementById('searchInputRecord').value.toLowerCase();
    const recordItems = document.querySelectorAll('.record-item');

    recordItems.forEach(item => {
        const name = item.querySelector('.full-name').textContent.toLowerCase();
        const price = item.querySelector('.price').textContent.toLowerCase();
        const address = item.querySelector('.record-adress').textContent.toLowerCase();

        if (name.includes(searchInput) || price.includes(searchInput) || address.includes(searchInput)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
};

const clearRecordSearch = () => {
    document.getElementById('searchInputRecord').value = '';
    const recordItems = document.querySelectorAll('.record-item');
    recordItems.forEach(item => {
        item.style.display = 'flex';
    });
};

document.getElementById('searchInputRecord').addEventListener('input', searchRecordList);
document.querySelector('.clear-record-search-button').addEventListener('click', clearRecordSearch);
document.querySelector('.show-record-list').addEventListener('click', () => showRecordList());

export {  showRecordList }
