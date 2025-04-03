import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toggleTask } from "../../services/ListService";

export interface TaskInterface {
  task_id: number;
  text: string;
  position_order: number;
  is_done: boolean;
}

export const Task = (props: TaskInterface) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutatation = useMutation({
    mutationFn: toggleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
      navigate("/my-lists");
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });

  const checkTask = (task_id: number) => {
    mutatation.mutate(task_id);
  };

  return (
    <div className={`task ${props.is_done ? "checked" : ""}`}>
      <h1>
        {props.position_order}. {props.text}
      </h1>
      <button className="check" onClick={() => checkTask(props.task_id)}>
        OK
      </button>
    </div>
  );
};
