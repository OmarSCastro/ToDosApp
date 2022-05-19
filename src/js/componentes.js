// Referencias en HtmlWebpackPlugin

import { Todo } from "../classes";
import {todoList} from '../index';


const divTodoList = document.querySelector( '.todo-list' );
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const conteo = document.querySelector('strong');
//La posicion de los tresBotones será asi:
// 0-> mostrar todos
// 1-> mostrar pendientes
// 2-> mostrar completados
const tresBotones = document.querySelectorAll('.filtro'); 



export const crearTodoHtml = ( todo ) => {


    
    
    const todoHtml = `
        <li class="${ todo.completado ? 'completed' : '' }" data-id=${todo.id}>
            <div class="view">
                <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' }>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>  
            <input class="edit" value="Create a TodoMVC template">
        </li>`;
        
        const div = document.createElement( 'div' );
        div.innerHTML = todoHtml;

        divTodoList.append ( div.firstElementChild ); //para crear el primer hijo del html

        return div.firstChild;

}

//Eventos

txtInput.addEventListener( 'keyup',  (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo )
        crearTodoHtml( nuevoTodo );
        txtInput.value=''
        
    }
    contarPendientes();

} );

divTodoList.addEventListener('click', ( event )=> {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    console.log(todoElemento);
    if ( nombreElemento.includes('input')) {
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed')
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento ); //Quitar del html el todo seleccionado
    }
    contarPendientes();
});

btnBorrar.addEventListener( 'click', () => {
    todoList.eliminarCompletados();
    const eliminarHtml = document.querySelectorAll('.completed');
    for (let i = 0; i < eliminarHtml.length; i++) {
        divTodoList.removeChild( eliminarHtml[i] );
    }
    contarPendientes();
} );

//Aqui se deberá mostrar todos los todos
tresBotones[0].addEventListener( 'click', () => {
    divTodoList.innerHTML= '';
    todoList.todos.forEach( crearTodoHtml);
} );

//Aqui se mostraram solo los pendientes
tresBotones[1].addEventListener( 'click', () => {
    const todosPendientes = todoList.todos.filter (todo => todo.completado==false );
    divTodoList.innerHTML = '';
    todosPendientes.forEach(crearTodoHtml);
} );

//Aqui se mostrarán solo los completados
tresBotones[2].addEventListener( 'click', () => {
    const todosCompletados = todoList.todos.filter (todo => todo.completado==true );
    divTodoList.innerHTML = '';
    todosCompletados.forEach( crearTodoHtml);
} );


export const contarPendientes = () => {
    let pendientes = todoList.todos.filter(todo => todo.completado == false);
    conteo.innerText = pendientes.length
}