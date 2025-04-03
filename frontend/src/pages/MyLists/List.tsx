import { useState } from "react";
import { Task, TaskInterface } from "./Task";
import { Collapse } from "react-bootstrap";

export interface ListInterface {
  list_id: number;
  title: string;
  date_created: Date | string;
  tasks: TaskInterface[];
}

export const List = (props: ListInterface) => {
  const [tasks, toggleTasks] = useState<boolean>(false);

  const handleToggleTask = () => {
    toggleTasks(!tasks);
  };

  return (
    <div className="list">
      <div onClick={handleToggleTask}>
        <h1>{props.title}</h1>
        <p>{new Date(props.date_created).toLocaleDateString()}</p>
      </div>
      <Collapse in={tasks}>
        <div className="task-container">
          {props.tasks.map((task: TaskInterface) => (
            <Task key={task.task_id} {...task} />
          ))}
        </div>
      </Collapse>
    </div>
  );
};
