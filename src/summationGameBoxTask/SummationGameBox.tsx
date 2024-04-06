import React, { useEffect, useState } from "react";
import "./summationGameBox.scss";

const SummationGameBox: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [randomResults, setRandomResults] = useState<number[]>([]);
  const [result, setResult] = useState<number>(0);
  const [counters, setCounters] = useState<{
    roundCounter: number;
    correct: number;
    wrong: number;
  }>({ roundCounter: 1, correct: 0, wrong: 0 });
  const [message, setMessage] = useState<string>("");
  const [resetButtonDisplayed, setResetButtonDisplayed] =
    useState<boolean>(false);

  const generateRandomNumber = (
    min: number,
    max: number,
    exclude?: number[]
  ): number => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    while (exclude && exclude.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randomNumber;
  };

  const setValues = () => {
    const newNumbers = Array.from({ length: 2 }, () =>
      generateRandomNumber(1, 20)
    );
    setNumbers(newNumbers);
    const newResult = newNumbers[0] + newNumbers[1];
    setResult(newResult);
    const firstResult = generateRandomNumber(1, 50, [newResult]);
    const secondResult = generateRandomNumber(1, 50, [newResult, firstResult]);
    setRandomResults([firstResult, secondResult]);
  };

  const handleClick = (value: number) => {
    if (value === result) {
      setCounters((prevCounters) => ({
        ...prevCounters,
        correct: prevCounters.correct + 1,
      }));
    } else {
      setCounters((prevCounters) => ({
        ...prevCounters,
        wrong: prevCounters.wrong + 1,
      }));
    }
    if (counters.roundCounter !== 5) {
      setValues();
      setCounters((prevCounters) => ({
        ...prevCounters,
        roundCounter: prevCounters.roundCounter + 1,
      }));
    }
  };

  const handleResetClick = () => {
    setCounters((prevCounters) => ({ ...prevCounters, correct: 0, wrong: 0 }));
    setMessage("");
    setResetButtonDisplayed(false);
    setValues();
    setCounters((prevCounters) => ({
      ...prevCounters,
      roundCounter: 1,
    }));
  };

  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    if (counters.wrong !== 0) {
      setMessage("Try guessing again");
      setTimeout(() => {
        handleResetClick();
      }, 4000);
    } else if (counters.roundCounter === 5 && counters.correct === 5) {
      setMessage("All guesses are correct!");
      setResetButtonDisplayed(true);
    }
  }, [counters]);

  return (
    <div className="summationGameBoxContainer">
      <div className="equationContainer">
        {numbers[0]} + {numbers[1]}
      </div>
      <div className="resultButtonsContainer">
        {[result, ...randomResults]
          .sort(() => Math.random() - 0.5)
          .map((value, index) => (
            <button
              key={index}
              className="resultButton button"
              onClick={() => handleClick(value)}
            >
              {value}
            </button>
          ))}
      </div>
      <p>Round: {counters.roundCounter}</p>

      <div className="resultContainer">
        <p>{message} </p>
        {resetButtonDisplayed && (
          <button className="resetButton button" onClick={handleResetClick}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default SummationGameBox;
