import './styles.css';
import { Storage } from './storage/storage.js';
import { renderProjects, setupProjectForm } from './ui/renderProjects.js';
import { renderTodos, setupAddTodoBtn } from './ui/renderTodos.js';

// load saved data (or create default project)
Storage.load();

// render initial UI
renderProjects();
renderTodos();

// wire up forms and buttons
setupProjectForm();
setupAddTodoBtn();