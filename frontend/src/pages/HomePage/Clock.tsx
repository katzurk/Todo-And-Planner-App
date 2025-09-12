import { useEffect, useState } from "react";

export const Clock = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()));
  }, []);

  return <div>{time?.toLocaleString()}</div>;
};
