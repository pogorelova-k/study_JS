"use strict";
let targetConsole = '';

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
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        // appData.budget = +prompt('Ваш месячный доход?', 100000);
        // while (!isNumber(appData.budget)) {
        //     appData.budget = prompt('Ваш месячный доход?', 100000);
        // } 
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ['Интернет']);
            appData.addExpenses =  addExpenses.toLowerCase().split(", ");
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let expenses = prompt('Введите обязательную статью расходов?', 'Еда');
            let valueExpenses = +prompt('Во сколько это обойдется?', 20000);
            while (!isNumber(valueExpenses)) {
                valueExpenses = +prompt('Во сколько это обойдется?', 20000);
            }
            appData.expenses[expenses] = valueExpenses;
            
        }
        
        
    },
    // Сумма расходов
    getExpensesMonth: function() {
        for (const key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    // Накопления за месяц и день
    getBudget: function() {
        appData.getExpensesMonth();
        appData.budget = money;
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // Период для достижения цели
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    // Определение уровня дохода
    getStatusIncome: function() {
        let status;
        if (appData.budgetDay >= 1200) {
            status = 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600) {
            status = 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0 ) {
            status = 'К сожалению, у вас уровень дохода ниже среднего';
        } else {
            status = 'Что то пошло не так';
        }
        return status;
    },
};

appData.asking();
appData.getBudget();

// Проверка правильности ввода для месячного дохода
function start(money) { 
    do {
        money = prompt('Ваш месячный доход?', 100000);
    } while (!isNumber(money));
    return +money;
};

if (appData.budget <= 0) {
    targetConsole = 'Цель не будет достигнута';
} else {
    targetConsole = 'Цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев(-а)';
}

console.log('Расходы на месяц: ' + appData.expensesMonth);
console.log(targetConsole);
console.log("Уровень дохода: ", appData.budget);