import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Check, Delete, Edit } from "@material-ui/icons";

import { markTodoDone } from "./redux/todo/todoAction";
import { connect } from "react-redux";
import api from "../api/todo";

//notification
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";


const Todo = ({
  title,
  markTodoDone,
  id,
  isComplete,
  deleteTodo,
  updateTodo,
}) => {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState("");

  const onClose = async () => {
    await api.put(`/todos/${id}`);
    updateTodo(id, edit)
    setEdit("")
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true)
    
  };

  const markComplete = async () => {
    await api.put(`/todos/${id}`);
    markTodoDone(id);
  }

  const delTodo = async () => {
    try{
    await api.delete(`/todos/${id}`);
    deleteTodo(id);
    toast.warning('Delete Success')
    } catch (error) {
      toast.error('Delete fail because ' + error.message, {autoClose: false});
    }
  }

  const todoStyle = isComplete
    ? { textDecoration: "line-through" }
    : { textDecoration: "none" };

  return (
    <div>
      <Container>
        <Card
          variant="outLined"
          style={{ marginTop: 35, background: "Lightgray" }}
        >
          <CardContent>
            {/* Check Icon */}
            <Typography varian="h5" component="h2" style={todoStyle}>
              <IconButton onClick={markComplete}>
                <Check style={{ color: "green" }} />
              </IconButton>
              {title}
              <IconButton style={{ float: "right" }} onClick={delTodo}>
                <Delete style={{ color: "red" }} />
              </IconButton>
              <IconButton style={{ float: "right" }} onClick={handleClickOpen}>
                <Edit style={{ color: "Blue" }} />
              </IconButton>
            </Typography>
          </CardContent>
        </Card>
      </Container>
        <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>What will you edit ?</DialogContentText>
          <TextField
            label="i will you change"
            required={true}
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Cancel</Button>
          <Button onClick={onClose} color="primary">submit</Button>
        </DialogActions>
      </Dialog> 
    </div>  
  );
};

const mapDispatchToProps = {
  markTodoDone,
};

export default connect(null,mapDispatchToProps)(Todo);
