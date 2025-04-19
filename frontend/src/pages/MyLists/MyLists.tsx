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
      <div className="list">
        <button className="add-list-button">
          <i className="bi bi-plus-circle fs-1"></i>
          <span className="ms-2">Add list</span>
        </button>
      </div>
      {data?.map((list: ListInterface) => (
        <List key={list.list_id} {...list} onDelete={handleDeleteList} />
      ))}
    </div>
  );
};
