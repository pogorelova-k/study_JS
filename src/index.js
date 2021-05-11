'strict';

import countTimer from './modules/countTimer';
import validator from './modules/validator';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scroll from './modules/scroll';
import tabs from './modules/tabs';
// import sliderFunctional from './modules/slider functional';
import SliderCarousel from './modules/slider oop';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import dateImg from './modules/dateImg';

// slider oop style
const slider = new SliderCarousel({
    main: '.portfolio-container',
    wrap: '.portfolio-content',
    slide: '.portfolio-item',
    next: '#arrow-right',
    prev: '#arrow-left',
    infinite: true,
    dots: '.portfolio-dots',
    // strClass: 'portfolio-item-active',
    // responsive: [{
    //     breakpoint: 1024,
    //     slidesShow: 3
    // },
    // {
    //     breakpoint: 768,
    //     slidesShow: 2
    // },
    // {
    //     breakpoint: 576,
    //     slidesShow: 1
    // }],
});

countTimer('30 april 2023'); // Timer
validator(); // валидация полей
toggleMenu(); // menu
togglePopup(); // popup
scroll(); // плавный скролл
tabs(); // табы
// sliderFunctional(); // swiper portfolio
slider.init(); // run slider oop style
calc(100); // калькулятор
sendForm(); // send-ajax-form
dateImg(); // Изменение картинок команды, при наведении
