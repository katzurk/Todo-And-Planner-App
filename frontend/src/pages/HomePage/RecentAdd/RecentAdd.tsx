import { NewListsComponent } from "./NewLists";
import { NewTasksComponent } from "./NewTasks";

export const RecentAdd = () => {
  return (
    <div>
      <h4>Recently added:</h4>
      <NewListsComponent />
      <NewTasksComponent />
    </div>
  );
};
