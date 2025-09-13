import { useQuery } from "@tanstack/react-query";
import { ListService } from "../../../services/ListService";

export const NewTasksComponent = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["new-tasks"],
    queryFn: ListService.getNewTasks,
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
    <div>
      <h4>new tasks</h4>
      {data?.map((text: string) => (
        <p>{text}</p>
      ))}
    </div>
  );
};
