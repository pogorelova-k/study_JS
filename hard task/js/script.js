'use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскрсенье'];
let dayOfWeek = document.querySelector('.day-of-week');
let str = '';
let today = new Date();

week.forEach((item, i) => {
    if (i === today.getDay() - 1) {
        item = '<b>'+ item +'</b>';
    }
    if (i === 5 || i === 6) {
        item = '<i>'+ item +'</i>';
    } 
    str += item+'<br>';
});

dayOfWeek.innerHTML = str;