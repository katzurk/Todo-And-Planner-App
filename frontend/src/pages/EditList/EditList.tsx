import { useQuery } from "@tanstack/react-query";
import { ListService } from "../../services/ListService";
import { TaskInterface } from "../MyLists/Task";
import { TaskInput } from "./TaskInput";
import { useEffect, useState } from "react";
import { ListInterface } from "../MyLists/List";
import { useParams } from "react-router-dom";
import { EditUtils } from "./EditUtils";

export const EditList = () => {
  const { list_id } = useParams();
  const [list, setList] = useState<ListInterface | null>(null);

  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: () => ListService.getListByListId(list_id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const moveTask = (task_id: number, direction: "up" | "down") => {
    if (list) {
      const newTasks = EditUtils.moveTask(task_id, direction, list.tasks);
      setList((prevList: any) => ({ ...prevList, tasks: newTasks }));
    }
  };

  const deleteTask = (task_id: number) => {
    if (list) {
      const newTasks = EditUtils.deleteTask(task_id, list.tasks);
      setList((prevLlist: any) => ({ ...prevLlist, tasks: newTasks }));
    }
  };

  const sortedTasks = list?.tasks.sort(
    (a, b) => a.position_order - b.position_order
  );

  return (
    <form>
      <div className="form-element">
        <label>Title</label>
        <input type="text" value={list?.title} />
      </div>
      {sortedTasks?.map((task: TaskInterface) => (
        <TaskInput {...task} onMove={moveTask} onDelete={deleteTask} />
      ))}
      <input type="submit" value="Save" />
    </form>
  );
};
