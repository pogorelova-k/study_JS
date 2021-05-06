// валидация полей
const validator = () => {
    const commandPhoto = document.querySelectorAll('.command__photo'),
        calcItem = document.querySelectorAll('input.calc-item'),
        userInputs = document.querySelectorAll('input');

    // Изменение картинок команды, при наведении
    commandPhoto.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.src = image.dataset.img;
        });
    });

    // ввод только цифр для расчёта стоимости
    calcItem.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/, '');
        });
    });

    // валидация полей ввода для форм
    userInputs.forEach(input => {
        input.addEventListener('input', () => {

            // убираем удваивающиеся пробелы и дефисы во время написания
            input.value = input.value.replace((/[-]+/gi), '-');
            input.value = input.value.replace((/[\s]+/g), ' ');

            if (input.getAttribute('name') === 'user_name') {
                // разрешен только ввод кириллицы в любом регистре, дефиса и пробела
                input.value = input.value.replace((/[^а-яА-Я\s]/), '');
                // Первая буква заглавная, остальные прописные
                input.value = input.value.replace(/(|\s+)\S/g, val => val.toLowerCase());
                input.value = input.value.replace(/(^|\s)\S/g, val => val.toUpperCase());

            } else if (input.getAttribute('name') === 'user_message') {
                // разрешен  только кириллицу, пробелы, цифры и знаки препинания
                // input.value = input.value.replace((/[^а-яА-Я-\s\d:\.,\?!";]/), '');
                input.value = input.value.replace((/[a-zA-Z]/), '');

            } else if (input.getAttribute('name') === 'user_email') {
                // разрешен только ввод ввод латиницы в любом регистре и спецсимволы
                input.value = input.value.replace((/[^a-zA-z@-_.!~*']/gi), '');

            } else if (input.getAttribute('name') === 'user_phone') {
                // разрешен только ввод цифр, круглых скобок и дефис
                input.value = input.value.replace((/[^+?\d]+/gi), '');
            }
        });

        input.addEventListener('blur', () => {

            // удаляем пробелы и дефисы в начале и конце вне фокуса инпута без вставки
            input.value = input.value.replace((/^-/), '');
            input.value = input.value.replace((/-$/), '');
            input.value = input.value.replace((/^\s/gi), '');
            input.value = input.value.replace((/\s$/gi), '');

            if (input.getAttribute('name') === 'user_name') {
                if ((/[^а-яА-Я\s-]/).test(input.value)) {
                    input.value = input.value.replace((/[^а-яА-Я\s]/gi), '');
                    input.value = input.value.replace(/(|\s+)\S/g, val => val.toLowerCase());
                    input.value = input.value.replace(/(^|\s)\S/g, val => val.toUpperCase());
                    // убираем удваивающиеся пробелы вне фокуса после вставки
                    input.value = input.value.replace((/[\s]+/g), ' ');
                }

            } else if (input.getAttribute('name') === 'user_message') {
                if ((/[a-zA-Z]/).test(input.value)) {
                    // разрешен только ввод кириллицы в любом регистре, дефиса и пробела
                    input.value = input.value.replace((/[a-zA-Z]/gi), '');
                    // убираем удваивающиеся пробелы и дефисы вне фокуса после вставки
                    input.value = input.value.replace((/[\s]+/g), ' ');
                    input.value = input.value.replace((/[-]+/gi), '-');
                }

            } else if (input.getAttribute('name') === 'user_email') {
                if ((/[^a-zA-z-@_.!~*']/).test(input.value)) {
                    // разрешен только ввод ввод латиницы в любом регистре и спецсимволы
                    input.value = input.value.replace((/[^a-zA-z@-_.!~*']/gi), '');
                    // убираем удваивающиеся пробелы и дефисы вне фокуса после вставки
                    input.value = input.value.replace((/[\s]+/g), ' ');
                    input.value = input.value.replace((/[-]+/gi), '-');
                }

            } else if (input.getAttribute('name') === 'user_phone') {
                if ((/[^\d()-]/).test(input.value)) {
                    // разрешен только ввод цифр, круглых скобок и дефис
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
