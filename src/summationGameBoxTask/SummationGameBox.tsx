import React, { useEffect, useState } from "react";
import "./summationGameBox.scss";
import wrongIcon from "../images/SummationGameBoxImages/wrong.png";
import CorrectIcon from "../images/SummationGameBoxImages/correct.png";
interface equation {
  num1: number;
  num2: number;
  result: number;
  selectedResult: number;
  isCorrect: boolean;
}
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
  const [equations, setEquations] = useState<equation[]>([]);
  const [displayEquations, setDisplayEquations] = useState<boolean>(false);

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
    const isCorrect = value === result;
    setCounters((prevCounters) => ({
      ...prevCounters,
      [isCorrect ? "correct" : "wrong"]:
        prevCounters[isCorrect ? "correct" : "wrong"] + 1,
    }));
    setEquations((prevEquations) => [
      ...prevEquations,
      {
        num1: numbers[0],
        num2: numbers[1],
        result: result,
        selectedResult: value,
        isCorrect: isCorrect,
      },
    ]);
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
    setEquations([]);
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
    if (counters.roundCounter === 5 && counters.correct === 5) {
      setMessage("All guesses are correct!");
      setResetButtonDisplayed(true);
    } else if (counters.roundCounter === 5 && counters.wrong !== 0) {
      setMessage("Try guessing again");
      setDisplayEquations(true);
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
      {displayEquations && (
        <div className="equationsContainer">
          <h4>Your wrong guessess : </h4>
          {equations
            .filter((equation) => !equation.isCorrect)
            .map((equation, index) => (
              <div key={index} className="equation">
                <div className="wrongEquation">
                  <p>
                    {equation.num1} + {equation.num2} ={" "}
                    {equation.selectedResult}
                  </p>
                  <img src={wrongIcon} alt="Wrong icon" className="wrongIcon" />
                </div>
                but should
                <div className="correctEquation">
                  <p className="correct">
                    {equation.num1} + {equation.num2} = {equation.result}
                  </p>
                  <img
                    src={CorrectIcon}
                    alt="Correct icon"
                    className="correctIcon"
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SummationGameBox;
