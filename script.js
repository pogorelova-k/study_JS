/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
'strict';

let listDefault = document.querySelector('.dropdown-lists__list--default'),
    listSelect = document.querySelector('.dropdown-lists__list--select'),
    listAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
    selectCountry = '',
    inputValue = '',
    link = '',
    country = '';

const url = '/db_cities copy.json',
    input = document.getElementById('select-cities'),
    closeBtn = document.querySelector('.close-button'),
    button = document.querySelector('.button'),
    dropdown = document.querySelector('.dropdown-lists');

//* закрытие списка, если поле пустое
document.addEventListener('click', event => {
    if (!event.target.closest('.input-cities') && !input.value) {
        listDefault.style.display = 'none';
        listAutocomplete.style.display = 'none';
        listSelect.style.display = 'none';
    } else {
        input.focus();
    }
});

//*  кнопка перейти
button.addEventListener('click', event => {
    let target = event.target;
    input.focus();

    if (link === '') {
        button.href = '#';
        event.preventDefault();
    } else {
        button.href = link;
        button.setAttribute('target', '_blank');
        link = '';
    }
});

// запрос на севрер и получение данных
fetch(url)
    // переводим в формат json
    .then(response => response.json())
    // получаем наши данные
    .then(data => {
        getDataDefault(data);
    })
    .catch(error => console.error(error));

//* очистка поля input
closeBtn.addEventListener('click', () => {
    input.value = '';

    listDefault.style.display = 'block';
    listAutocomplete.style.display = 'none';
    listSelect.style.display = 'none';

    if (input.value === '') {
        closeBtn.style.display = 'none';
    }
    link = '';
});

//*при наведени на инпут
input.addEventListener('focus', () => {

    //* при выборе города или страны из списка, получаем данные
    if  (input.value) {
        // запрос на севрер и получение данных
        fetch(url)
            // переводим в формат json
            .then(response => response.json())
            // получаем наши данные
            .then(data => {
                getDataAutocomplete(data);
            })
            .catch(error => console.error(error));

        inputValue = input.value;
        // показываем кнопку крестик для очищения поля поиска
        closeBtn.style.display = 'block';
        // скрываем все поля
        listAutocomplete.style.display = 'none';
        listSelect.style.display = 'none';
        listDefault.style.display = 'none';

        // если выбрана страна, то блок не скрывается
        if (country === input.value) {
            listAutocomplete.style.display = 'block';
        }

    } else {
        // открываем список о всех странах и ТОП 3 городах кажлй страны
        listDefault.style.display = 'block';
        listAutocomplete.style.display = 'none';
    }

    //* клик по списку при поиске listAutocomplete
    listAutocomplete.addEventListener('click', event => {
        let target = event.target;

        // при поиске по клику выводим данные в инпут
        if (target.closest('.dropdown-lists__line')) {
            target = target.closest('.dropdown-lists__line');
            input.value = target.childNodes[1].textContent;
            input.focus();
        } else if (target.closest('.dropdown-lists__total-line')) {
            // клик по стране listSelect
            target = target.closest('.dropdown-lists__total-line');
            input.value = '';

            // возврат к списку стран по умолчанию
            if (target) {
                listSelect.style.display = 'none';
                listAutocomplete.style.display = 'none';
                listDefault.style.display = 'block';
            }
        }
    });

    //* клик по списку выбранной страны listSelect
    listSelect.addEventListener('click', e => {
        let target = e.target;

        // клик по городу в списке выбранной страны
        if (target.closest('.dropdown-lists__line')) {
            target = target.closest('.dropdown-lists__line');
            input.value = target.childNodes[1].textContent;
            input.focus();

        } else if (target.closest('.dropdown-lists__total-line')) {
            // клик по стране listSelect
            target = target.closest('.dropdown-lists__total-line');
            input.value = '';

            // возврат к списку стран по умолчанию
            if (target) {
                listSelect.style.display = 'none';
                listDefault.style.display = 'block';
            }
        }
    });

    //* клик в списке по умолчанию listDefault
    listDefault.addEventListener('click', event => {
        let target = event.target;

        // клик по стране в списке по умолчанию
        if (target.closest('.dropdown-lists__total-line')) {

            target = target.closest('.dropdown-lists__total-line');
            input.focus();
            input.value = target.childNodes[1].textContent;
            link = '';

            listDefault.style.display = 'none';
            listSelect.style.display = 'block';
            closeBtn.style.display = 'block';

            // запрос на севрер и получение данных
            fetch(url)
                // переводим в формат json
                .then(response => response.json())
                // получаем наши данные
                .then(data => {
                    getDataSelect(data);
                })
                .catch(error => console.error(error));

            selectCountry = target.childNodes[1].textContent;

            // клик по городу в списке по умолчанию
        } else if (target.closest('.dropdown-lists__line')) {

            target = target.closest('.dropdown-lists__line');
            input.value = target.childNodes[1].textContent;
            input.focus();
        }
    });

    //* изменнения значения в инпуте при вводе
    input.addEventListener('input', () => {
        input.value = input.value.replace('-', '–');
        // запрос на севрер и получение данных
        fetch(url)
            // переводим в формат json
            .then(response => response.json())
            // получаем наши данные
            .then(data => {
                getDataAutocomplete(data);
            })
            .catch(error => console.error(error));

        if (input.value) {
            inputValue = input.value;
            listAutocomplete.style.display = 'block';
            listSelect.style.display = 'none';
            listDefault.style.display = 'none';
        } else {
            listDefault.style.display = 'block';
            listAutocomplete.style.display = 'none';
        }
    });
});

//* отображения списка по умолчанию
function getDataDefault(response) {
    const countryBlock =  document.createElement('div');
    let content = '';

    listDefault.querySelector('.dropdown-lists__col').innerHTML = '';

    countryBlock.classList.add('dropdown-lists__countryBlock');

    for (const key in response) {
        // eslint-disable-next-line no-loop-func
        response[key].forEach(element => {
            // сортировка по count
            element.cities.sort((a, b) => (Number(a.count) < Number(b.count) ? 1 : -1));

            // add country
            content +=  `<div class="dropdown-lists__total-line">
                                <div class="dropdown-lists__country">${element.country}</div>
                                <div class="dropdown-lists__count">${element.count}</div>
                            </div>`;

            // add cities
            for (let i = 0; i < 3; i++) {
                const cities = element.cities[i];

                content += `<div class="dropdown-lists__line">
                                <div class="dropdown-lists__city dropdown-lists__city--ip">${cities.name}</div>
                                <div class="dropdown-lists__count">${cities.count}</div>
                            </div>
                            `;
            }
        });
    }

    countryBlock.innerHTML = content;
    listDefault.querySelector('.dropdown-lists__col').append(countryBlock);
}

//* отображения списка при выборе страны
function getDataSelect(response) {
    const countryBlock =  document.createElement('div');
    let content = '';

    listSelect.querySelector('.dropdown-lists__col').innerHTML = '';

    countryBlock.classList.add('dropdown-lists__countryBlock');

    for (const key in response) {
        // eslint-disable-next-line no-loop-func
        response[key].forEach(element => {
            // сортировка по count
            element.cities.sort((a, b) => (Number(a.count) < Number(b.count) ? 1 : -1));

            if (element.country === selectCountry) {
                country = element.country;
                // add country
                content =  `<div class="dropdown-lists__total-line">
                                <div class="dropdown-lists__country">${element.country}</div>
                                <div class="dropdown-lists__count">${element.count}</div>
                            </div>`;

                element.cities.forEach(city => {
                    content += `<div class="dropdown-lists__line">
                                    <div class="dropdown-lists__city dropdown-lists__city--ip">${city.name}</div>
                                    <div class="dropdown-lists__count">${city.count}</div>
                                </div>`;
                });
            }
        });
    }

    countryBlock.innerHTML = content;
    listSelect.querySelector('.dropdown-lists__col').append(countryBlock);
}

//* отображение списка при поиске
function getDataAutocomplete(response) {
    const countryBlock =  document.createElement('div');
    let content = '',
        nothingFound = '',
        count = 0;

    listAutocomplete.querySelector('.dropdown-lists__col').innerHTML = '';

    countryBlock.classList.add('dropdown-lists__countryBlock');

    for (const key in response) {
        // eslint-disable-next-line no-loop-func
        response[key].forEach(element => {
            // сортировка по count
            element.cities.sort((a, b) => (Number(a.count) < Number(b.count) ? 1 : -1));

            for (const keyCountry in element) {
                if (element['country'] === inputValue) {
                    content =  `<div class="dropdown-lists__total-line">
                                <div class="dropdown-lists__country">${element.country}</div>
                                <div class="dropdown-lists__count">${element.count}</div>
                            </div>`;
                    // eslint-disable-next-line no-loop-func
                    element['cities'].forEach(city => {
                        content += `<div class="dropdown-lists__line">
                                        <div class="dropdown-lists__city dropdown-lists__city--ip">${city.name}</div>
                                        <div class="dropdown-lists__count">${city.count}</div>
                                    </div>`;
                    });
                }
            }

            element.cities.forEach(city => {
                if (city.name.toLowerCase().match(input.value.toLowerCase())) {
                    count++;

                    if (count === 1) {
                        link = city.link;
                    } else {
                        link = '';
                    }

                    content +=  `<div class="dropdown-lists__line">
                                    <div class="dropdown-lists__country">${city.name}</div>
                                    <div class="dropdown-lists__count">${city.count}</div>
                                </div>`;

                } else if (countryBlock.innerHTML === '') {
                    nothingFound = `<div class="dropdown-lists__line">Ничего не найдено</div>`;
                }
            });
        });

        if (content) {
            countryBlock.innerHTML = content;
        } else {
            countryBlock.innerHTML = nothingFound;
        }

        listAutocomplete.querySelector('.dropdown-lists__col').append(countryBlock);
    }
}
