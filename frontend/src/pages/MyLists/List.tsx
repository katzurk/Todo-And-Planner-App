import { useState } from "react";
import { Task, ITask } from "./Task";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface IList {
  list_id: number;
  title: string;
  date_created: Date | string;
  tasks: ITask[];
}

interface ListProps extends IList {
  onDelete: (list_id: number) => void;
}

export const List = (props: ListProps) => {
  const [tasks, toggleTasks] = useState<boolean>(false);

  const handleToggleTask = () => {
    toggleTasks(!tasks);
  };

  return (
    <div className={`list ${tasks ? "expanded" : ""}`}>
      <div onClick={handleToggleTask} className="list-header">
        <div className="list-title">
          <h1>{props.title}</h1>
          <p>{new Date(props.date_created).toLocaleDateString()}</p>
        </div>
        <div className="list-buttons">
          <Link to={`/edit-list/${props.list_id}`}>
            <button className="edit-btn">Edit</button>
          </Link>
          <button
            className="delete-btn"
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
          {props.tasks.length !== 0 ? (
            props.tasks.map((task: ITask) => (
              <Task key={task.task_id} {...task} />
            ))
          ) : (
            <h4>No tasks</h4>
          )}
        </div>
      </Collapse>
    </div>
  );
};
