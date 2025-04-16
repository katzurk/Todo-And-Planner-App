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

async function submitChangedList(list: ListInterface) {
  try {
    return axios.put(`/edit-list/${list.list_id}/submit`, {
      newTasks: list.tasks,
      title: list.title,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function deleteList(list_id: number) {
  try {
    return axios.post(`/my-lists/delete`, null, { params: { list_id } });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const ListService = {
  getAllLists,
  getListByListId,
  toggleTask,
  submitChangedList,
  deleteList,
};
