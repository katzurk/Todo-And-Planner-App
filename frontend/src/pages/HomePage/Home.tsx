import { Clock } from "./Clock";
import { LatestAdds } from "./LatestAdds";

export const Home = () => {
  return (
    <div>
      <div>Hello, *name*</div>
      <div>
        <Clock />
        <LatestAdds />
      </div>
    </div>
  );
};
