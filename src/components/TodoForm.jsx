import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "./redux/todo/todoAction";
import api from "../api/todo";

//UI
import { FormControl, Container, TextField, Button } from "@material-ui/core";

//notification
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      title: text,
      isComplete: false,
      isClick: false,
    };
    try {
      const response = await api.post("/todos", request);
      addTodo(response.data);
      toast.success('Add Success')
      setText("");
    } catch (error) {
      toast.error('Add fail because ' + error.message, {autoClose: false});
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth={true}>
          <TextField
            label="i will do this"
            required={true}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: 5 }}
            type="submit"
          >
            Add todo
          </Button>
        </FormControl>
        <ToastContainer autoClose={5000}/>
      </form>
    </Container>
  );
};

const mapDispatchToProps = {
  addTodo,
};

export default connect(null, mapDispatchToProps)(TodoForm);
