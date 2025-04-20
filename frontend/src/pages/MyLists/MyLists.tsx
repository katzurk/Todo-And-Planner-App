import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ListService } from "../../services/ListService";
import { List, ListInterface } from "./List";
import { AddModal } from "./AddModal";
import { useState } from "react";

export const MyLists = () => {
  const queryClient = useQueryClient();
  const [addModal, setAddModal] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["lists"],
    queryFn: ListService.getAllLists,
  });

  const deleteMutation = useMutation({
    mutationFn: (list_id: number) => ListService.deleteList(list_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  const handleDeleteList = (list_id: number) => {
    deleteMutation.mutate(list_id);
  };

  return (
    <div className="my-lists">
      <div className="list">
        <button className="add-list-button" onClick={() => setAddModal(true)}>
          <i className="bi bi-plus-circle fs-1"></i>
          <span className="ms-2">Add list</span>
        </button>
      </div>
      <AddModal addModal={addModal} setAddModal={setAddModal} />
      {data?.map((list: ListInterface) => (
        <List key={list.list_id} {...list} onDelete={handleDeleteList} />
      ))}
    </div>
  );
};
