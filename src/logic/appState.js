import { Project } from '../models/project.js';
import { Todo } from '../models/todo.js';

class AppState {
    constructor() {
        this.projects = [];
        this.activeProjectId = null;
    }

    // PROJECT METHODS
    addProject(name) {
        const project = new Project(name);
        this.projects.push(project);

        // if it's the first project, make it active automatically
        if (this.projects.length === 1) {
            this.activeProjectId = project.id;
        }

        return project;
    }

    deleteProject(projectId) {
        // don't allow deleting the last project
        if (this.projects.length === 1) return;

        this.projects = this.projects.filter(p => p.id !== projectId);

        // if you deleted the active project, switch to the first available one
        if (this.activeProjectId === projectId) {
            this.activeProjectId = this.projects[0].id;
        }
    }

    getProject(projectId) {
        return this.projects.find(p => p.id === projectId);
    }

    getActiveProject() {
        return this.getProject(this.activeProjectId);
    }

    setActiveProject(projectId) {
        this.activeProjectId = projectId;
    }

    // TO-DO METHODS
    addTodo(title, description, dueDate, priority, notes = '') {
        const todo = new Todo(title, description, dueDate, priority, notes);
        this.getActiveProject().addTodo(todo);
        return todo;
    }

    deleteTodo(todoId) {
        this.getActiveProject().deleteTodo(todoId);
    }

    editTodo(todoId, updates) {
        const todo = this.getActiveProject().getTodo(todoId);
        if (!todo) return;

        // updates is an object like { title: 'new title', priority: 'low' }
        // this merges only the fields you pass in, leaving the rest untouched
        Object.assign(todo, updates);
    }

    toggleTodoComplete(todoId) {
        const todo = this.getActiveProject().getTodo(todoId);
        if (todo) todo.toggleComplete();
    }

    // INIT
    init() {
        // create a default project when the app first loads
        this.addProject('Personal');
    }
}

// export a single instance - every file imports the same object
export const appState = new AppState();