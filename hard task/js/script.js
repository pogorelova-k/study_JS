'use strict';

let string = '  Lorem   ipsum, dolor sit  amet  adipisicing elit.  Lorem   ipsum, dolor sit  amet  adipisicing elit. ';

// Удаляем пробелы в начале и конце строки
function deleteSpace(arg) {
    if (typeof(arg) === 'string') {
        if (arg.length > 30) {
            arg = arg.trim().substr(0, 30).padEnd(33, '...');
        } else {
            arg = arg.trim();
        }
        
    } else {
        arg = 'Вы ввели строку не правильно';
    }
    return arg;
}

console.log(deleteSpace(string));
