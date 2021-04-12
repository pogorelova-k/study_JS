'use strict';

let today = new Date;
let date1 = document.querySelector('.date-1');
let date2 = document.querySelector('.date-2');
let week = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
let hour = ['часа', 'часов', 'час'],
    minute = ['минута', 'минуты', 'минут'],
    second = ['секунда', 'секунды', 'секундо'];

 //  'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'  


                // '04.02.2020 - 21:05:33' 
let partDay =   today.getDate() + '.' + 
                today.getMonth() + '.' + 
                today.getFullYear()  + ' - ' + 
                today.getHours() + ':' + 
                today.getMinutes() + ':' + 
                today.getSeconds();

var decCache = [],
    decCases = [2, 0, 1, 1, 1, 2];
function decOfNum(number, titles)
{
    if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
    return titles[decCache[number]];
}

const changeDeclination = (number) => {
    // if(!decCache[number]) {
    //     if (decCache[number] == number % 100 > 4 && number % 100 < 20) {
    //         decCache[number] = 2;
    //     } else {
    //         decCases[Math.min(number % 10, 5)];
    //     }
    // }    

    let fullDay =   'Сегодня ' + week[today.getDay()] + ', ' + 
                    today.getDate() + ' ' + 
                    months[today.getMonth()] + ' ' + 
                    today.getFullYear()  + ', ' + 
                    today.getHours() + ' ' + hour[number] + ' ' +
                    today.getMinutes() + ' ' + minute[number] + ' ' +
                    today.getSeconds() + ' ' + second[number];

    date1.innerHTML = fullDay;
};


changeDeclination();


date2.innerHTML = partDay;