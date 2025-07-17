import { ITask } from "../MyLists/Task";

interface TaskInputProps extends ITask {
  onMove: (task_id: number, direction: "up" | "down") => void;
  onDelete: (task_id: number) => void;
  onUpdate: (task_id: number, text: string) => void;
}

export const TaskInput = (props: TaskInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpdate(props.task_id, e.target.value);
  };

  return (
    <div className="task-edit">
      <div className="form-element">
        <label>Task {props.position_order}</label>
        <input type="text" value={props.text} onChange={handleChange} />
      </div>
      <div className="container-buttons">
        <button type="button" onClick={() => props.onMove(props.task_id, "up")}>
          <i className="bi bi-caret-up-fill"></i>
        </button>
        <button
          type="button"
          onClick={() => props.onMove(props.task_id, "down")}
        >
          <i className="bi bi-caret-down-fill"></i>
        </button>
      </div>
      <div className="container-buttons">
        <button
          className="delete-btn"
          type="button"
          onClick={() => props.onDelete(props.task_id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};
