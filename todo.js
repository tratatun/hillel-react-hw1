export class Todo {
    id;
    checkbox;
    title;
    checked;
    elem;
    static List = [];
    static parentNode = null;
    static afterRenderEvent = () => {};
    static filter;

    constructor (title) {
        if(!Todo.parentNode) return;
        this.id = Date.now();
        this.title = title;

        this.elem = document.createElement('li');
        this.elem.id=`todo-${this.id}`;

        const divView = document.createElement('div');
        divView.className = 'view';

        const toggle = document.createElement('input');
        toggle.className = 'toggle';
        toggle.type = 'checkbox';
        toggle.addEventListener('change', e => {
            this.check();
        });
        this.checked = false;
        this.checkbox = toggle;
        divView.appendChild(toggle);

        const label = document.createElement('label');
        label.innerHTML = this.title;
        divView.appendChild(label);

        const destroy = document.createElement('button');
        destroy.className = 'destroy';
        destroy.addEventListener('click', () => {
            this.destroy();
        });
        divView.appendChild(destroy);

        this.elem.appendChild(divView);

        Todo.List.push(this);
        Todo.render()
    }

    static render = () => {
        Todo.parentNode.replaceChildren();
        Todo.List.filter(todo =>
            !Todo.filter ||
            typeof Todo.filter.checked === 'boolean' && Todo.filter.checked === todo.checked
        ).forEach(todo => {
            Todo.parentNode.appendChild(todo.elem);
        });
        Todo.afterRenderEvent();
    }

    static filterList = filter => {
        Todo.filter = filter;
        Todo.render();
    }

    static clearCompleted = () => {
        Todo.List = Todo.List.filter(todo => !todo.checked);
        Todo.render();
    }

    destroy () {
        this.elem.remove();
        Todo.List = Todo.List.filter(todo => todo.id !== this.id);
        Todo.render();
    }

    check () {
        this.checked = this.checkbox.checked;
        Todo.render();
    }
}