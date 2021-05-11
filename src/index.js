'strict';

import countTimer from './modules/countTimer';
import validator from './modules/validator';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scroll from './modules/scroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import SliderCarousel from './modules/sliderCarousel';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import dateImg from './modules/dateImg';

// slider oop style
const carousel = new SliderCarousel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    slide: '.companies-hor-item',
    // next: '#arrow-right',
    // prev: '#arrow-left',
    infinite: true,
    responsive: [{
        breakpoint: 1024,
        slidesShow: 3
    },
    {
        breakpoint: 768,
        slidesShow: 2
    },
    {
        breakpoint: 576,
        slidesShow: 1
    }],
});

countTimer('30 april 2023'); // Timer
validator(); // валидация полей
toggleMenu(); // menu
togglePopup(); // popup
scroll(); // плавный скролл
tabs(); // табы
slider(); // swiper portfolio
carousel.init(); // run slider oop style
calc(100); // калькулятор
sendForm(); // send-ajax-form
dateImg(); // Изменение картинок команды, при наведении
