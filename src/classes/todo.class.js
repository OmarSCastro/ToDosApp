
export class Todo {

    static fromJSON = ( { tarea, id, completado, creado} ) => {
        const todoTemporal = new Todo ( tarea );

        todoTemporal.id         = id;
        todoTemporal.completado = completado;
        todoTemporal.creado     = creado;

        
        return todoTemporal;
    }

    constructor( tarea ){

        this.tarea      = tarea;
        this.id         = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();
    }
}

