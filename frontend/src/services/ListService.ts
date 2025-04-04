import axios from "axios";
import { ListInterface } from "../pages/MyLists/List";

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
  return axios.put(`/my-lists?task_id=${task_id}`);
}

export const ListService = {
  getAllLists,
  getListByListId,
  toggleTask,
};
