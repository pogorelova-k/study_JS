'use strict';

let wrapper = document.querySelector('.wrapper'),
    button = document.querySelector('button'),   
    color = document.getElementById('color'),
    change = document.getElementById('change'),
    body = document.querySelector('body');

function randColor(elem) {

let r = Math.floor(Math.random() * (256)),
    g = Math.floor(Math.random() * (256)),
    b = Math.floor(Math.random() * (256)),
    colorNum = '#' + r.toString(16) + g.toString(16) + b.toString(16);

    elem.style.background = colorNum;
    color.innerText = colorNum;
}

button.addEventListener('click', () => {
    randColor(body);
});
