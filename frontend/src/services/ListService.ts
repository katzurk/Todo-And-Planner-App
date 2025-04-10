import axios from "axios";
import { ListInterface } from "../pages/MyLists/List";
import { TaskInterface } from "../pages/MyLists/Task";

async function getAllLists(): Promise<ListInterface[] | null> {
  try {
    const res = await axios.get("/my-lists");
    return res.data as ListInterface[];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getListByListId(
  list_id: number | string | undefined
): Promise<ListInterface | null> {
  try {
    const res = await axios.get(`/edit-list/${list_id}`);
    return res.data as ListInterface;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function toggleTask(task_id: number) {
  return axios.put(`/my-lists`, null, { params: { task_id } });
}

async function submitChangedList(
  list_id: string | undefined,
  newTasks: TaskInterface[]
) {
  return axios.put(`/edit-list/${list_id}/submit`, { newTasks: newTasks });
}

export const ListService = {
  getAllLists,
  getListByListId,
  toggleTask,
  submitChangedList,
};
