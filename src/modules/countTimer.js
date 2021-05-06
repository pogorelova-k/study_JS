// Timer
export default function countTimer(deadline) {
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
