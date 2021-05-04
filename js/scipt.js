/* eslint-disable no-loop-func */
/* eslint-disable indent */

window.addEventListener('DOMContentLoaded', () => {
    'strict';

	const commandPhoto = document.querySelectorAll('.command__photo'),
		calcItem = document.querySelectorAll('input.calc-item'),
		userInputs = document.querySelectorAll('input');

	userInputs.forEach(input => {
		input.addEventListener('input', () => {

			// убираем удваивающиеся пробелы и дефисы во время написания
			input.value = input.value.replace((/[-]+/gi), '-');
			input.value = input.value.replace((/[\s]+/g), ' ');

			if (input.getAttribute('name') === 'user_name') {
				// разрешен только ввод кириллицы в любом регистре, дефиса и пробела
				input.value = input.value.replace((/[^а-яА-Я\s]/), '');
				// Первая буква заглавная, остальные прописные
				input.value = input.value.replace(/(|\s+)\S/g, val => val.toLowerCase());
				input.value = input.value.replace(/(^|\s)\S/g, val => val.toUpperCase());

			} else if (input.getAttribute('name') === 'user_message') {
				// разрешен  только кириллицу, пробелы, цифры и знаки препинания
				// input.value = input.value.replace((/[^а-яА-Я-\s\d:\.,\?!";]/), '');
				input.value = input.value.replace((/[a-zA-Z]/), '');

			} else if (input.getAttribute('name') === 'user_email') {
				// разрешен только ввод ввод латиницы в любом регистре и спецсимволы
				input.value = input.value.replace((/[^a-zA-z@-_.!~*']/gi), '');

			} else if (input.getAttribute('name') === 'user_phone') {
				// разрешен только ввод цифр, круглых скобок и дефис
				input.value = input.value.replace((/[^+?\d]+/gi), '');
			}
		});

		input.addEventListener('blur', () => {

			// удаляем пробелы и дефисы в начале и конце вне фокуса инпута без вставки
			input.value = input.value.replace((/^-/), '');
			input.value = input.value.replace((/-$/), '');
			input.value = input.value.replace((/^\s/gi), '');
			input.value = input.value.replace((/\s$/gi), '');

			if (input.getAttribute('name') === 'user_name') {
				if ((/[^а-яА-Я\s-]/).test(input.value)) {
					input.value = input.value.replace((/[^а-яА-Я\s]/gi), '');
					input.value = input.value.replace(/(|\s+)\S/g, val => val.toLowerCase());
					input.value = input.value.replace(/(^|\s)\S/g, val => val.toUpperCase());
					// убираем удваивающиеся пробелы вне фокуса после вставки
					input.value = input.value.replace((/[\s]+/g), ' ');
				}

			} else if (input.getAttribute('name') === 'user_message') {
				if ((/[a-zA-Z]/).test(input.value)) {
					// разрешен только ввод кириллицы в любом регистре, дефиса и пробела
					input.value = input.value.replace((/[a-zA-Z]/gi), '');
					// убираем удваивающиеся пробелы и дефисы вне фокуса после вставки
					input.value = input.value.replace((/[\s]+/g), ' ');
					input.value = input.value.replace((/[-]+/gi), '-');
				}

			} else if (input.getAttribute('name') === 'user_email') {
				if ((/[^a-zA-z-@_.!~*']/).test(input.value)) {
					// разрешен только ввод ввод латиницы в любом регистре и спецсимволы
					input.value = input.value.replace((/[^a-zA-z@-_.!~*']/gi), '');
					// убираем удваивающиеся пробелы и дефисы вне фокуса после вставки
					input.value = input.value.replace((/[\s]+/g), ' ');
					input.value = input.value.replace((/[-]+/gi), '-');
				}

			} else if (input.getAttribute('name') === 'user_phone') {
				if ((/[^\d()-]/).test(input.value)) {
					// разрешен только ввод цифр, круглых скобок и дефис
					input.value = input.value.replace((/[^\d+]+/g), '');
					// убираем удваивающиеся пробелы и дефисы вне фокуса после вставки
					input.value = input.value.replace((/[\s]+/g), ' ');
					input.value = input.value.replace((/[-]+/gi), '-');
				}
			}
		});
	});

	// Изменение картинок команды, при наведении
	commandPhoto.forEach(image => {
		image.addEventListener('mouseenter', () => {
			image.src = image.dataset.img;
		});
	});

	// ввод только цифр для расчёта стоимости
	calcItem.forEach(input => {
		input.addEventListener('input', () => {
			input.value = input.value.replace(/\D/, '');
		});
	});

	// Timer
	function countTimer(deadline) {
		const   timerHours = document.querySelector('#timer-hours'),
				timerMinutes = document.querySelector('#timer-minutes'),
				timerSeconds  = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			const   dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				hours = Math.floor((timeRemaining / 60) / 60) % 24,
				minutes = Math.floor((timeRemaining / 60) % 60),
				seconds = Math.floor(timeRemaining % 60);

			return { timeRemaining, hours, minutes, seconds };
		}

		// функция добавляет ноль, если число меньше 10
		function addNullBefore(val) {
			if (val < 10) {
				return '0';
			} else {
				return '';
			}
		}

		function updateClock() {
			const timer = getTimeRemaining();

			timerHours.textContent = addNullBefore(timer.hours) + timer.hours;
			timerMinutes.textContent = addNullBefore(timer.minutes) + timer.minutes;
			timerSeconds.textContent = addNullBefore(timer.seconds) + timer.seconds;

			if (timer.timeRemaining < 0) {
				// eslint-disable-next-line no-use-before-define
				clearInterval(idInterval);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}
		}

		updateClock();
		const idInterval = setInterval(updateClock, 1000);
	}

	countTimer('30 april 2023');

	// плавный скролл меню
	const scroll = () => {
		const scrollLinks = document.querySelectorAll(".scroll-link");

		for (const scrollLink of scrollLinks) {
			scrollLink.addEventListener("click", event => {
				// отключаем обычный способ возвращения наверх
				event.preventDefault();
				// задаем свои свойства скролла, делаем плавно
				const id = scrollLink.getAttribute('href');
				document.querySelector(id).scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			});
		}
	};

	// menu
	const toggleMeenu = () => {
		const menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		document.addEventListener('click', event => {
			const target = event.target;

			if (menu.classList.contains('active-menu')) {
				if (target.closest('menu')) {
					if (target.classList.contains('close-btn') || target.classList.contains('scroll-link')) {
						handlerMenu();
					}
				}

				if (!target.closest('menu')) {
					handlerMenu();
				}
			} else if (target.closest('.menu')) {
				handlerMenu();
			}
		});
	};

	// popup
	const togglePopup = () => {
		const 	popup = document.querySelector('.popup'),
				popupContent = document.querySelector('.popup-content'),
				popupBtn = document.querySelectorAll('.popup-btn');

		let 	count = 0,
				AnimationInterval;

		const animationPopup = () => {

			AnimationInterval = requestAnimationFrame(animationPopup);
			count++;
			if (count < 60) {
				popupContent.style.top = count * 3 + 'px';
			} else {
				cancelAnimationFrame(AnimationInterval);
			}
		};

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';

				if (window.innerWidth > 768) {
					AnimationInterval = requestAnimationFrame(animationPopup);
				}
			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
				cancelAnimationFrame(AnimationInterval);
				popup.style.top = 0;
				count = 0;
			} else {
				// при клике по МО - получим МО. Если вне его, получим null
				target = target.closest('.popup-content');

				if (!target) {
					popup.style.display = 'none';
					cancelAnimationFrame(AnimationInterval);
					popup.style.top = 0;
					count = 0;
				}
			}
		});
	};

	// табы
	const tabs = () => {
		const 	tabHeader = document.querySelector('.service-header'),
				tab = tabHeader.querySelectorAll('.service-header-tab'),
				tabContent = document.querySelectorAll('.service-tab');

		const toglleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			// closest() - проверяет у элемента селектор =>
			// => если соответсвует, то возвращает этот элемент в таргет
			// если нет, тогда он поднимается к родителю и проверяет, пока не найдёт
			target = target.closest('.service-header-tab');
			if (target) {
				tab.forEach((item, i) => {
					if	(item === target) {
						toglleTabContent(i);
					}
				});
			}
		});
	};

	// swiper portfolio
	const slider = () => {
		const 	slide = document.querySelectorAll('.portfolio-item'),
				slider = document.querySelector('.portfolio-content'),
				dots = document.querySelector('.portfolio-dots');
		//Текущий номер слайда
		let currentSlide = 0,
			interval;

		slide.forEach(() => {
			const li = document.createElement('li');
			li.classList.add('dot');
			dots.append(li);
			dots.firstChild.classList.add('dot-active');
		});

		const	dot = document.querySelectorAll('.dot');

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		// автоматическое перелистывание слайдера autoPlay
		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		// Запуск слайдера
		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		// Остановка слайдера
		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}

			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
			event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') ||
			event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide(1500);
	};

	// калькулятор
	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcCount = document.querySelector('.calc-count'),
			calcDay = document.querySelector('.calc-day'),
			totalValue = document.getElementById('total');
		// let count  = 0,
		// 	idInterval;

		// подсчёт итоговой суммы
		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;

			// Функция запуска анимации
			function animate({ duration, draw, timing }) {
				const start = performance.now();

				requestAnimationFrame(function animate(time) {

					let timeFraction = (time - start) / duration;

					if (timeFraction > 1) timeFraction = 1;

					const progress = timing(timeFraction);

					draw(progress);

					if (timeFraction < 1) {
						requestAnimationFrame(animate);
					}

				});
			}

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;

				// анимация итоговой суммы
				animate({
					// скорость анимации
					duration: 1000,
					// Функция расчёта времени
					timing(timeFraction) {
						return timeFraction;
					},
					// Функция отрисовки
					draw(progress) {
						// в ней мы и производим вывод данных
						totalValue.textContent = Math.floor(progress * total);

					}
				});
			} else {
				total = 0;
			}

			totalValue.textContent = total;
		};

		// Любое изменение в блоке калькулятор
		calcBlock.addEventListener('change', event => {
			const target = event.target;

			// 1 способ
			// if (target.matches('.calc-type') || target.matches('.calc-square') ||
			// target.matches('.calc-count') || target.matches('.calc-day')) {
			// 	console.log(1);
			// }

			// 2 способ
			// if (target === calcType || target === calcSquare || target === calcCount || target === calcDay) {
			// 	console.log(1);
			// }

			// 3 способ
			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		});
	};

	// send-ajax-form
	const sendForm = () => {
		const erorrMessage = 'Что-то пошло не так...',
			successMesage = 'Спасибо! Мы скоро с вами свяжемся!',
			loadMessage = `<div class="sk-flow sk-center">
				<div class="sk-flow-dot"></div>
				<div class="sk-flow-dot"></div>
				<div class="sk-flow-dot"></div>
			</div>`;

		// const form = document.getElementById('form1');
		const forms = document.querySelectorAll('form');

		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem; color: #fff;';

		// body - данные из формы
		// outputData - оповещение пользователей
		// errorData - вывод ошибки
		const postData = (body, outputData, errorData) => {
			const request = new XMLHttpRequest();

			// отлавливаем readystatechange и оповещаем пользователя
			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}

				if (request.status === 200) {
					outputData();
				} else {
					errorData(request.status);
				}
			});

			// настриваем соеденение
			// post - отправка данных на сервер
			request.open('POST', './server.php');
			// настройка заголовков
			// multipart/form-data - даные отправляем с формы  виде объекта
			// application/json - отправляем данные в формате json строки
			request.setRequestHeader('Content-Type', 'application/json');

			// открываем соединение и отправляем наши данные полученные из формы в виде строки
			request.send(JSON.stringify(body));

			// если сервер будет понимать формат form-data то открываем соединение и отправляем данные
			// request.send(JSON.stringify(formData));
		};

		forms.forEach(form => {
			const inputs = form.querySelectorAll('input');

			// отправка формы
			form.addEventListener('submit', event => {
				event.preventDefault();
				form.append(statusMessage);
				statusMessage.innerHTML = loadMessage;

				// получение данных из формы с помощью FormData
				// получаем значение из всех инпутов формы у которых есть атрибут name
				const formData = new FormData(form);

				// извлекаем данные из formData
				const body = {};
				// вытаскиваем значения из formData с помощью entires() и добавляем в body
				// for (const val of formData.entries()) {
				// 	body[val[0]] = val[1];
				// }

				// другой способ
				formData.forEach((val, key) => {
					body[key] = val;
				});

				postData(body,
					() => {
						statusMessage.textContent = successMesage;
					},
					error => {
						statusMessage.textContent = erorrMessage;
						console.error(error);
					}
				);

				inputs.forEach(item => {
					item.value = '';
				});
			});
		});
	};

	toggleMeenu();
	togglePopup();
	scroll();
	tabs();
	slider();
	calc(100);
	sendForm();
});
