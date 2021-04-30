class Validator {

    constructor({ selector, pattern = {}, method }) {
        this.form = document.querySelector(selector), // селектор формы
        this.pattern = pattern, // кастомные шаблоны, которые можно добавить
        this.method = method; // настройки, которые указывают какие поля будут валидироваться и какие методы применяться
        this.elementsForm = [...this.form.elements].filter(item => item.name === 'user_name' ||
        item.name === 'user_message');
        this.error = new Set(); // сохраняем поле ввода, если там ошибка (без повторений)
    }

    init() {
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            // вынужденно проверяем инпуты, чтобы не отправлялась пустая форма
            this.elementsForm.forEach(elem => this.chekIt({ target: elem }));
            if (this.error.size) { // если ошибок не будет, в this.error получим undefined
                event.preventDefault();
            }
        });
    }

    isValid(elem) {
        const validatorMethod = {
            // пишем методы
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            },
        };

        // делаем проверку, если пользователь не передал методы
        if  (this.method) {
            // определяем методы, которые передал пользователь
            const method = this.method[elem.id];

            if (method) {
                // проверяем методы
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверок этих полей для работы валидатора');
        }

        // возвращаем true по-умолчанию, чтобы, если пользователь не передал поле на валидность
        // (проверяются все поля), то пропуская все условия(validatorMethod) возвращалось true. 
        // т.е. отправлять submit можно
        return true;
    }

    // запуск проверки на валидность и вызывать showError/showSuccess
    chekIt(event) {
        const target = event.target;

        if (this.isValid(target)) {
            this.showSuccess(target);
            // удаляем инпут из коллекции ошибок
            this.error.delete(target);
        } else {
            this.showError(target);
            // добавляем инпут в коллекцию ошибок
            this.error.add(target);
        }
    }

    // если инпут не прошел валидацию
    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    // валидация в инпуте прошла
    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    // Добавление стилей
    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
        input.success {
            border: 2px solid green;
        }
        input.error {
            border: 2px solid red;
        }
        .validator-error {
            font-size: 12px;
            font-family: sans-serif;
            color: red;
        }`;

        document.head.appendChild(style);
    }

    // установка патернов пользователя плагина и моих
    setPattern() {
        // устанавливаем в приоритет паттерны поьзователя
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }
        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
    }
}
