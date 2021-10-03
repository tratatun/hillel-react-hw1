export class Todo {
    constructor (title) {
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
    }


    check () {
        this.checked = this.checkbox.checked;
    }
}

export class TodoList {
    constructor (parentNode) {
        this.List = [];
        this.parentNode = parentNode;
        this.afterRenderEvent = () => {};
        this.filter;
    }

    render = () => {
        this.parentNode.replaceChildren();
        this.List.filter(todo =>
            !this.filter ||
            typeof this.filter.checked === 'boolean' && this.filter.checked === todo.checked
        ).forEach(todo => {
            this.parentNode.appendChild(todo.elem);
        });
        this.afterRenderEvent();
    }

    filterList = filter => {
        this.filter = filter;
        this.render();
    }

    clearCompleted = () => {
        this.List = this.List.filter(todo => !todo.checked);
        this.render();
    }

    addTodo = title => {
        const todo = new Todo(title);

        const removeFromTodoList = () => {
            this.List = this.List.filter(t => todo.id !== t.id);
            this.render();
        };

        todo.destroy = function() {
            this.elem.remove();
            removeFromTodoList();
        };

        this.List.push(todo);
        this.render()
    }
}