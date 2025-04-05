import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ListService } from "../../services/ListService";
import { useNavigate, useParams } from "react-router-dom";
import { TaskInterface } from "../MyLists/Task";
import { TaskInput } from "./TaskInput";

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
        <TaskInput {...task} />
      ))}
      <input type="submit" value="Save" />
    </form>
  );
};
