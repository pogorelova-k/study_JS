'strict';

document.addEventListener('DOMContentLoaded', () => {
    const convert = document.getElementById('convert'),
        changeBtn = document.getElementById('change-btn'),
        convertibleValue = document.getElementById('convertible-value'),
        resultingValue = document.getElementById('resulting-value'),
        convertibleText = document.getElementById('convertible-text'),
        resultingText = document.getElementById('resulting-text'),

        valuteSelect = document.getElementById('valute'),

        USD = document.getElementById('USD'),
        EUR = document.getElementById('EUR');

    valuteSelect.addEventListener('change', () => {
        resultingValue.value = '';
        convertibleValue.value = '';

        if (convertibleValue.classList.contains('rub')) {
            if (valuteSelect.value === 'usd') {
                resultingText.textContent = 'Доллар США(USD)';
            } else {
                resultingText.textContent = 'Евро (EUR)';
            }
        } else {
            if (valuteSelect.value === 'usd') {
                convertibleText.textContent = 'Доллар США(USD)';
            } else {
                convertibleText.textContent = 'Евро (EUR)';
            }
        }
    });

    changeBtn.addEventListener('click', () => {
        resultingValue.value = '';
        convertibleValue.value = '';

        const temp = resultingText.textContent;
        resultingText.textContent = convertibleText.textContent;
        convertibleText.textContent = temp;

        convertibleValue.classList.toggle('rub');
    });

    resultingValue.setAttribute('disabled', true);

    convertibleValue.addEventListener('keydown', () => {
        convertibleValue.value = convertibleValue.value.replace(/[^\d.]/g, '');
    });

    const getData = () => fetch('https://www.cbr-xml-daily.ru/latest.js');

    convert.addEventListener('click', e => {
        e.preventDefault();

        getData()
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }

                const cursEUR = +EUR.textContent.substring(EUR.textContent.indexOf('—') + 2,
                        EUR.textContent.length - 5).replace(',', '.'),
                    cursUSD = +USD.textContent.substring(USD.textContent.indexOf('—') + 2,
                        USD.textContent.length - 5).replace(',', '.');

                if (convertibleValue.value) {
                    if (convertibleValue.classList.contains('rub')) {
                        if (valuteSelect.value === 'usd') {
                            resultingValue.value = (convertibleValue.value / cursUSD).toFixed(4);
                        } else {
                            resultingValue.value = (convertibleValue.value / cursEUR).toFixed(4);
                        }
                    } else {
                        if (valuteSelect.value === 'usd') {
                            resultingValue.value = convertibleValue.value * cursUSD;
                        } else {
                            resultingValue.value = convertibleValue.value * cursEUR;
                        }
                    }
                }
            })
            .catch(error => console.error(error));
    });
});
