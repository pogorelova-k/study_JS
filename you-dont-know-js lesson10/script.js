'use strict';

const books = document.querySelector('.books');
const book = document.querySelectorAll('.book');
const body = document.querySelector('body');

books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);

body.style.backgroundImage = 'url(./image/adv.jpg)';

book[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

body.querySelector('.adv').remove();
