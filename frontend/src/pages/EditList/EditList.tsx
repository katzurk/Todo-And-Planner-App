import { useQuery } from "@tanstack/react-query";
import { ListService } from "../../services/ListService";
import { ITask } from "../MyLists/Task";
import { TaskInput } from "./TaskInput";
import { useEffect, useState } from "react";
import { IList } from "../MyLists/List";
import { useNavigate, useParams } from "react-router-dom";
import { EditUtils } from "../../utils/EditUtils";

export const EditList = () => {
  const navigate = useNavigate();
  const { list_id } = useParams();
  const [list, setList] = useState<IList | null>(null);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["list"],
    queryFn: () => ListService.getListByListId(list_id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const handleMoveTask = (task_id: number, direction: "up" | "down") => {
    if (list?.tasks) {
      const newTasks = EditUtils.moveTask(task_id, direction, list.tasks);
      setList((prevList: any) => ({ ...prevList, tasks: newTasks }));
    }
  };

  const handleDeleteTask = (task_id: number) => {
    if (list?.tasks) {
      const newTasks = EditUtils.deleteTask(task_id, list.tasks);
      setList((prevLlist: any) => ({ ...prevLlist, tasks: newTasks }));
    }
  };

  const updateTask = (task_id: number, text: string) => {
    if (list?.tasks) {
      const newTasks = EditUtils.updateTask(
        task_id,
        { text: text },
        list.tasks
      );
      setList((prevList: any) => ({ ...prevList, tasks: newTasks }));
    }
  };

  const handleAddTask = () => {
    if (list) {
      setList(EditUtils.addTask(list));
    }
  };

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setList((prevList: any) => ({ ...prevList, title: e.target.value }));
  };

  const handleSubmit = () => {
    if (list) {
      ListService.submitChangedList(list);
      navigate("/my-lists");
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return <h3>Error: {error.message}</h3>;
  }

  const sortedTasks = list?.tasks.sort(
    (a, b) => a.position_order - b.position_order
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-element">
        <label>Title</label>
        <input type="text" value={list?.title} onChange={updateTitle} />
      </div>
      {sortedTasks?.map((task: ITask) => (
        <TaskInput
          {...task}
          onMove={handleMoveTask}
          onDelete={handleDeleteTask}
          onUpdate={updateTask}
        />
      ))}
      <div className="task-edit">
        <button
          type="button"
          className="form-element"
          onClick={() => handleAddTask()}
        >
          <i className="bi bi-plus-lg fs-1"></i>
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            navigate("/my-lists");
          }}
        >
          Cancel
        </button>
        <input className="edit-btn" type="submit" value="Save" />
      </div>
    </form>
  );
};
