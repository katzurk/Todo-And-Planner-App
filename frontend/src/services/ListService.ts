import axios from "axios";
import { ListInterface } from "../pages/MyLists/List";

interface moveTaskParams {
  list_id: string | undefined;
  task_id: number;
  direction: string;
}

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
  list_id: string | undefined
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

async function changePosition({ list_id, task_id, direction }: moveTaskParams) {
  return axios.put(`/edit-list/${list_id}`, null, {
    params: { task_id, direction },
  });
}

export const ListService = {
  getAllLists,
  getListByListId,
  toggleTask,
  changePosition,
};
