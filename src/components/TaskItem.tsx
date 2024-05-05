import {  pen, trash } from "../utils/icons";
import React, { useState } from "react";
import styled from "styled-components";
import formatDate from "../utils/formatDate";
import { themeObject } from "../utils/themes";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../store/todoSlice";
import Modal from "./Modal";
import NewTodo from "./NewTodo";

type  TaskItemProps =  {
  title: string;
  description: string;
  date: number;
  isCompleted: boolean;
  id: number;
  isImportant:boolean;
}

const TaskItem = ({ title, description, date, isCompleted, id, isImportant }: TaskItemProps) => {
    const dispatch = useDispatch();
    const [showModal, setModal] = useState(false);

  return (
    <TaskItemStyled theme={themeObject}>
        {showModal && 
            <Modal 
                content={
                    <NewTodo 
                        onClose={()=>{setModal(false)}}
                        task = {{id, title, description, date, isCompleted, isImportant}}
                        isEdit={true}
                    />
                }
                onClose={()=>setModal(false)} 
            />
        }

      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        
          <button
            className={isCompleted ? "completed": "incomplete"}
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
                isImportant, 
                description,
                title,
                date,
              };
            dispatch(updateTodo(task));
            }}
          >
            {isCompleted ? "Completed" : "Incomplete"}
          </button>
        
        <div className="button-bar">
        <button
          className="edit"
          onClick={() => {
            setModal(true);
          }}
        >
          {pen}
        </button>
        <button
          className="delete"
          onClick={() => {
            dispatch(deleteTodo(id));
          }}
        >
          {trash}
        </button>
        
        <button
          className='star-btn'
          style={{color: isImportant ? 'goldenrod' : ''}}
          onClick={() => {
            const task = {
                id,
                isCompleted,
                isImportant:!isImportant,
                description,
                title,
                date,
              };
              dispatch(updateTodo(task))
          }}
        >
          &#9733;
        </button>

        </div>

      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  width:13rem;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items:flex-start;

  > h1 {
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    margin-top:auto;
    font-size:0.80rem;
    font-weight:500;
  }

  .task-footer {
    display: flex;
    align-items: flex-end;
    justify-content:flex-end;
    gap: 1rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.1rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .button-bar {
        align-items:flex-end;
        justify-content:flex-end;
    }

    .edit {
      margin-left: auto;
    }

    .star-btn{
        font-size:25px;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem;