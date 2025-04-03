import axios from "axios";
import { ListInterface } from "../pages/MyLists/List";

export const getAllLists = async (): Promise<ListInterface[] | null> => {
  try {
    const res = await axios.get("/my-lists");
    return res.data as ListInterface[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const toggleTask = (task_id: number) => {
  return axios.put(`/my-lists?task_id=${task_id}`);
};
