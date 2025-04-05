import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ListService } from "../../services/ListService";
import { useNavigate, useParams } from "react-router-dom";
import { TaskInterface } from "../MyLists/Task";

export const EditList = () => {
  const { list_id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: () => ListService.getListByListId(list_id),
  });

  const mutatation = useMutation({
    mutationFn: ListService.changePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
      navigate(`/edit-list/${list_id}`);
    },
    onError: (error) => {
      console.error("Error moving task:", error);
    },
  });

  const moveTask = (task_id: number, direction: string) => {
    mutatation.mutate({ list_id, task_id, direction });
  };

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
          <button type="button" onClick={() => moveTask(task.task_id, "up")}>
            UP
          </button>
          <button type="button" onClick={() => moveTask(task.task_id, "down")}>
            DOWN
          </button>
        </div>
      ))}
      <input type="submit" value="Save" />
    </form>
  );
};
