import { TaskInterface } from "../MyLists/Task";

interface TaskInputInterface extends TaskInterface {
  onMove: (task_id: number, direction: "up" | "down") => void;
  onDelete: (task_id: number) => void;
}

export const TaskInput = (props: TaskInputInterface) => {
  return (
    <div className="task-edit">
      <div className="form-element">
        <label>Task {props.position_order}</label>
        <input type="text" value={props.text} />
      </div>
      <div className="container-buttons">
        <button type="button" onClick={() => props.onMove(props.task_id, "up")}>
          UP
        </button>
        <button
          type="button"
          onClick={() => props.onMove(props.task_id, "down")}
        >
          DOWN
        </button>
      </div>
      <div className="container-buttons">
        <button type="button" onClick={() => props.onDelete(props.task_id)}>
          DELETE
        </button>
      </div>
    </div>
  );
};
