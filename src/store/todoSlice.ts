import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types";

function addToLocalStorage(todos:Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getFromLocalStorage() {
    let todos:Todo[] = [];
    const todoRef = localStorage.getItem('todos');
    if (todoRef) {
        todos = JSON.parse(todoRef);
    }
    return todos;
  }

let Todos:Todo[] = getFromLocalStorage();

const todoSlice = createSlice({
  name: "todos",
  initialState: [...Todos],
  reducers: {
    addTodo: (state, action) => {
        const {description, title, isCompleted, isImportant, date, id} = action.payload;
        const newTodo:Todo = {
        id:id,
        title,
        description,
        isCompleted,
        isImportant,
        date,
      };
      state.push(newTodo);
      addToLocalStorage(state)
    },
    updateTodo: (state, action) => {
        const {id, isCompleted, isImportant, title, description, date} = action.payload
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.isCompleted = isCompleted;
        todo.isImportant = isImportant;
        todo.date = date;
        todo.title = title;
        todo.description = description;
      }
      addToLocalStorage(state)
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
      addToLocalStorage(state)

    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;