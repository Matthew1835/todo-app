import { appState } from "../logic/appState.js";
import { Storage } from '../storage/storage.js';
import { renderTodos } from './renderTodos.js';

const overlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title-heading');
const modalBody = document.getElementById('modal-body');

// close on overlay click or X button
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
})
document.getElementById('modal-close').addEventListener('click', closeModal);

function closeModal() {
    overlay.classList.add('hidden');
    modalBody.innerHTML = '';
}

export function openModal(todo) {
    // todo = null means 'add new', todo = object means 'edit existing'
    const isEditing = todo !== null;
    modalTitle.textContent = isEditing ? 'Edit Todo' : 'New Todo';

    modalBody.innerHTML = `
        <label>Title
            <input id="m-title" type="text" value="${isEditing ? todo.title : ''}">
        </label>
        <label>Description
            <textarea id="m-desc">${isEditing ? todo.description : ''}</textarea>
        </label>
        <label>Due Date
            <input id="m-date" type="date" value="${isEditing ? todo.dueDate : ''}">
        </label>
        <label>
            <select id="m-priority">
                <option value="low" ${isEditing && todo.priority === 'low' ? 'selected' : ''}>Low</option>
                <option value="medium" ${isEditing && todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="high" ${isEditing && todo.priority === 'high' ? 'selected' : ''}>High</option>
            </select>
        </label>
        <label>Notes
            <textarea id="m-notes">${isEditing ? todo.notes : ''}</textarea>
        </label>
        <button id="modal-save-btn">${isEditing ? 'Save Changes' : 'Add Todo'}</button>
    `;

    document.getElementById('modal-save-btn').addEventListener('click', () => {
        const title = document.getElementById('m-title').value.trim();
        if (!title) return;

        const updates = {
            title,
            description: document.getElementById('m-desc').value,
            dueDate: document.getElementById('m-date').value,
            priority: document.getElementById('m-priority').value,
            notes: document.getElementById('m-notes').value,
        };

        if (isEditing) {
            appState.editTodo(todo.id, updates)
        } else {
            appState.addTodo(
                updates.title,
                updates.description,
                updates.dueDate,
                updates.priority,
                updates.notes
            );
        }

        Storage.save();
        renderTodos();
        closeModal();
    });

    overlay.classList.remove('hidden')
}