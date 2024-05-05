
import React, { useState } from "react";
import styled from "styled-components";
import AddTodo from "./NewTodo";
import TaskItem from "./TaskItem";
import { add, plus } from "../utils/icons";
import Modal from "./Modal";
import { themeObject } from "../utils/themes";
import { Todo } from "../types";

type TaskProps = {
  title: string;
  tasks: any[];
}

const Tasks = ({ title, tasks }: TaskProps) => {

    const [showModal, setModal] = useState(false);

  return (
    <TaskStyled theme={themeObject}>
      {showModal && 
        <Modal 
            content={
                <AddTodo 
                    onClose={()=>{setModal(false)}} 
                    task={{} as Todo} 
                    isEdit={false}
                />
            } 
            onClose={()=>setModal(false)} />}
      <h1>{title}</h1>

      <button className="btn-rounded" onClick={()=>{
            setModal(true);
        }}>
        {plus}
      </button>

      <div className="tasks grid">
        {tasks.map((task:Todo) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id}
            isImportant={task.isImportant}
          />
        ))}
        <button className="create-task" onClick={()=>setModal(true)}>
          {add}
          Add New Task
        </button>
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  position: relative;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 90.5vh;
  padding: 2rem;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 1rem;
      right: 3.5rem;
    }
  }

  .tasks {
    margin-top:4rem;
    position:relative;
    display:grid;
    grid-template-columns:repeat(4, 25%);
    align-items:flex-start;
    justify-content:flex-start;
    column-gap: 0.5rem;
    row-gap:1rem;
  }

  > h1 {
    font-size: 2rem;
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width:15.3rem;
    height:11.2rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
