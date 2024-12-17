import { observerMixin } from './mixins.js';

export class TodoItem {
    constructor(text) {
        this.text = text;
    }
    equals(other) {
        return this.text === other.text
    }
}

export class TodoList {
    #data = new Set();
    get items() { return this.#data }

    constructor() {
        if (TodoList.instance) {
            throw new Error('Singleton class, use getInstance method');
        }
    }

    static instance = null;
    static {
        this.instance = new TodoList();
    }
    static getInstance() {
        return this.instance;
    }

    add(item) {

        const array = Array.from(this.#data);
        const todoExists = array.filter(todo => todo.equals(item)).length > 0
        if (!todoExists) {
            this.#data.add(item);
            this.notify();
        }
    }

    delete(todoText) {
        const array = Array.from(this.#data);
        const todoToDelete = array.filter(todo => todo.text === todoText)[0];

        this.#data.delete(todoToDelete);
        this.notify();
    }

    find(todoText) {
        const array = Array.from(this.#data);
        return array.find(todo => todo.text === todoText);
    }

    replaceList(list) {
        this.#data = list
        this.notify();
    }
}

Object.assign(TodoList.prototype, observerMixin)