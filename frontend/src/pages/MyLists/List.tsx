import { useState } from "react";
import { Task, TaskInterface } from "./Task";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface ListInterface {
  list_id: number;
  title: string;
  date_created: Date | string;
  tasks: TaskInterface[];
}

interface ListProps extends ListInterface {
  onDelete: (list_id: number) => void;
}

export const List = (props: ListProps) => {
  const [tasks, toggleTasks] = useState<boolean>(false);

  const handleToggleTask = () => {
    toggleTasks(!tasks);
  };

  return (
    <div className="list">
      <div onClick={handleToggleTask} className="list-header">
        <div className="list-title">
          <h1>{props.title}</h1>
          <p>{new Date(props.date_created).toLocaleDateString()}</p>
        </div>
        <div className="list-buttons">
          <Link to={`/edit-list/${props.list_id}`}>
            <button>Edit</button>
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.onDelete(props.list_id);
            }}
          >
            Delete
          </button>
        </div>
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
