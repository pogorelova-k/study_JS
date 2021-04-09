'use strict';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

let isNumber = (n) => {
    // если введем число, вернётся true
    return !isNaN(parseFloat(n)) && isFinite(n); 
};

function playWithBot() { 
    let botNumber = getRandomInt(100); //это должно быть замыканием 
    let countAttempts = 1; // Счётчик попыток
    let attempts = 10; // Количетсво попыток
    function checkNumber(userNumber) {
        
        if (countAttempts < attempts ) {
            while (!isNumber(userNumber)) {
                userNumber = +prompt('Введите число', 75);
            }
            if (userNumber === 0) {
                alert('Игра окончена');
                return;
            }
            if (userNumber > botNumber) {
                alert('Загаданное число меньше, осталось ' + (attempts - countAttempts) + ' попыток(-ки)');
            } else if (userNumber < botNumber) {
                alert('Загаданное число больше, осталось ' + (attempts - countAttempts) + ' попыток(-ки)');
            } else if (userNumber === botNumber) {
                
                if (confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?')) {
                    playWithBot();
                } else {
                    return;
                }
            }
            countAttempts++;
        } else if (userNumber === botNumber) {
            if (confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?')) {
                playWithBot();
            } else {
            countAttempts = 1;
            alert('Игра окончена');
            return;
            }
        }
        console.log('userNumber:',userNumber, 'botNumber:', botNumber, 'countAttempts:', countAttempts);

        checkNumber(+prompt('Угадай число от 1 до 100', 75));
    }
    console.dir(checkNumber);
    return checkNumber(+prompt('Угадай число от 1 до 100', 75));
}
playWithBot();