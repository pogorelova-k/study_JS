/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable indent */
'strict';

function displayDate() {
    const   days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            declinationDay = ['день', 'дня', 'дней'],
            date = new Date(),
            day = days[date.getDay() - 1];
            time = date.toLocaleTimeString('en-US')
            timeDay = ''    ,
            hour = date.getHours(),
            dateStop = new Date('1 january 2022'),
            timeRemaining = (dateStop.getTime() - date.getTime()) / 1000,
            countDay = Math.floor(timeRemaining / 60 / 60 / 24);

    if (hour >= 0 && hour <= 6) {
        timeDay = 'Доброй ночи';
    } else if (hour > 6 && hour <= 12) {
        timeDay = 'Доброе утро';
    } else if (hour > 12 && hour <= 18) {
        timeDay = 'Добрый день';
    } else if (hour > 18 && hour <= 23) {
        timeDay = 'Добрый вечер';
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
    }

    let div = document.createElement('div');
    div = `  ${timeDay}! <br>
        Сегодня: ${day}<br>
        Текущее время: ${time}<br>
        До нового года осталось ${countDay} ${declinationDay[declension(declinationDay, countDay)]}`;

    document.body.innerHTML = div;
}

displayDate();
