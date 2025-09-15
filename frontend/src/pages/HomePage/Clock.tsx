import { useEffect, useState } from "react";

export const Clock = () => {
  const [time, setTime] = useState<Date>(new Date());

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    setInterval(() => setTime(new Date()));
  }, []);

  return (
    <div className="home-element clock">
      <h1>{time?.toLocaleTimeString()}</h1>
      <p>{time?.toLocaleDateString("en-US", options)}</p>
    </div>
  );
};
