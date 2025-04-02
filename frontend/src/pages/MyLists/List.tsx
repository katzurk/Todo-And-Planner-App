import React from "react";
import { Task, TaskInterface } from "./Task";

export interface ListInterface {
  list_id: number;
  title: string;
  date_created: Date | string;
  tasks: TaskInterface[];
}

export const List = (props: ListInterface) => {
  return (
    <div className="list">
      <div>
        <h1>{props.title}</h1>
        <p>{new Date(props.date_created).toLocaleDateString()}</p>
      </div>
      {props.tasks.map((task: TaskInterface) => (
        <Task key={task.task_id} {...task} />
      ))}
    </div>
  );
};
