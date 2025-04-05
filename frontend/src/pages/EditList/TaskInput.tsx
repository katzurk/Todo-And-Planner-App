import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskInterface } from "../MyLists/Task";
import { useNavigate } from "react-router-dom";
import { ListService } from "../../services/ListService";
import { useState } from "react";

export const TaskInput = (props: TaskInterface) => {
  const { list_id, task_id } = props;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ListService.changePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
      navigate(`/edit-list/${list_id}`);
    },
    onError: (error) => {
      console.error("Error moving task:", error);
    },
  });

  const moveTask = (direction: string) => {
    mutation.mutate({ list_id, task_id, direction });
  };

  return (
    <div className="task-edit">
      <div className="form-element">
        <label>Task {props.position_order}</label>
        <input type="text" value={props.text} />
      </div>
      <div className="move-buttons">
        <button type="button" onClick={() => moveTask("up")}>
          UP
        </button>
        <button type="button" onClick={() => moveTask("down")}>
          DOWN
        </button>
      </div>
    </div>
  );
};
