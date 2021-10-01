export const SET_TODO='SET_TODO';
export const ADD_TODO= 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const MARK_TODO_DONE = 'MARK_TODO_DONE';


export const setTodo =(todo=[]) => {
    return {
        todo,
        type:SET_TODO
    }
}

export const addTodo =(todo={}) => {
    return {
        todo,
        type: ADD_TODO
    }
}

export const updateTodo = (id ='', newValue='') =>{
    return {
        id,
        newValue,
        type: UPDATE_TODO
    }
}

export const deleteTodo =(id) => {
    return {
        id,
        type: DELETE_TODO
    }
}

export const markTodoDone =(id) => {
    return {
        id,
        type: MARK_TODO_DONE
    }
}