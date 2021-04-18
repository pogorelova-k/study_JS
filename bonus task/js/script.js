"use string";

let userData = [],
    months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    user = {
    firstName: '',
    lastName: '',
    login: '',
    password: '',
    time: '',
},  btnRegisterUser = document.getElementById('registerUser'),
    btnLogin = document.getElementById('login'),
    list = document.getElementById('list'),
    userName = document.getElementById('username');

// функция добавляет ноль, если число меньше 10
function addNullBefore(val) {
    if (val < 10) {
        return '0';
    } else {
        return '';
    }
};


// Вывод на экран при обновлении из local storage
const dataSaved = () => {
    list.textContent = '';
    userData = (JSON.parse(localStorage.data));

    userData.forEach((item, index) => {
        let newLi = document.createElement('li'),
            deleteLi = document.createElement('button');
        deleteLi.textContent = 'Удалить';
        deleteLi.classList.add('delete-btn');
        newLi.textContent = item.firstName + ' ' + item.lastName + '. Дата регистрации: ' + item.time;
        newLi.insertAdjacentElement('beforeend', deleteLi);
        list.append(newLi); 

        deleteLi.addEventListener('click', () => {
            userData.splice(index, 1);
            localStorage.data = JSON.stringify(userData);
            dataSaved();
        });

    });
};

// Регистрация
btnRegisterUser.addEventListener('click', () => {
    let fullName = prompt('Введите, пожалуйста, имя и фамилию:', 'Ксения Погорелова');
        if (fullName.split(' ').length-1 !== 1) {
            alert('Ошибка! Вы ввели свои данные не верно');
            fullName = '';
            return;
        }
    let login = prompt('Введите логин', 'ksenia111'),
        password = prompt('Введите пароль', '12345'),
        today = new Date();

    user.firstName = fullName.split(' ')[0];
    user.lastName = fullName.split(' ')[1];
    user.login = login;
    user.password = password;
    user.time =     today.getDate() + ' ' + months[today.getMonth()] + ' ' + today.getFullYear() + ' г., ' +
                    addNullBefore(today.getHours()) + today.getHours() + ':' + 
                    addNullBefore(today.getMinutes()) + today.getMinutes() + ':' + 
                    addNullBefore(today.getSeconds()) + today.getSeconds();

    userData.push(user); //Добавляем в массив объект

    // сохраняем в локал сторедж массив
    localStorage.data = JSON.stringify(userData);
    console.log('userData: ', userData);


    // добавляем на страницу нового пользователя
    let newLi = document.createElement('li'),
        deleteLi = document.createElement('button');
    deleteLi.textContent = 'Удалить';
    deleteLi.classList.add('delete-btn');
    newLi.textContent = user.firstName + ' ' + user.lastName + '. Дата регистрации: ' + user.time;
    newLi.insertAdjacentElement('beforeend', deleteLi);
    list.append(newLi);

    deleteLi.addEventListener('click', () => {
        userData.splice(length, 1);
        localStorage.data = JSON.stringify(userData);
        dataSaved();
    });
});

// Авторизация
btnLogin.addEventListener('click', () => {
    let loginUser = prompt('Пожалуйста, введите свой логин:', 'ksenia111');
    let passwordUser = prompt('Пожалуйста, введите свой пароль:', '12345');

    userData.forEach((item, index) => {
        if (item.login === loginUser && item.password === passwordUser) {
            userName.textContent = item.firstName;
        } else {
            alert('Пользователь не найден!');
        }
    });

});

dataSaved();

