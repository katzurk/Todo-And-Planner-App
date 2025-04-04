import { useQuery } from "@tanstack/react-query";
import { ListService } from "../../services/ListService";
import { useParams } from "react-router-dom";
import { TaskInterface } from "../MyLists/Task";

export const EditList = () => {
  const { list_id } = useParams();
  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: () => ListService.getListByListId(list_id),
  });

  return (
    <form>
      <div className="form-element">
        <label>Title</label>
        <input type="text" value={data?.title} />
      </div>
      {data?.tasks?.map((task: TaskInterface) => (
        <div className="task-edit">
          <div className="form-element">
            <label>Task {task.position_order}</label>
            <input type="text" value={task.text} />
          </div>
          <button>UP</button>
          <button>DOWN</button>
        </div>
      ))}
      <input type="submit" value="Save" />
    </form>
  );
};
