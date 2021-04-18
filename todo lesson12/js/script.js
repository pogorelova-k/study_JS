'use strict';

let    todoControl = document.querySelector('.todo-control'),
        headerInput = document.querySelector('.header-input'),
        todoList = document.querySelector('.todo-list'),
        todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

    const dataSaved = () => {
        todoData = (JSON.parse(localStorage.data));
    };

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    localStorage.data = JSON.stringify(todoData);
    
    todoData.forEach((item, index) => {
        let li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';
        
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', () => {
            console.log(item);
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', () => {
            todoData.splice(index, 1);
            render();
        });
    });
};

todoControl.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if (newTodo.value === '') {
        return;
    }

    todoData.push(newTodo);

    render();

    headerInput.value = '';

});

dataSaved();
render();
