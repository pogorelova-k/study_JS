"use strict";
let money = +prompt('Ваш месячный доход?', 1000000),
    income = "фриланс",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ['Интернет']),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 13000000,
    period = 12,
    budgetMonth = 0,
    expenses1 = prompt('Введите обязательную статью расходов?', 'Еда'),
    amount1 = +prompt('Во сколько это обойдется?', 100000),
    expenses2 = prompt('Введите обязательную статью расходов?', 'Жильё'),
    amount2 = +prompt('Во сколько это обойдется?', 200000),
    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = Math.floor((money - accumulatedMonth) / 30);

// Определение типов данных
let showTypeOf = function(data) {
    console.log(typeof(data));
};

// Сумма расходов
function getExpensesMonth() {
    return amount1 + amount2;
};

// Накопления за месяц
function getAccumulatedMonth() {
    return money - getExpensesMonth();
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



showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы на месяц: ', getExpensesMonth());
console.log("Возможные расходы на месяц: ", addExpenses.toLowerCase().split(", "));
console.log('Цель будет достигнута через', getTargetMonth(), 'месяцев(-а)');
console.log("Бюджет на день: ", budgetDay);
console.log(getStatusIncome());