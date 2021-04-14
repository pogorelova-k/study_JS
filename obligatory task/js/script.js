"use strict";

const   start = document.getElementById('start'),
        incomeAdd = document.getElementsByTagName('button')[0],
        expensesAdd = document.getElementsByTagName('button')[1],
        depositCheck = document.querySelector('#deposit-check'),
        additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

        budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
        budgetDayhValue = document.getElementsByClassName('budget_day-value')[0],
        expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
        additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
        additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
        incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
        targetMonthValue = document.getElementsByClassName('target_month-value')[0],

        salaryAmount = document.querySelector('.salary-amount'),
        incomeTitle = document.querySelector('input.income-title'),
        incomeAmount = document.querySelector('.income-amount'),
        expensesTitle = document.querySelector('input.expenses-title'),
        expensesAmount = document.querySelector('.expenses-amount'),
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        depositAmount = document.querySelector('.deposit-amount'),
        depositPercent = document.querySelector('.deposit-percent'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select');
let     targetConsole = '';

let isNumber = (n) => {
    // если введем число, вернётся true
    return !isNaN(parseFloat(n)) && isFinite(n); 
};

let appData = {
    income: {}, //Доход 
    addIncome: [], // Дополнительный доход
    expenses: {}, // Доп расходы
    addExpenses: [], // Возможные расходы
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 200000,
    period: 3,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    // Проверка правильности ввода для месячного дохода
    start: function(money) { 
        if (salaryAmount.value === '') {
            alert('Ошибка, поле месячный доход должно быть заполнено');
            return;
        }

        appData.budget = salaryAmount.value;
        console.log('salaryAmount.value: ', salaryAmount.value);

        // appData.asking();
        // appData.getExpensesMonth();
        // appData.getBudget();
        // appData.getInfoDeposit();
    },
    asking: function() { 

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой у вас есть дополнительый заработок', 'Таксую');
            while (isNumber(itemIncome)) {
                itemIncome = prompt('Какой у вас есть дополнительый заработок', 'Таксую');
            }
            let cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
            while (!isNumber(cashIncome)) {
                cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
            }
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, мобильная связь, собака');
            appData.addExpenses =  addExpenses.toLowerCase().split(", ");
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let expenses = prompt('Введите обязательную статью расходов?', 'Еда'); 
            while (isNumber(expenses)) {
                expenses = prompt('Введите обязательную статью расходов?', 'Еда');  
            }
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
    // Данные о депозите
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', 10);
            while (!isNumber(appData.percentDeposit)) {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
        }
    },
    // Сколько заработаем за  период
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    },
};

start.addEventListener('click', appData.start);



if (appData.budget <= 0) {
    targetConsole = 'Цель не будет достигнута';
} else {
    targetConsole = 'Цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев(-а)';
}

console.log(targetConsole);
console.log("Уровень дохода: ", appData.budget);
console.log('Наша программа включает в себя данные:');
for (const key in appData) {
    console.log(key, appData[key]);
}
console.log('Возможные расходы: ', appData.addExpenses.map((elem) => elem[0].toUpperCase() + elem.slice(1)).join(', '));

