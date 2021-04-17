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
        elem.id = this.selector;
    }
    elem.textContent = this.selector;
    elem.style.cssText = `  height: ${this.height}; 
                            width: ${this.width};
                            background: ${this.bg};
                            font-size: ${this.fontSize};`;
    document.body.append(elem);
};

const domElem = new DomElement('#text', '300px', '500px', 'mediumturquoise', '140px');

domElem.createElement();
