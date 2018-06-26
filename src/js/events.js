import { todos } from './state';
import { listen } from './lib/events';
import { addTodo, toggleTodoState, filterToDo } from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });

    listen('click', '.todo_filter_options', event => {
        const filter = event.target.id;
        todos.dispatch(filterToDo(filter));
    });
}
