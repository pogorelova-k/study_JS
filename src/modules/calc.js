import animate from './animate';

// калькулятор
const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    // подсчёт итоговой суммы
    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

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

export default calc;

