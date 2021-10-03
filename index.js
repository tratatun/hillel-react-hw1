import { Todo } from "./todo";

window.addEventListener('load', ()=>{
    const todoListParent = document.getElementById('todo-list');
    Todo.parentNode = todoListParent;

    const updateListCounter = e => {
        const todoCount = document.getElementById('todo-count');
        todoCount.innerHTML = Todo.List.length;
    };

    Todo.afterRenderEvent = ()=>{
        updateListCounter();
    };

    const inputAddTodo = document.getElementsByClassName('new-todo')[0];
    const addNewTodoEvent = e => {
        new Todo(e.target.value);
        e.target.value = '';
    }
    inputAddTodo.addEventListener('change', addNewTodoEvent);

    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterCompleted = document.getElementById('filter-completed');
    
    filterAll.addEventListener('click', ()=>{
        Todo.filterList();
        filterAll.className = 'selected';
        filterActive.className = '';
        filterCompleted.className = '';
    });
    
    filterActive.addEventListener('click', ()=>{
        Todo.filterList({checked: false});
        filterActive.className = 'selected';
        filterAll.className = '';
        filterCompleted.className = '';
    });
    
    filterCompleted.addEventListener('click', ()=>{
        Todo.filterList({checked: true});
        filterCompleted.className = 'selected';
        filterActive.className = '';
        filterAll.className = '';
    });

    const clearCompleted = document.querySelector('.clear-completed');

    clearCompleted.addEventListener('click', ()=>{
        Todo.clearCompleted();
    });
});

