import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { add } from "../utils/icons";
import { themeObject } from "../utils/themes";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../store/todoSlice";
import { Todo } from "../types";

type NewTodoProps = {
    onClose():void;
    task:Todo;
    isEdit:boolean;
  }

const NewTodo = ({  onClose, task, isEdit}: NewTodoProps) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [date, setDate] = useState(task.date || "");
  const [isCompleted, setCompleted] = useState(task.isCompleted || false);
  const [isImportant, setImportant] = useState(task.isImportant || false);

  const dispatch = useDispatch();


  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      date,
      isCompleted,
      isImportant,
      id: new Date().getTime(),
    };

    if(isEdit){
        newTask.id = task.id
    }

    dispatch(!isEdit ? addTodo(newTask) : updateTodo(newTask))
    onClose();
    
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={themeObject}>
       <div className="modal-container">
        
            <div className="header-layout">
                <h1>{!isEdit ? 'Create a Task' :  "Edit Task"}</h1>
                <div className="submit-btn">
                    <Button
                        type="submit"
                        name={!isEdit ?"Create Task" : "Update Task"}
                        icon={add}
                        padding={"0.8rem 2rem"}
                        borderRad={"0.8rem"}
                        fw={"400"}
                        fs={"1rem"}
                        background={"rgb(0, 163, 255)"}
                    />
                </div>
            </div>

            <div className="body-layout">
            <div className="input-control">
                <label htmlFor="title">Title</label>
                <input
                type="text"
                id="title"
                value={title}
                name="title"
                onChange={handleChange("title")}
                placeholder="e.g, Watch Youtube VideT"
                />
            </div>
            <div className="input-control">
                <label htmlFor="description">Description</label>
                <textarea
                value={description}
                onChange={handleChange("description")}
                name="description"
                id="description"
                rows={4}
                placeholder="e.g, Watch a video about React.js"
                ></textarea>
            </div>
            <div className="input-control">
                <label htmlFor="date">Date</label>
                <input
                value={date}
                onChange={handleChange("date")}
                type="date"
                name="date"
                id="date"
                />
            </div>
            <div className="input-control toggler">
                <label htmlFor="completed">Toggle Completed</label>
                <input
                value={isCompleted.toString()}
                onChange={handleChange("completed")}
                type="checkbox"
                name="completed"
                id="completed"
                checked={isCompleted}
                />
            </div>
            <div className="input-control toggler">
                <label htmlFor="important">Toggle Important</label>
                <input
                value={isImportant.toString()}
                onChange={handleChange("important")}
                type="checkbox"
                name="important"
                id="important"
                checked={isImportant}
                />
            </div>
            </div>
      </div>
      
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
    height:30rem;
    width:20rem;

    .modal-container {
        width:32rem;
    }

    .body-layout{
        width:30rem;
    }
    
   h1 {
    font-size: 1.3rem;
    font-weight: 500;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.2rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.4rem;
      display: inline-block;
      font-size: 1rem;

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    .error {
        color:red;
        font-size: 0.75rem;
      }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .header-layout{
    display:flex;
    flex-direction:row;
    justify-content: space-between;
  }

  .submit-btn {
    padding-bottom:1rem;
    transition: all 0.35s ease-in-out;


    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default NewTodo;