'use strict';

let  botNumber = getRandomInt(100);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

let isNumber = (n) => {
    // если введем число, вернётся true
    return !isNaN(parseFloat(n)) && isFinite(n); 
};

function playBot() {
    let userNumber = +prompt('Угадай число от 1 до 100', 75);
    while (!isNumber(userNumber)) {
        userNumber = +prompt('Введите число', 75);
    }
    if (userNumber === 0) {
        alert('Игра окончена');
        return;
    }
    if (userNumber > botNumber) {
        alert('Загаданное число меньше');
    } else if (userNumber < botNumber) {
        alert('Загаданное число больше');
    } else if (userNumber === botNumber) {
        alert('Поздравляю, Вы угадали!!! ');
        return;
    }
    console.log('userNumber:',userNumber, 'botNumber:', botNumber);
    
    playBot();
}

playBot();
