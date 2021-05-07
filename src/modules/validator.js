// валидация полей
const validator = () => {
    const calcItem = document.querySelectorAll('input.calc-item'),
        userInputs = document.querySelectorAll('input');

    // ввод только цифр для расчёта стоимости
    calcItem.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/, '');
        });
    });

    // валидация полей ввода для форм
    userInputs.forEach(input => {
        input.addEventListener('input', () => {
            const form = input.closest('form'),
                formBtn = form.querySelector('.form-btn');

            // убираем удваивающиеся пробелы и дефисы во время написания
            input.value = input.value.replace((/[-]+/gi), '-');
            input.value = input.value.replace((/[\s]+/g), ' ');

            if (input.getAttribute('name') === 'user_name') {
                // отменяется отправка формы, если имя меньше 2 букв
                if (input.value.length < 2) {
                    formBtn.disabled = true;
                } else {
                    formBtn.removeAttribute('disabled');
                }

                if (input.value.length < 51) {
                    // разрешен только ввод кириллицы в любом регистре и пробела
                    input.value = input.value.replace((/[^а-яА-Я\s]/gi), '');
                } else {
                    // удаляется строка если она больше 50
                    input.value = input.value.substring(0, 50);
                }

                // Первая буква заглавная, остальные прописные
                input.value = input.value.replace(/(|\s+)\S/g, val => val.toLowerCase());
                input.value = input.value.replace(/(^|\s)\S/g, val => val.toUpperCase());

            } else if (input.getAttribute('name') === 'user_message') {
                // разрешен ввод символов всех кроме латиницы
                input.value = input.value.replace((/[a-zA-Z]/), '');

            } else if (input.getAttribute('name') === 'user_email') {
                formBtn.disabled = true;

                // разрешен только ввод ввод латиницы в любом регистре и спецсимволы
                input.value = input.value.replace((/[^a-zA-z@-_.!~*']/gi), '');

                // разрешаем отправку если корректно введён email
                if (input.value.match(/\w+@\w+\.\w{2,3}/)) {
                    formBtn.removeAttribute('disabled');
                }

            } else if (input.getAttribute('name') === 'user_phone') {
                // запрет отправки формы
                // если начинается с +, символов - 12
                // если с 8, символов - 11
                if (input.value[0] === '+' && input.value.length < 12) {
                    formBtn.disabled = true;
                } else if (input.value[0] === '8' && input.value.length < 11) {
                    formBtn.disabled = true;
                } else if (input.value[0] !== '+' && input.value[0] !== '8') {
                    formBtn.disabled = true;
                } else {
                    formBtn.removeAttribute('disabled');
                }

                // разрешен только ввод цифр и +
                input.value = input.value.replace((/[^+?\d]+/gi), '');
            }
        });

        input.addEventListener('blur', () => {
            const form = input.closest('form'),
                formBtn = form.querySelector('.form-btn');

            // удаляем пробелы и дефисы в начале и конце вне фокуса инпута без вставки
            input.value = input.value.replace((/^-/), '');
            input.value = input.value.replace((/-$/), '');
            input.value = input.value.replace((/^\s/gi), '');
            input.value = input.value.replace((/\s$/gi), '');

            if (input.getAttribute('name') === 'user_name') {
                if ((/[^а-яА-Я\s-]/).test(input.value)) {
                    // отменяется отправка формы, если имя меньше 2 букв
                    if (input.value.length < 2) {
                        formBtn.disabled = true;
                    } else {
                        formBtn.removeAttribute('disabled');
                    }

                    if (input.value.length < 51) {
                        // разрешен только ввод кириллицы в любом регистре и пробела
                        input.value = input.value.replace((/[^а-яА-Я\s]/gi), '');
                    } else {
                        // удаляется строка если она больше 50
                        input.value = input.value.substring(0, 50);
                    }

                    input.value = input.value.replace(/(|\s+)\S/g, val => val.toLowerCase());
                    input.value = input.value.replace(/(^|\s)\S/g, val => val.toUpperCase());
                    // убираем удваивающиеся пробелы вне фокуса после вставки
                    input.value = input.value.replace((/[\s]+/g), ' ');
                }

            } else if (input.getAttribute('name') === 'user_message') {
                if ((/[a-zA-Z]/).test(input.value)) {
                    // разрешен ввод символов всех кроме латиницы
                    input.value = input.value.replace((/[a-zA-Z]/gi), '');

                    // убираем удваивающиеся пробелы и дефисы вне фокуса после вставки
                    input.value = input.value.replace((/[\s]+/g), ' ');
                    input.value = input.value.replace((/[-]+/gi), '-');
                }

            } else if (input.getAttribute('name') === 'user_email') {
                if ((/[^a-zA-z-@_.!~*']/).test(input.value)) {
                    formBtn.disabled = true;

                    // разрешен только ввод ввод латиницы в любом регистре и спецсимволы
                    input.value = input.value.replace((/[^a-zA-z@-_.!~*']/gi), '');

                    // разрешаем отправку если корректно введён email
                    if (input.value.match(/\w+@\w+\.\w{2,3}/)) {
                        formBtn.removeAttribute('disabled');
                    }

                    // убираем удваивающиеся пробелы и дефисы вне фокуса после вставки
                    input.value = input.value.replace((/[\s]+/g), ' ');
                    input.value = input.value.replace((/[-]+/gi), '-');
                }

            } else if (input.getAttribute('name') === 'user_phone') {
                if ((/[^\d()-]/).test(input.value)) {
                    // запрет отправки формы
                    // если начинается с +, символов - 12
                    // если с 8, символов - 11
                    if (input.value[0] === '+' && input.value.length < 12) {
                        formBtn.disabled = true;
                    } else if (input.value[0] === '8' && input.value.length < 11) {
                        formBtn.disabled = true;
                    } else if (input.value[0] !== '+' && input.value[0] !== '8') {
                        formBtn.disabled = true;
                    } else {
                        formBtn.removeAttribute('disabled');
                    }

                    // разрешен только ввод цифр и +
                    input.value = input.value.replace((/[^\d+]+/g), '');
                    // убираем удваивающиеся пробелы и дефисы вне фокуса после вставки
                    input.value = input.value.replace((/[\s]+/g), ' ');
                    input.value = input.value.replace((/[-]+/gi), '-');
                }
            }
        });
    });
};

export default validator;
