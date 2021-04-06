"use strict";
let money = +prompt('Ваш месячный доход?', 1000000),
    income = "фриланс",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 13000000,
    period = 12,
    budgetDay = money / 30,
    budgetMonth = 0,
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?');

// Бюджет на месяц
budgetMonth = amount1 + amount2;

// Определение уровня дохода
if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0 ) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}

console.log("money:", typeof money);
console.log("income:", typeof income);
console.log("deposit:", typeof deposit);
console.log("длина строки addExpenses:", addExpenses.length);
console.log(
    "Период равен ", period, "месяцев.",
    "Цель заработать", mission,"рублей"
);
console.log(addExpenses.toLowerCase().split(", "));
console.log("Бюджет на день: ", Math.floor(budgetDay));
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута через', Math.ceil(mission / (money - budgetMonth)), 'месяцев(-а)');
