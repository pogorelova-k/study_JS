'use strict';

const DomElement = function(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.createElement = function () { 
    let elem;
    if (this.selector.slice(0, 1) === '.') {
        elem = document.createElement('div');
        elem.classList.add(this.selector);
    } else if (this.selector.slice(0, 1) === '#') {
        elem = document.createElement('div');
        elem.id = this.selector.slice(1);
    } else {
        elem = document.createElement('div');
    }
    elem.textContent = this.selector;
    elem.style.cssText = `  height: ${this.height}; 
                            width: ${this.width};
                            background: ${this.bg};
                            font-size: ${this.fontSize};
                            `;
    document.body.append(elem);
};

const domElem = new DomElement('#text', '100px', '100px', 'mediumturquoise', '140px');

document.addEventListener("DOMContentLoaded", () => {
    domElem.createElement();

    domElem.position = 'absolute';
    domElem.bg = 'red';
    
    const div = document.querySelector('div');
    div.style.cssText = `position: ${domElem.position};
                        background: ${domElem.bg};
                        height: ${domElem.height};
                        width: ${domElem.width};`;
    
    document.addEventListener('keydown', event => {
        const   e = window.event,
                key = e.key;
        if (key === 'ArrowUp') {
            div.style.top = '10px';
        } else if (key === 'ArrowDown'){
            div.style.top = '20px';
        } else if (key === 'ArrowLeft'){
            div.style.left = '10px';
        } else if (key === 'ArrowRight'){
            div.style.left = '20px';
        }
    });

});


