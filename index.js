import { TodoList } from "./todo";

// window.addEventListener('load', ()=>{
(function (){
    const todoListParent = document.getElementById('todo-list');
    const todoList = new TodoList(todoListParent);

    const updateListCounter = e => {
        const todoCount = document.getElementById('todo-count');
        todoCount.innerHTML = todoList.List.length;
    };

    todoList.afterRenderEvent = ()=>{
        updateListCounter();
    };

    const inputAddTodo = document.getElementsByClassName('new-todo')[0];
    const addNewTodoEvent = e => {
        todoList.addTodo(e.target.value);
        e.target.value = '';
    }
    inputAddTodo.addEventListener('change', addNewTodoEvent);

    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterCompleted = document.getElementById('filter-completed');
    
    filterAll.addEventListener('click', ()=>{
        todoList.filterList();
        filterAll.className = 'selected';
        filterActive.className = '';
        filterCompleted.className = '';
    });
    
    filterActive.addEventListener('click', ()=>{
        todoList.filterList({checked: false});
        filterActive.className = 'selected';
        filterAll.className = '';
        filterCompleted.className = '';
    });
    
    filterCompleted.addEventListener('click', ()=>{
        todoList.filterList({checked: true});
        filterCompleted.className = 'selected';
        filterActive.className = '';
        filterAll.className = '';
    });

    const clearCompleted = document.querySelector('.clear-completed');

    clearCompleted.addEventListener('click', ()=>{
        todoList.clearCompleted();
    });
})();
// });

