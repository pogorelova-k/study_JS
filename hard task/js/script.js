'use strict';

let array = ['1234556', '2354343242', '23423425', '876353', '43288482', '98773', '348763'];

for (let i = 0; i < array.length; i++) {
    if (array[i].charAt(0) === '2' || array[i].charAt(0) === '4') {
        console.log(array[i]);
    };
    
};