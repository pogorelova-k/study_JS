'use strict';

let date1 = document.querySelector('.date-1'),
    date2 = document.querySelector('.date-2'),
    week = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    hours = ['час', 'часа', 'часов'],
    minutes = ['минута', 'минуты', 'минут'],
    seconds = ['секунда', 'секунды', 'секунд'],
    addNull = '';


function updateTime() {
    let today = new Date(),
        day = today.getDate(),
        month = today.getMonth(),
        year = today.getFullYear(),
        hour = today.getHours(),
        minute = today.getMinutes(),
        second = today.getSeconds();

     // Формат: 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'  
    let fullDay =   'Сегодня ' + week[today.getDay()] + ', ' + 
                    day + ' ' + 
                    months[month] + ' ' + 
                    year  + ', ' + 
                    hour + ' ' + hours[declension(hours, hour)] + ' ' +
                    minute + ' ' + minutes[declension(minutes, minute)] + ' ' +
                    second + ' ' + seconds[declension(seconds, second)];

    // Формат: '04.02.2020 - 21:05:33' 
    let partDay =   addNullBefore(day) + day + '.' + 
                    addNullBefore(month) + month + '.' + 
                    year  + ' - ' + 
                    addNullBefore(hour) + hour + ':' + 
                    addNullBefore(minute) + minute + ':' + 
                    addNullBefore(second) + second;

    date1.innerHTML = fullDay;
    date2.innerHTML = partDay;
}

// Функция для определения индекса массива hours
// val - это значение минуты, часа или секунды
// forms - массив, откуда выбирать по индексу нужное слово с правильным окончанием
function declension(forms, val) {
    const cases = [ 2, 0, 1, 1, 1, 2];
    if ((val % 100 > 4 && val % 100 < 20)) {
        return 2;
    } else if (val % 10 < 5) {
        return cases[val % 10];
    } else {
        return cases[5];
    }
};

// функция добавляет ноль, если число меньше 10
function addNullBefore(val) {
    if (val < 10) {
        return '0';
    } else {
        return '';
    }
};

setInterval(updateTime, 1000);