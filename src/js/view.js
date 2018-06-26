import { isEnabled } from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(toDo => {
        if (state.filter == 'all') { return renderTodoItem(toDo) }
        else if (state.filter == 'open' && !toDo.done) { return renderTodoItem(toDo) }
        else if (state.filter == 'closed' && toDo.done) { return renderTodoItem(toDo) }
        else return "";

    }
    ).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
        filter(state)
    );
}

function renderApp(input, todoList, filter) {
    if (isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList, filter);
    } else {
        return renderAddTodoAtTop(input, todoList, filter);
    }
}

function renderAddTodoAtTop(input, todoList, filter) {
    return `<div id="app">
        ${input}
        ${todoList}
        ${filter}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList, filter) {
    return `<div id="app">
        ${todoList}
        ${input}
        ${filter}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input"><input type="text" id="todoInput"><button id="addTodo">Add</button></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}
    </li>`;
}

function filter(state) {
    return `<div class="todo_filter">
    <div class="todo_filterHeader">Filter Status</div>
    <input class="todo_filter_options" name="toDoFilter" id="all" type="radio" ${state.filter=='all'?'checked':""}>Show all</input>
    <input class="todo_filter_options" name="toDoFilter" id="open" type="radio" ${state.filter=='open'?'checked':""}>Show open</input>
    <input class="todo_filter_options" name="toDoFilter" id="closed" type="radio" ${state.filter=='closed'?'checked':""}>Show closed</input>
    </div>`
}