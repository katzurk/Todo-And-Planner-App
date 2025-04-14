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

function deleteTask(task_id: number, tasks: TaskInterface[]): TaskInterface[] {
  const index = tasks.findIndex((task) => task.task_id === task_id);
  const newTasks = [...tasks];
  newTasks.splice(index, 1);

  return newTasks.map((task, idx) => ({
    ...task,
    position_order: idx + 1,
  }));
}

function updateTask(
  task_id: number,
  updatedFields: Partial<TaskInterface>,
  tasks: TaskInterface[]
): TaskInterface[] {
  return tasks.map((task) =>
    task.task_id === task_id ? { ...task, ...updatedFields } : task
  );
}

function addTask(list: ListInterface): ListInterface {
  const newTask = {
    list_id: list.list_id,
    task_id: Date.now(),
    text: "",
    position_order:
      list.tasks.reduce((max, task) => {
        return task.position_order > max ? task.position_order : max;
      }, -Infinity) + 1,
    is_done: false,
  };
  return { ...list, tasks: [...list.tasks, newTask] };
}

export const EditUtils = {
  moveTask,
  deleteTask,
  updateTask,
  addTask,
};
