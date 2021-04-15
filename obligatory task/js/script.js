"use strict";

let     start = document.getElementById('start'),
        cancel = document.getElementById('cancel'),
        incomePlus = document.getElementsByTagName('button')[0],
        expensesPlus = document.getElementsByTagName('button')[1],
        depositCheck = document.querySelector('#deposit-check'),
        additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        incomeItems = document.querySelectorAll('.income-items'),
        inputsName = document.querySelectorAll('input[placeholder="Наименование"]'),
        inputsSum = document.querySelectorAll('input[placeholder="Сумма"]'),

        budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
        budgetDayhValue = document.getElementsByClassName('budget_day-value')[0],
        expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
        additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
        additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
        incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
        targetMonthValue = document.getElementsByClassName('target_month-value')[0],

        salaryAmount = document.querySelector('.salary-amount'),
        incomeTitle = document.querySelector('input.income-title'),
        expensesTitle = document.querySelector('input.expenses-title'),
        expensesItems = document.querySelectorAll('.expenses-items'),
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        depositAmount = document.querySelector('.deposit-amount'),
        depositPercent = document.querySelector('.deposit-percent'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount');
let     targetConsole = '';

let isNumber = (n) => {
    // если введем число, вернётся true
    return !isNaN(parseFloat(n)) && isFinite(n); 
};

let appData = {
    income: {}, //Доход 
    incomeMonth: 0,
    addIncome: [], // Дополнительный/возможный доход
    expenses: {}, // Доп расходы
    addExpenses: [], // Возможные расходы
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    // Проверка правильности ввода для месячного дохода
    start: function(money) { 
        appData.budget = +salaryAmount.value;

        console.log(this);

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    cancel: function () {
        cancel.style.display = 'none';
        let allInputs = document.querySelectorAll('input');
        allInputs.forEach(item => {
            if (item === periodSelect) {
                periodAmount.textContent = 7;
            }
            item.value = '';
        });
        appData = 0;
    },
    // вывод результатов справа
    showResult: function() {
        
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayhValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    // Добавление новых полей
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach( (input) => {
            input.value = '';
        });
        expensesPlus.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    // получение названия и значения обязателных расходов
    getExpenses: function () {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses!== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    // добавление полей дополнительного дохода
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach( (input) => {
            input.value = '';
        });
        incomePlus.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        };
    },
    // Дополнительный доход
    getIncome: function() { 
        incomeItems.forEach( item => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (const key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }

    },
    // Получение названий возможных расходов
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            // удаляем лишние пробелы
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    // Получение названий возможного дохода
    getAddIncome: function() {
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        }); 
    },
    // Сумма расходов
    getExpensesMonth: function() {
        for (const key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    // Накопления за месяц и день
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // Период для достижения цели
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
};

if (salaryAmount.value === '') {
    start.disabled = true;
} 

salaryAmount.addEventListener('input', () => {
    cancel.style.display = 'block';
    if (salaryAmount.value === '') {
        start.disabled = true;
    } else {
        start.disabled = false;
    }
});

// привязка контекст вызова функции start к appData - .bind
start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.cancel);

// Ограничения на ввод полей Наименования
inputsName.forEach(item => {
    item.addEventListener('input', () => {
        item.value = item.value.replace((/[^а-я, -.?!)(,:]/),'');
    });
});

// Ограничения ввода полей Сумма
inputsSum.forEach( item => {
    item.addEventListener('input', () => {
        item.value = item.value.replace((/[^0-9]/),'');
    });
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
    appData.incomePeriodValue = appData.calcPeriod();
});

if (appData.budget <= 0) {
    targetConsole = 'Цель не будет достигнута'; 
} else {
    targetConsole = 'Цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев(-а)';
}

// console.log(targetConsole);
// console.log("Уровень дохода: ", appData.budget);
// console.log('Наша программа включает в себя данные:');
// for (const key in appData) {
//     console.log(key, appData[key]);
// }
// console.log('Возможные расходы: ', appData.addExpenses.map((elem) => elem[0].toUpperCase() + elem.slice(1)).join(', '));

