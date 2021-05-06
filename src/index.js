'strict';

import countTimer from './modules/countTimer';
import validator from './modules/validator';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scroll from './modules/scroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import dateImg from './modules/dateImg';

countTimer('30 april 2023'); // Timer
validator(); // валидация полей
toggleMenu(); // menu
togglePopup(); // popup
scroll(); // плавный скролл
tabs(); // табы
slider(); // swiper portfolio
calc(100); // калькулятор
sendForm(); // send-ajax-form
dateImg(); // Изменение картинок команды, при наведении
