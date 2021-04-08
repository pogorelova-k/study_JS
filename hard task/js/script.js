'use strict';

let array = ['1234556', '2354343242', '23423425', '876353', '43288482', '98773', '348763'];

for (let i = 0; i < array.length; i++) {
    if (array[i].charAt(0) === '2' || array[i].charAt(0) === '4') {
        console.log(array[i]);
    };
    
};

// 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
nextStep:
for (let i = 2; i < 100; i++) {
    for (let j = 2; j < i; j++) {
        if ( i % j === 0 ) {
            continue nextStep;
        } 
    }
    console.log(i, ': Делители 1 и ', i);
};
