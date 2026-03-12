import { Project } from '../models/project.js';
import { Todo } from '../models/todo.js';
import { appState } from '../logic/appState.js';

const STORAGE_KEY = 'todo-app-data';

export const Storage = {
    
    save() {
        const data = {
            projects: appState.projects,
            activeProjectId: appState.activeProjectId
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    load() {
        const raw = localStorage.getItem(STORAGE_KEY);

        // if nothing saved yet, just run normal init (creates default project)
        if (!raw) {
            appState.init();
            return;
        }

        const data = JSON.parse(raw);

        // JSON gives plain objects, not class instances
        // so .toggleComplete(), addTodo() won't exist unless rebuild
        appState.projects = data.projects.map(plainProject => {
            const project = new Project(plainProject.name);
            project.id = plainProject.id; // restore original id

            project.todos = plainProject.todos.map(plainTodo => {
                const todo = new Todo(
                    plainTodo.title,
                    plainTodo.description,
                    plainTodo.dueDate,
                    plainTodo.priority,
                    plainTodo.notes
                );
                todo.id = plainTodo.id; // restore original id
                todo.completed = plainTodo.completed; // restore original state
                return todo;
            });
            
            return project;
        });

        appState.activeProjectId = data.activeProjectId;
    },
}