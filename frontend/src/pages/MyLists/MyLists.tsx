import { useQuery } from "@tanstack/react-query";
import { ListService } from "../../services/ListService";
import { List, ListInterface } from "./List";

export const MyLists = () => {
  const { data } = useQuery({
    queryKey: ["lists"],
    queryFn: ListService.getAllLists,
  });

  return (
    <div>
      {data?.map((list: ListInterface) => (
        <List key={list.list_id} {...list} />
      ))}
    </div>
  );
};
