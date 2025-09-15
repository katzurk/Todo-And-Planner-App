import { useQuery } from "@tanstack/react-query";
import { ListService } from "../../../services/ListService";

export const NewListsComponent = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["new-lists"],
    queryFn: ListService.getNewLists,
  });

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <div className="home-element">
      <h4>new lists</h4>
      {data?.map((title: string) => (
        <p>{title}</p>
      ))}
    </div>
  );
};
