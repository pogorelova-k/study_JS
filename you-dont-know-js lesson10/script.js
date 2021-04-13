'use strict';

const books = document.querySelector('.books');
const book = document.querySelectorAll('.book');
const body = document.querySelector('body');
const chaptersBookTwo = book[0].querySelectorAll('li');
const chaptersBookFive = book[5].querySelectorAll('li');
console.log('chaptersBookFive: ', chaptersBookFive);


books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);

body.style.backgroundImage = 'url(./image/adv.jpg)';

book[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

body.querySelector('.adv').remove();

chaptersBookTwo[3].after(chaptersBookTwo[6]);
chaptersBookTwo[6].after(chaptersBookTwo[8]);
chaptersBookTwo[9].after(chaptersBookTwo[2]);
chaptersBookFive[1].after(chaptersBookFive[9]);
chaptersBookFive[4].after(chaptersBookFive[2]);
chaptersBookFive[7].after(chaptersBookFive[5]);





