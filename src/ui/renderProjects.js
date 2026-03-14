import { appState } from '../logic/appState.js';
import { Storage } from '../storage/storage.js';
import { renderTodos } from './renderTodos.js';

export function renderProjects() {
    const list = document.getElementById('project-list');
    list.innerHTML= '';
    
    appState.projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.name;
        li.dataset.id = project.id;

        if (project.id === appState.activeProjectId) {
            li.classList.add('active');
        }

        // delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-project-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevents the parent <li> click event from firing
            appState.deleteProject(project.id);
            Storage.save();
            renderProjects();
            renderTodos();
        });

        li.appendChild(deleteBtn);

        // switch active project on click
        li.addEventListener('click', () => {
            appState.setActiveProject(project.id);
            Storage.save();
            renderProjects();
            renderTodos();
        });

        list.appendChild(li)
    });
}

export function setupProjectForm() {
    const input = document.getElementById('new-project-input');
    const btn = document.getElementById('add-project-btn');

    btn.addEventListener('click', () => {
        const name = input.value.trim();
        if (!name) return;

        appState.addProject(name);
        Storage.save();
        input.value = '';
        renderProjects();
        renderTodos();
    })

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
    })
}