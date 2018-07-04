const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let id = 0;
let todos = [];

function Todo() {
    this.text = prompt("TODO's text");
    this.id = ++id;
    this.checked = false;
    this.el = document.createElement('li');
    this.delete = () => delTodo(this.id);
}

function render() {
    list.innerHTML = '';
    todos.map(todo => {
        todo.el.innerHTML = todo.html;
        list.appendChild(todo.el);
    });
}

function newTodo() {
    let todo = new Todo();
    todos.push(todo);

    todo.el.classList.add(classNames.TODO_ITEM);

    todo.html = `<p class="${classNames.TODO_TEXT}">${todo.text}</p><input class="${classNames.TODO_CHECKBOX}" type="checkbox" onchange="checkTodo(${todo.id})"></input><button class="${classNames.TODO_DELETE}" onClick="delTodo(${todo.id})">delete</button>`;
    itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) + 1;
    unChecked();
    render();
}

function delTodo(id) {
    todos = todos.filter((todo) => {
        console.log(todo);
        return todo.id !== id;
    });
    console.log(todos);
    itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) - 1;
    render();
}

function unChecked() {
    uncheckedCountSpan.innerHTML = todos.filter(todo => todo.checked === false).length;
}

function checkTodo(id) {
    todos.forEach((todo) => {
        if (todo.id === id) {
            todo.checked = !todo.checked;
        }
    });
    unChecked();
}