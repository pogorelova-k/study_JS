/* eslint-disable indent */

window.addEventListener('DOMContentLoaded', () => {
    'strict';

	const idInterval = setInterval(countTimer, 10, '30 april 2021');

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
				clearInterval(idInterval);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}
		}

		updateClock();
	}

	// плавный скролл на кнопку down в main
	const scroll = () => {
		const downBtn = document.querySelector('main>a');

		downBtn.addEventListener('click', () => {
			const id = downBtn.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	};

	// menu
	const toggleMeenu = () => {
		const 	btnMenu = document.querySelector('.menu'),
				menu = document.querySelector('menu'),
				closeBtn = document.querySelector('.close-btn'),
				menuItems = menu.querySelectorAll('ul>li');

		// плавный скролл меню
		const scrollMenu = () => {
			for (const menuItem of menuItems) {
				menuItem.addEventListener("click", event => {
					// отключаем обычный способ возвращения наверх
					event.preventDefault();
					// задаем свои свойства скролла, делаем плавно
					const id = event.target.getAttribute('href');
					document.querySelector(id).scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				});
			}
		};
		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);

		menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));

		scrollMenu();
	};

	// popup
	const togglePopup = () => {
		const 	popup = document.querySelector('.popup'),
				popupContent = document.querySelector('.popup-content'),
				popupBtn = document.querySelectorAll('.popup-btn'),
				popupClose = document.querySelector('.popup-close');

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

		popupClose.addEventListener('click', () => {
			popup.style.display = 'none';
			cancelAnimationFrame(AnimationInterval);
			popup.style.top = 0;
			count = 0;
		});
	};

	toggleMeenu();
	togglePopup();
	scroll();
});

