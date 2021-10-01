
import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Provider } from 'react-redux';
import store from "./components/redux/store";

function App() {
  return (

    <Provider store={store}>
      <div>
      <TodoForm 
      ></TodoForm>
      <TodoList
      ></TodoList>
    </div>
    </Provider>
    
  );
}

export default App;
