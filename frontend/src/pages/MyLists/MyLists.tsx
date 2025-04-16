import { useQuery } from "@tanstack/react-query";
import { ListService } from "../../services/ListService";
import { List, ListInterface } from "./List";

export const MyLists = () => {
  const { data } = useQuery({
    queryKey: ["lists"],
    queryFn: ListService.getAllLists,
  });

  const handleDeleteList = (list_id: number) => {
    ListService.deleteList(list_id);
  };

  return (
    <div className="my-lists">
      {data?.map((list: ListInterface) => (
        <List key={list.list_id} {...list} onDelete={handleDeleteList} />
      ))}
    </div>
  );
};
