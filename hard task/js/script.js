'use strict';
let num = 266219;
let result = 1;

// Произведение цифр числа num
while (num > 0) {
    result = result * (num % 10);
    num =  Math.trunc(num/10);
    continue;
}

console.log(result);
// возведение в степень 
console.log(result **= 3);
// Вывод первых двух цифр числа
console.log(String(result).slice(0, 2));
