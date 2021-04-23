/* eslint-disable no-loop-func */
/* eslint-disable indent */

window.addEventListener('DOMContentLoaded', () => {
    'strict';

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

	countTimer('30 april 2021');

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

	toggleMeenu();
	togglePopup();
	scroll();
	tabs();
});
