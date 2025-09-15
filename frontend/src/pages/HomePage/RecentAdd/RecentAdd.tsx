import { NewListsComponent } from "./NewLists";
import { NewTasksComponent } from "./NewTasks";

export const RecentAdd = () => {
  return (
    <div className="home-element recent-adds">
      <h4>Recently added:</h4>
      <NewListsComponent />
      <NewTasksComponent />
    </div>
  );
};
