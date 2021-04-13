'use strict';

const books = document.querySelector('.books');
const book = document.querySelectorAll('.book');
console.log('book: ', book);

books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);


