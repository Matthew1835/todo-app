import './styles.css';
import { Storage } from './storage/storage.js';
import { renderProjects, setupProjectForm } from './ui/renderProjects.js';
import { renderTodos, setupAddTodoBtn } from './ui/renderTodos.js';
import { openModal } from './ui/renderModal.js';

// load saved data (or create default project)
Storage.load();

// render initial UI
renderProjects();
renderTodos();

// wire up forms and buttons
setupProjectForm();
setupAddTodoBtn();

// mobile sidebar drawer toggle
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('sidebar-backdrop');
const mobProjectsBtn = document.getElementById('mob-projects-btn');
const mobAddBtn = document.getElementById('mob-add-btn');

function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('visible');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('visible');
}

mobProjectsBtn.addEventListener('click', openSidebar);
backdrop.addEventListener('click', closeSidebar);

// close sidebar after selecting a project on mobile
document.getElementById('project-list').addEventListener('click', closeSidebar);

// mobile + button triggers the same add todo modal
mobAddBtn.addEventListener('click', () => openModal(null));