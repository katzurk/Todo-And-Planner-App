import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ListService } from "../../services/ListService";
import { useState } from "react";

export interface ITask {
  list_id: number;
  task_id: number;
  text: string;
  position_order: number;
  is_done: boolean;
}

export const Task = (props: ITask) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(props.is_done);

  const mutation = useMutation({
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

  const handleCheckTask = (task_id: number) => {
    mutation.mutate(task_id);
  };

  return (
    <div className={`task ${isChecked ? "checked" : ""}`}>
      <h1>
        {props.position_order}. {props.text}
      </h1>
      <button className="check" onClick={() => handleCheckTask(props.task_id)}>
        {isChecked ? (
          <i className="bi bi-check-square-fill fs-1"></i>
        ) : (
          <i className="bi bi-square fs-1"></i>
        )}
      </button>
    </div>
  );
};
