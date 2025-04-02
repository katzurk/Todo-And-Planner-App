import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { List, ListInterface } from "./List";

export const MyLists = () => {
  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: async (): Promise<ListInterface[]> => {
      const res = await axios.get("/my-lists");
      return res.data as ListInterface[];
    },
  });

  return (
    <div>
      {data?.map((list: ListInterface) => (
        <List key={list.list_id} {...list} />
      ))}
    </div>
  );
};
