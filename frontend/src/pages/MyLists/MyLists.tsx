import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Task {
  task_id: number;
  text: string;
  position_order: number;
  is_done: boolean;
}

export interface List {
  list_id: number;
  title: string;
  date_created: Date;
  tasks: Task[];
}

export const MyLists = () => {
  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: async (): Promise<List[]> => {
      const res = await axios.get("/my-lists");
      return res.data as List[];
    },
  });

  return (
    <div>
      {data?.map((list: List) => (
        <div>
          <p>{list.list_id}</p>
          <p>{list.title}</p>
          <p>{list.date_created.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};
