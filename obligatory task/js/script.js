"use strict";

let isNumber = (n) => {
    // если введем число, вернётся true
    return !isNaN(parseFloat(n)) && isFinite(n); 
};

let money = start();

let appData = {
    income: {}, //Доход 
    addIncome: [], // Дополнительный доход
    expenses: {}, // Доп расходы
    addExpenses: [], // Возможные расходы
    deposit: false,
    mission: 200000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesAmount: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ['Интернет']);
            appData.addExpenses =  addExpenses.toLowerCase().split(", ");
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    // Сумма расходов
    getExpensesMonth: function() {
        let sum = 0;
        let inputAmount = 0;
        for (let i = 0; i < 2; i++) {
            appData.expenses[i] = prompt('Введите обязательную статью расходов?', 'Еда');
            do {
                inputAmount = prompt('Во сколько это обойдется?', 20000);
            } while (!isNumber(inputAmount));

            sum += +inputAmount;
        }
        return sum;
    },
    // Накопления за месяц
    getAccumulatedMonth: function() {
        return money - expensesAmount;
    },
    // Период для достижения цели
    getTargetMonth: function() {
        return Math.ceil(appData.mission / accumulatedMonth);
    },
    // Определение уровня дохода
    getStatusIncome: function() {
        let status;
        if (budgetDay >= 1200) {
            status = 'У вас высокий уровень дохода';
        } else if (budgetDay >= 600) {
            status = 'У вас средний уровень дохода';
        } else if (budgetDay < 600 && budgetDay >= 0 ) {
            status = 'К сожалению, у вас уровень дохода ниже среднего';
        } else {
            status = 'Что то пошло не так';
        }
        return status;
    },
};

let expensesAmount = appData.getExpensesMonth(),
    accumulatedMonth = appData.getAccumulatedMonth(), 
    budgetDay = Math.floor(accumulatedMonth / 30),
    targetConsole = '';

// Проверка правильности ввода для месячного дохода
function start(money) { 
    do {
        money = prompt('Ваш месячный доход?', 100000);
    } while (!isNumber(money));
    return +money;
};

if (money <= 0) {
    targetConsole = 'Цель не будет достигнута';
} else {
    targetConsole = 'Цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев(-а)';
}



console.log('Расходы на месяц: ' + expensesAmount);
console.log(targetConsole);
console.log("Бюджет на день: ", budgetDay);
console.log(appData.getStatusIncome()); 