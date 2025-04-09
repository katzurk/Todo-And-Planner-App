import { ListInterface } from "../MyLists/List";
import { TaskInterface } from "../MyLists/Task";

function moveTask(
  task_id: number,
  direction: "up" | "down",
  tasks: TaskInterface[]
): TaskInterface[] {
  const index = tasks.findIndex((task) => task.task_id === task_id);
  if (index === -1) return tasks;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= tasks.length) return tasks;
  const newTasks = [...tasks];
  const currentPos = newTasks[index].position_order;
  newTasks[index].position_order = newTasks[swapIndex].position_order;
  newTasks[swapIndex].position_order = currentPos;

  return newTasks;
}

export const EditUtils = {
  moveTask,
};
