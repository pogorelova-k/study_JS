/* eslint-disable no-undef */
'strict';

const   input = document.getElementById('input');
text = document.getElementById('text');

// Передаем функцию и миллисеккунды
const debounce = (fn, msec) => {

    let lastCall = 0,
        lastCallTimer = 0; // id таймера

    return (...args) => {
        const previousCall = lastCall;
        lastCall = Date.now();
        // проверка был ли previousCall
        if (previousCall && (lastCall - previousCall) < msec) {
            // если не прошло msec, то сбрасываем таймер lastCallTimer
            clearInterval(lastCallTimer);
        }

        // таймер который запускаем при вызове
        lastCallTimer = setTimeout(() => fn(...args), msec);

    };
};

const showText = () => {
    text.textContent = input.value;
};

const showTextDebounce = debounce(showText, 300);

setInterval(() => {
    showTextDebounce();
}, 400);

// Если прошло больше 300 мили секунд, то сообщение НЕ выведется,
// Если прошло меньше 300 мили секунд то выведется