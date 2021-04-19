"use strict";

const     start = document.getElementById('start'),
        cancel = document.getElementById('cancel'),
        depositCheck = document.querySelector('#deposit-check'),
        additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        inputsName = document.querySelectorAll('input[placeholder="Наименование"]'),
        inputsSum = document.querySelectorAll('input[placeholder="Сумма"]'),
        data = document.querySelector('.data'),

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
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        depositAmount = document.querySelector('.deposit-amount'),
        depositPercent = document.querySelector('.deposit-percent'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount');
let     dataInputText = data.querySelectorAll('input[type="text"]'),
        incomeItems = document.querySelectorAll('.income-items'),
        expensesItems = document.querySelectorAll('.expenses-items'),
        incomePlus = document.getElementsByTagName('button')[0],
        expensesPlus = document.getElementsByTagName('button')[1],
        targetConsole = '';
        
class AppData {
    constructor() {
        this.income = {}; //Доход 
        this.incomeMonth = 0;
        this.addIncome = []; // Дополнительный/возможный доход
        this.expenses = {}; // Доп расходы
        this.addExpenses = []; // Возможные расходы
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }
    
    check() {
        if (salaryAmount.value !== '') {
            start.disabled = false;
        } 
    }

    start(money) { 
        if (salaryAmount.value === '') {
            start.disabled = true;
        } 
        start.style.display = 'none';
        cancel.style.display = 'block';
    
        dataInputText = data.querySelectorAll('input[type="text"]');
        dataInputText.forEach( item => {
            item.disabled = true;
        });
    
        this.budget = +salaryAmount.value;
    
        this.getExpInc();
        this.getExpensesMonth();
        // this.getAddExpenses();
        // this.getAddIncome();
        this.getAdditionalExpInc();
        this.getBudget();
        this.showResult();
    }

    reset() {
        start.style.display = 'block';
        cancel.style.display = 'none';
    
        start.disabled = true;
        
        dataInputText.forEach( item => {
            item.disabled = false;
        });

        this.income = {}; //Доход 
        this.incomeMonth = 0;
        this.addIncome = []; // Дополнительный/возможный доход
        this.expenses = {}; // Доп расходы
        this.addExpenses = []; // Возможные расходы
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    
        const allInputs = document.querySelectorAll('input');
        allInputs.forEach(item => {
            if (item === periodSelect) {
                periodAmount.textContent = 7;
            }
            item.value = '';
        });
    
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            incomePlus.style.display = 'block';
        }
        
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            expensesPlus.style.display = 'block';
        }
    }

    // вывод результатов справа
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayhValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
            incomePeriodValue.value = this.calcPeriod();
        });
    }

    addExpIncBlock(items) {
        let item = items[0];
        const cloneItem = item.cloneNode(true);
        cloneItem.querySelectorAll('input').forEach( input => input.value = '');
        if (item.className === 'expenses-items') {
            expensesPlus.before(cloneItem);
            items = document.querySelectorAll('.expenses-items');
        } 
        if (item.className === 'income-items') {
            incomePlus.before(cloneItem);
            items = document.querySelectorAll('.income-items');
        }

        if (items.length === 3) {
            if (item.className === 'expenses-items') {
                expensesPlus.style.display = 'none';
            }
            if (item.className === 'income-items') {
                incomePlus.style.display = 'none';
            }
        }
    }
    
    // получение названий и значений доп доходов и оязательных расходов
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    // получение названий возможных доходов и расходов
    getAdditionalExpInc() {
        const addExpenses = additionalExpensesItem.value.split(',');

        let str = '';
        const count = (item, index) => {
            if (item.className === 'additional_income-item') {
                str = item.className;
                item = item.value;
            } 
            item = item.trim();
            if (item !== '' && str !== '') {
                this.addIncome.push(item);
            } 
            if (item !== '' && str === '') {
                this.addExpenses.push(item);
            }
        };

        addExpenses.forEach(count);
        additionalIncomeItem.forEach(count);
    }

    // Сумма расходов
    getExpensesMonth() {
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    // Накопления за месяц и день
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    // Период для достижения цели
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    // Определение уровня дохода
    getStatusIncome() {
        let status;
        if (this.budgetDay >= 1200) {
            status = 'У вас высокий уровень дохода';
        } else if (this.budgetDay >= 600) {
            status = 'У вас средний уровень дохода';
        } else if (this.budgetDay < 600 && this.budgetDay >= 0 ) {
            status = 'К сожалению, у вас уровень дохода ниже среднего';
        } else {
            status = 'Что то пошло не так';
        }
        return status;
    }

    // Данные о депозите
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = prompt('Какой годовой процент?', 10);
            while (!isNumber(this.percentDeposit)) {
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while (!isNumber(this.moneyDeposit)) {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
        }
    }

    // Сколько заработаем за  период
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    eventListeners() {
        // привязка контекст вызова функции start к appData - .bind
        start.addEventListener('click', appData.start.bind(appData));
        salaryAmount.addEventListener('input', appData.check);
        cancel.addEventListener('click', appData.reset.bind(appData));
        expensesPlus.addEventListener('click', () =>{
            appData.addExpIncBlock(expensesItems);
        });
        incomePlus.addEventListener('click', () => {
            appData.addExpIncBlock(incomeItems);
        });
    
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
            appData.incomePeriodValue = appData.calcPeriod();
        });
    
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
    }
}

const appData = new AppData();

appData.eventListeners();





