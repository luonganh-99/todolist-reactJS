import React, {useEffect} from "react";
import Todo from "./Todo";
import { connect, useDispatch } from "react-redux";
import { updateTodo, deleteTodo,setTodo } from "./redux/todo/todoAction";
import api from "../api/todo";

const TodoList = ({ todoList, deleteTodo, updateTodo }) => {

    const dispatch = useDispatch();

  /*const fetchTodoList = async () => {
    const response = await axios
      .get("https://612f3e665fc50700175f1512.mockapi.io/api/v1/todos")
      .catch((err) => {
        console.log("Err", err);
      });
      console.log(response.data)
    dispatch(setTodo(response.data));
  };*/

  const retrieveTodos = async () => {
    const response = await api.get("/todos");
    return response.data;
};

  useEffect(() => {
    const getAllTodos = async () => {
        const allTodos = await retrieveTodos();
        if(allTodos) dispatch(setTodo(allTodos));
    };
    getAllTodos();
  }, [])
  return (
    <div>
      {todoList.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
         // checkTodo={markTodoDone}
          id={todo.id}
          isComplete={todo.isComplete}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todos.todos,
  };
};

const mapDispatchToProps = {
  updateTodo,
  deleteTodo,
  //markTodoDone,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
