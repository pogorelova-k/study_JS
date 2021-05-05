document.addEventListener('DOMContentLoaded', () => {
    'strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getCars = () => new Promise((response, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                const data = JSON.parse(request.responseText);
                response(data);
            } else {
                reject(request.statusText);
            }
        });
    });

    const outputData = data => {
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const { brand, model, price } = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }
        });
    };

    const errorData = error => {
        output.innerHTML = 'Произошла ошибка';
        console.error(error);
    };

    select.addEventListener('change', () => {
        getCars()
            .then(outputData)
            .catch(error => errorData(error));
    });

});
