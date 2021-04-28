'strict';

class ToDo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList'))); //все дела сохраняем в коллекцию из LS
    }

    // Берёт todoData и отправляет в localStorage
    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    // перебирает все дела
    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
        this.handler();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
			<div class="todo-buttons">
                <button class="todo-edit"></button>
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>`);

        // Добавляем todo-задачу в нужный список
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    // метод для получения данных из инпута и создания объекта, который будем добавлять в todoData
    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            // содаём новое дело
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            // добавляем в todoData по ключу и объекту
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
        } else {
            alert('Пустое дело добавлять нельзя!');
        }
    }

    // генерации ключей для добавления нового дела
    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // поиск по ключу элемента и удаление его из new Map()
    deleteItem(key) {
        this.todoData.forEach((item, index) => {
            if (index === key) {
                this.todoData.delete(key);
            }
            this.render();
        });
    }

    // поменять значение completed у элемента todoData, по которому кликнули
    completedItem(key) {
        this.todoData.forEach(item => {
            if (item.key === key) {
                item.completed = !item.completed;
            }
            this.render();
        });
    }

    editItem(li) {
        const todoText = li.querySelector('.text-todo'),
            todoTextContent = todoText.textContent;

        todoText.setAttribute('contenteditable', true);
        todoText.style.border = '1px dashed black';
        todoText.style.padding = '5px';
        // todoText.style.cursor = 'text';

        document.querySelector('.todo-container').onclick = event => {
            const target = event.target;
            if (todoText.textContent !== todoTextContent) {
                todoText.setAttribute('contenteditable', false);
                todoText.style.border = 'none';
                this.todoData.forEach(item => {
                    if (item.key === li.key) {
                        item.value = todoText.textContent;
                    }
                    this.render();
                });
            } else if (target !== todoText) {
                todoText.setAttribute('contenteditable', false);
                todoText.style.border = 'none';
                this.render();
            }
        };
    }

    // обработчик событий
    handler() {
        const todoContainer = document.querySelector('.todo-container');

        todoContainer.onclick = event => {
            const  target = event.target,
                keyOnclick = target.closest('.todo-item').key;

            if (target.classList.contains('todo-complete')) {
                this.completedItem(keyOnclick);
            }
            if (target.classList.contains('todo-remove')) {
                this.deleteItem(keyOnclick);
            }
            if (target.classList.contains('todo-edit')) {
                this.editItem(target.closest('.todo-item'));
            }
        };
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        // наши данные добавляются на страницу после обновления
        this.render();
    }
}

const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
