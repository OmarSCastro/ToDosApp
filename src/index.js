import {TodoList} from './classes/index'
import { crearTodoHtml, contarPendientes} from './js/componentes'
import './styles.css';


export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );
contarPendientes();




// localStorage es una manera de almacenar datos en el navegador de nuestro cliente final, se mantendran ahi
// aunque cierre o refresque el navegador seguira estando la persistencia de datos

// localStorage.setItem('my-key', 'DanyBb');

// setTimeout(() => {
//     localStorage.removeItem('my-key');
// }, 2000);


// El sessionStorage funciona de igual manera que el localStorage solamente que la persistencia de datos
// esta mientras tengamos abierto el navegador, cuando cerremos el navegador se borrarán todos los datos
// que hayamos tenido en sessionStorage
// sessionStorage.setItem('my-key', 'DanyBb');