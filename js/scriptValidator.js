/* eslint-disable indent */
'strict';

window.addEventListener('DOMContentLoaded', () => {
    const validForm1 = new Validator({
        selector: '#form1',
        pattern: {
            phone: /^[а-яА-я-\s]+$/,
        },
        method: {
            'form1-name': [
                // метод проверяет пустое поле phone или нет
                ['notEmpty'],
                // проверяет поле по определённому паттерну (которые мы указали в pattern при создании valid)
                ['pattern', 'phone'],
            ],
        }
    });

    const validForm2 = new Validator({
        selector: '#form2',
        pattern: {
            phone: /^[а-яА-я-\s]+$/,
            email: /^[а-яА-я-\s]+$/,
        },
        method: {
            'form2-name': [
                // метод проверяет пустое поле phone или нет
                ['notEmpty'],
                // проверяет поле по определённому паттерну (которые мы указали в pattern при создании valid)
                ['pattern', 'phone'],
            ],
            'form2-message': [
                // метод проверяет пустое поле email или нет
                ['notEmpty'],
                // проверяет поле по определённому паттерну (которые мы указали в pattern при создании valid)
                ['pattern', 'email']
            ]
        }
    });

    const validForm3 = new Validator({
        selector: '#form3',
        pattern: {
            phone: /^[а-яА-я-\s]+$/,
            email: /^[а-яА-я-\s]+$/,
        },
        method: {
            'form3-name': [
                // метод проверяет пустое поле phone или нет
                ['notEmpty'],
                // проверяет поле по определённому паттерну (которые мы указали в pattern при создании valid)
                ['pattern', 'phone'],
            ],
            'form3-message': [
                // метод проверяет пустое поле email или нет
                ['notEmpty'],
                // проверяет поле по определённому паттерну (которые мы указали в pattern при создании valid)
                ['pattern', 'email']
            ]
        }
    });
	validForm1.init();
	validForm2.init();
});
