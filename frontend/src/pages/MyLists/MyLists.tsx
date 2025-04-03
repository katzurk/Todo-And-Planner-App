import { useQuery } from "@tanstack/react-query";
import { getAllLists } from "../../services/ListService";
import { List, ListInterface } from "./List";

export const MyLists = () => {
  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: getAllLists,
  });

  return (
    <div>
      {data?.map((list: ListInterface) => (
        <List key={list.list_id} {...list} />
      ))}
    </div>
  );
};
