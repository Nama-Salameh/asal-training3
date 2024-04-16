import React, { useState } from "react";
import usePoll from "../hooks/pollHook/pollHook";

const CustomHookSample = () => {
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    const randomId = Math.floor(Math.random() * data.length);
    return data[randomId];
  };

  const { data, error, trigger, start, stop } = usePoll(
    "https://65f7f6dfb4f842e808867e5f.mockapi.io/Asal/movies",
    fetcher,
    1500
  );

  const formattedData = JSON.stringify(
    { data: data?.id, error: error || null },
    null,
    2
  );

  const handleStart = () => {
    start();
    setIsStartButtonDisabled(true);
  };

  const handleStop = () => {
    stop();
    setIsStartButtonDisabled(false);
  };

  return (
    <div>
      <h1>usePoll</h1>
      <button onClick={handleStart} disabled={isStartButtonDisabled}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isStartButtonDisabled}>
        Stop
      </button>
      <button onClick={trigger}>Trigger</button>
      <p>{formattedData} </p>
    </div>
  );
};
export default CustomHookSample;
