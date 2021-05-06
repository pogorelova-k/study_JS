// send-ajax-form
const sendForm = () => {
    const erorrMessage = 'Что-то пошло не так...',
        successMesage = 'Спасибо! Мы скоро с вами свяжемся!',
        loadMessage = `<div class="sk-flow sk-center">
            <div class="sk-flow-dot"></div>
            <div class="sk-flow-dot"></div>
            <div class="sk-flow-dot"></div>
        </div>`;

    // const form = document.getElementById('form1');
    const forms = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: #fff;';

    // body - данные из формы
    // resolve=outputData - оповещение пользователей
    // reject=errorData - вывод ошибки
    const postData = body => fetch('./server.php', {
        // настриваем соеденение
        // post - отправка данных на сервер
        method: 'POST',
        // настройка заголовков
        // application/json - отправляем данные в формате json строки
        headers: {
            'Content-Type': 'application/json'
        },
        // данные из инпутов в формате json
        body: JSON.stringify(body)
    });

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');

        // отправка формы
        form.addEventListener('submit', event => {
            event.preventDefault();
            form.append(statusMessage);
            statusMessage.innerHTML = loadMessage;

            // получение данных из формы с помощью FormData
            // получаем значение из всех инпутов формы у которых есть атрибут name
            const formData = new FormData(form);

            // извлекаем данные из formData
            const body = {};
            // вытаскиваем значения из formData с помощью entires() и добавляем в body
            // for (const val of formData.entries()) {
            // 	body[val[0]] = val[1];
            // }

            // другой способ
            formData.forEach((val, key) => {
                body[key] = val;
            });

            // функция для отображения сообщения пользователю
            const outputData = (time = 5000) => {
                statusMessage.textContent = successMesage;
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, time);
            };

            // функция для отображения ошибки пользователю и в консоль
            const errorData = (error, time = 5000) => {
                statusMessage.textContent = erorrMessage;
                console.error(error);
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, time);
            };

            // функция для очищения полей
            const deleteInputFormValue = () => {
                inputs.forEach(item => {
                    item.value = '';
                });
            };

            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    outputData();
                })
                .catch(error => errorData(error))
                .finally(deleteInputFormValue);
        });
    });
};

export default sendForm;
