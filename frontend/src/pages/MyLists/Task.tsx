import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ListService } from "../../services/ListService";
import { useState } from "react";

export interface TaskInterface {
  task_id: number;
  text: string;
  position_order: number;
  is_done: boolean;
}

export const Task = (props: TaskInterface) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(props.is_done);

  const mutatation = useMutation({
    mutationFn: ListService.toggleTask,
    onMutate: () => {
      setIsChecked((prev) => !prev);
    },
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
    <div className={`task ${isChecked ? "checked" : ""}`}>
      <h1>
        {props.position_order}. {props.text}
      </h1>
      <button className="check" onClick={() => checkTask(props.task_id)}>
        OK
      </button>
    </div>
  );
};
