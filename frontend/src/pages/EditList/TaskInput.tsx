import { TaskInterface } from "../MyLists/Task";

interface TaskInputInterface extends TaskInterface {
  onMove: (task_id: number, direction: "up" | "down") => void;
}

export const TaskInput = (props: TaskInputInterface) => {
  return (
    <div className="task-edit">
      <div className="form-element">
        <label>Task {props.position_order}</label>
        <input type="text" value={props.text} />
      </div>
      <div className="move-buttons">
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
    </div>
  );
};
