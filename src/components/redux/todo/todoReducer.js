import { v4 as uuid } from "uuid";

import {
  SET_TODO,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  MARK_TODO_DONE,
} from "./todoAction";

const INIT_STATE = {
  todos: [
    {
      id: uuid(),
      title: "Đi ỉa",
      isComplete: false,
      isClick: false,
    },
    {
      id: uuid(),
      title: "Đi ngủ",
      isComplete: false,
      isClick: false,
    },
  ],
};

const todoReducer = (state = INIT_STATE, action) => {
  const { todos } = state;
  console.log("this todo", todos);
  const list = JSON.parse(JSON.stringify(todos));
  console.log({...state, todos: action.todo})
  switch (action.type) {
    case SET_TODO:
      return {...state, todos: action.todo}
    case ADD_TODO:
      return Object.assign({}, state, {     
        todos: [...list, action.todo],    
      });
    case UPDATE_TODO:
      return Object.assign({}, state, {
        todos: [
          ...list.map((todo) => {
            if (todo.id === action.id) todo.title = action.newValue;
            return todo;
          }),
        ],
      });
    case DELETE_TODO:
      return Object.assign({}, state, {
        todos: list.filter((todo) => todo.id !== action.id),
      });
    case MARK_TODO_DONE:
      return Object.assign({}, state, {
        todos: list.map((todo) => {
          if (todo.id === action.id) todo.isComplete = !todo.isComplete;
            return todo;
        })
      });
    default:
      return state;
  }
};

export default todoReducer;
