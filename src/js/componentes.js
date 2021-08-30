import { Todo } from '../classes';
import { todoList } from '../index'

// Referencias HTML

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ todo.completado ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
		    <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    
    divTodoList.appendChild( div.firstElementChild );

    return div.firstElementChild;
}

// Eventos

txtInput.addEventListener('keyup', ( event ) => {

    if ( event.keyCode === 13 && txtInput.value.length > 0){

        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        txtInput.value=''

    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input') ){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    }else if( nombreElemento.includes('button') ){
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }

})

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i>=0;i-- ){
        const elemento = divTodoList.children[i];
        if( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento)
        }
    }
})

ulFilters,addEventListener('click', (event) => {

    const filter = event.target.text;
    if(!filter){return;}

    anchorFiltros.forEach( filtro => filtro.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completed = elemento.classList.contains('completed');

        switch(filter){
            case 'Pendientes':
                if( completed ){
                    elemento.classList.add('hidden')
                }
                break;
            case 'Completados':
                if( !completed ){
                    elemento.classList.add('hidden')
                }
                break;
        }
    }
})