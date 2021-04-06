'use strict';
let lang = 'en';
let daysOfWeek = {};
let namePerson = 'Ксюша';

//todo  ---Вывод дней недели в зависимости от языка---- 
//* через IF
if (lang === 'ru') {
    console.log( 
        'if:',
        'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'
    );
} else if (lang === 'en') {
    console.log(
        'if: ',
        'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'
    );
};

//* через switch-case
switch (lang) {
    case 'ru':
        console.log( 
            'switch-case: ',
            'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'
        );
        break;
    case 'en':
        console.log(
            'switch-case: ',
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'
        );
        break;
    default: 
        console.log( 
            'switch-case default: ',
            'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'
        );
        break;
};

//* через мноомерный массив
daysOfWeek = {
    'ru': ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    'en': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};
console.log('многомерный массив', daysOfWeek[lang]);


//todo Тернарные операторы
namePerson === 'Артём' ? console.log(namePerson,': директор') : namePerson === 'Максим' ? console.log(namePerson,': преподаватель') : console.log(namePerson,': студент');




