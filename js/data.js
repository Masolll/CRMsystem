let EMPLOYEE = [
    { id: '743122', name: 'Иванов Иван Иванович', position: 'Менеджер', phone: '1-222-333-44-55', email: 'ivanov@example.com', password: 'password123' },
    { id: '324017', name: 'Петров Петр Петрович', position: 'Разработчик', phone: '1-333-444-55-66', email: 'petrov@example.com', password: 'password123' },
    { id: '517173', name: 'Сидоров Сидор Сидорович', position: 'Тестировщик', phone: '1-444-555-66-77', email: 'sidorov@example.com', password: 'password123' },
    { id: '866490', name: 'Александров Александр Александрович', position: 'Дизайнер', phone: '1-555-666-77-88', email: 'alexandrov@example.com', password: 'password123' },
    { id: '324157', name: 'Романова Лариса Викторовна', position: 'Архитектор', phone: '1-777-555-44-33', email: 'romanova@example.com', password: 'password789' },
    { id: '431234', name: 'Лукашев Игорь Валерьевич', position: 'Менеджер', phone: '1-555-777-88-99', email: 'lukashev@example.com', password: 'password234' },
    { id: '876541', name: 'Романов Роман Владимирович', position: 'Программист', phone: '1-777-888-99-00', email: 'romanov@example.com', password: 'password234' },
    { id: '192837', name: 'Васильева Татьяна Сергеевна', position: 'Маркетолог', phone: '1-888-999-00-11', email: 'vasilieva@example.com', password: 'password345' },
    { id: '495837', name: 'Смирнов Сергей Михайлович', position: 'Продажник', phone: '1-999-111-22-33', email: 'smirnov@example.com', password: 'password345' },
    { id: '587238', name: 'Козлов Алексей Петрович', position: 'Дизайнер', phone: '1-222-444-66-77', email: 'kozlov@example.com', password: 'password456' },
    { id: '768392', name: 'Андреев Андрей Николаевич', position: 'Системный администратор', phone: '1-444-555-66-99', email: 'andreev@example.com', password: 'password456' }
];

let RECORDS = [
    {
        id: '334981',
        name: 'Услуга по ремонту бытовой техники',
        price: '2500', 
        employee: {
            '743122': 'Иванов Иван Иванович',
            '324017': 'Петров Петр Петрович',
            '517173': 'Сидоров Сидор Сидорович'
        },
        address: 'Москва, улица Ленина, дом 15, корпус 2, квартира 45, этаж 4, подъезд 3',
        description: 'Мы предоставляем услуги по ремонту бытовой техники, включая стиральные машины, холодильники, микроволновые печи, посудомоечные машины и другую бытовую технику. В нашем сервисе работают опытные мастера, которые используют только качественные запчасти и гарантируют высокое качество работы.'
    },
    {
        id: '551234',
        name: 'Ремонт компьютеров и техники',
        price: '1500', 
        employee: {
            '431234': 'Лукашев Игорь Валерьевич',
            '876541': 'Романов Роман Владимирович'
        },
        address: 'Москва, улица Победы, дом 10, квартира 1',
        description: 'Ремонт компьютеров, ноутбуков и периферийной техники. Мы проводим диагностику, ремонтируем и настраиваем устройства.'
    },
    {
        id: '874651',
        name: 'Строительные услуги',
        price: '5000', 
        employee: {
            '874512': 'Александров Александр Александрович',
            '324157': 'Романова Лариса Викторовна'
        },
        address: 'Санкт-Петербург, проспект Невский, дом 45',
        description: 'Предоставляем услуги по строительству и ремонту. Выполним работы любой сложности – от мелкого ремонта до строительства с нуля.'
    },
    {
        id: '892345',
        name: 'Модный дизайн интерьера',
        price: '7000',
        employee: {
            '192837': 'Васильева Татьяна Сергеевна',
            '495837': 'Смирнов Сергей Михайлович'
        },
        address: 'Москва, улица Модная, дом 22, квартира 11',
        description: 'Предлагаем услуги по дизайну интерьера для квартир, домов, офисов. Индивидуальный подход и использование современных материалов.'
    },
    {
        id: '392817',
        name: 'Проектирование и монтаж систем безопасности',
        price: '10000', 
        employee: {
            '587238': 'Козлов Алексей Петрович',
            '768392': 'Андреев Андрей Николаевич'
        },
        address: 'Москва, улица Безопасности, дом 10',
        description: 'Разрабатываем и устанавливаем системы безопасности для домов и офисов, включая видеонаблюдение, сигнализацию, системы контроля доступа.'
    }
];

let ORGANIZATIONS = [
    {
        id: '579123',
        orgName: 'ООО Пример',
        inn: '0123456789',
        surname: 'Иванов',
        name: 'Иван',
        patronymic: 'Иванович',
        email: 'example@company.com',
        phone: '1-222-333-44-55',
        login: 'org_login',
        password: 'password123',
        employeeIds: ['743122', '324017', '517173'],
        recordIds: ['334981']
    },
    {
        id: '742812',
        orgName: 'АО Ремонт-Сервис',
        inn: '9876543210',
        surname: 'Петров',
        name: 'Петр',
        patronymic: 'Петрович',
        email: 'info@remont-service.com',
        phone: '1-333-444-55-66',
        login: 'repair_login',
        password: 'securepassword789',
        employeeIds: ['431234', '876541'],
        recordIds: ['551234']
    },
    {
        id: '983172',
        orgName: 'ЗАО СтройПром',
        inn: '5678901234',
        surname: 'Смирнов',
        name: 'Алексей',
        patronymic: 'Михайлович',
        email: 'contact@stroyprom.com',
        phone: '1-444-555-66-77',
        login: 'construction_login',
        password: 'password321',
        employeeIds: ['866490', '324157'],
        recordIds: ['874651']
    },
    {
        id: '129384',
        orgName: 'ИП Мода 2024',
        inn: '1234567890',
        surname: 'Кузнецова',
        name: 'Мария',
        patronymic: 'Александровна',
        email: 'contact@moda2024.ru',
        phone: '1-555-666-77-88',
        login: 'fashion_login',
        password: 'fash2024pass',
        employeeIds: ['192837', '495837'],
        recordIds: ['892345']
    },
    {
        id: '384761',
        orgName: 'ООО ТехноГрупп',
        inn: '6543210987',
        surname: 'Васильев',
        name: 'Никита',
        patronymic: 'Павлович',
        email: 'support@technogrupp.ru',
        phone: '1-666-777-88-99',
        login: 'techgroup_login',
        password: 'techgroup321',
        employeeIds: ['587238', '768392'],
        recordIds: ['392817']
    }
];

export { EMPLOYEE, RECORDS, ORGANIZATIONS }
