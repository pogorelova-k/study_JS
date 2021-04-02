let money = 1000000, 
    income = 'фриланс', 
    addExpenses = 'Интернет, Cотовая связь, Коммуналка, Cобака, Машина, Врачи', 
    deposit = false, 
    mission = 13000000, 
    period = 12;

console.log('money:', typeof money);
console.log('income:', typeof income);
console.log('deposit:', typeof deposit);

console.log('длина строки addExpenses:', addExpenses.length);

console.log('Период равен ', period, 'месяцев.', 'Цель заработать', mission, 'рублей' );

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;

console.log('budgetDay:', budgetDay);