import { appState } from '../logic/appState.js';
import { Storage } from '../storage/storage.js';
import { renderProjects } from './renderProjects.js';
import { openModal } from './renderModal.js';

export function renderTodos() {
    const list = document.getElementById('todo-list');
    const heading = document.getElementById('active-project-name');
    list.innerHTML = '';

    const project = appState.getActiveProject();
    if (!project) return;

    heading.textContent = project.name;

    project.todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add(`priority-${todo.priority}`);
        if (todo.completed) li.classList.add('completed');

        // checkbox
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.classList.add('todo-check');
        check.checked = todo.completed;
        check.addEventListener('click', (e) => {
            e.stopPropagation();
            appState.toggleTodoComplete(todo.id);
            Storage.save();
            renderTodos();
        })

        // title
        const title = document.createElement('span');
        title.classList.add('todo-title');
        title.textContent = todo.title;

        // due date
        const due = document.createElement('span');
        due.classList.add('todo-due');
        due.textContent = todo.dueDate || '';

        // delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.classList.add('delete-todo-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            appState.deleteTodo(todo.id);
            Storage.save();
            renderTodos();
        });

        li.append(check, title, due, deleteBtn);

        // click the row to open modal
        li.addEventListener('click', () => openModal(todo));

        list.appendChild(li);
    });
}

export function setupAddTodoBtn() {
    document.getElementById('add-todo-btn').addEventListener('click', () => {
        openModal(null); // null = creating new todo
    })
}