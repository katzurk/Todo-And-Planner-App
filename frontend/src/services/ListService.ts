import axios from "axios";
import { IList } from "../pages/MyLists/List";

async function getAllLists(): Promise<IList[] | null> {
  try {
    const res = await axios.get("/api/my-lists");
    return res.data as IList[];
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    throw new Error(message);
  }
}

async function getListByListId(
  list_id: number | string | undefined
): Promise<IList | null> {
  try {
    const res = await axios.get(`/api/edit-list/${list_id}`);
    return res.data as IList;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    throw new Error(message);
  }
}

async function toggleTask(task_id: number) {
  try {
    return axios.put(`/api/my-lists`, null, { params: { task_id } });
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    throw new Error(message);
  }
}

async function submitChangedList(list: IList) {
  try {
    return axios.put(`/api/edit-list/${list.list_id}/submit`, {
      newTasks: list.tasks,
      title: list.title,
    });
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    throw new Error(message);
  }
}

async function deleteList(list_id: number) {
  try {
    return axios.post(`/api/my-lists/delete`, null, { params: { list_id } });
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    throw new Error(message);
  }
}

async function addList(title: string) {
  try {
    return axios.post(`/api/my-lists/add`, null, { params: { title } });
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    throw new Error(message);
  }
}

export const ListService = {
  getAllLists,
  getListByListId,
  toggleTask,
  submitChangedList,
  deleteList,
  addList,
};
