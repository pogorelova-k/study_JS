"use strict";

let isNumber = (n) => {
    // если введем число, вернётся true
    return !isNaN(parseFloat(n)) && isFinite(n); 
};

let money = start(),
    income = "фриланс",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ['Интернет']),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 13000000,
    period = 12,
    budgetMonth = 0,
    expenses = [],
    expensesAmount = getExpensesMonth(),
    accumulatedMonth = getAccumulatedMonth(), 
    budgetDay = Math.floor((money - accumulatedMonth) / 30);

// Проверка правильности ввода для месячного дохода
function start(money) {
    money = prompt('Ваш месячный доход?');
    while (!isNumber(money)) {
        money = prompt('Ваш месячный доход?');
    }
    return money;
};

// Определение типов данных
let showTypeOf = function(data) {
    console.log(typeof(data));
};

// Сумма расходов
function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', 'Еда');
        sum += +prompt('Во сколько это обойдется?', 200000);      
    }
    return sum;
};


// Накопления за месяц
function getAccumulatedMonth() {
    return money - expensesAmount;
};

// Период для достижения цели
function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
};

// Определение уровня дохода
function getStatusIncome() {
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
}


console.log('Доход за месяц', money);
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы на месяц: ' + expensesAmount);
console.log("Возможные расходы на месяц: ", addExpenses.toLowerCase().split(", "));
console.log('Цель будет достигнута через', getTargetMonth(), 'месяцев(-а)');
console.log("Бюджет на день: ", budgetDay);
console.log(getStatusIncome());