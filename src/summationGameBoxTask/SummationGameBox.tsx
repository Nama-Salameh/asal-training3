import React, { useEffect, useState } from "react";
import CorrectIcon from "../images/SummationGameBoxImages/correct.png";
import wrongIcon from "../images/SummationGameBoxImages/wrong.png";
import "./summationGameBox.scss";

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
  const [equations, setEquations] = useState<equation[]>([]);

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
    const newResult = newNumbers[0] + newNumbers[1];
    const firstRandomResult = generateRandomNumber(
      newResult - 3,
      newResult + 3,
      [newResult]
    );
    const secondRandomResult = generateRandomNumber(
      newResult - 3,
      newResult + 3,
      [newResult, firstRandomResult]
    );
    setNumbers(newNumbers);
    setResult(newResult);
    setRandomResults([firstRandomResult, secondRandomResult]);
  };

  const handleClick = (value: number) => {
    const isCorrect = value === result;
    setCounters((prevCounters) => ({
      ...prevCounters,
      [isCorrect ? "correct" : "wrong"]:
        prevCounters[isCorrect ? "correct" : "wrong"] + 1,
    }));

    if (!isCorrect)
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

    if (counters.roundCounter + 1 > 5) {
      if (counters.correct + (isCorrect ? 1 : 0) === 5) {
        setMessage("All guesses are correct!");
      } else if (counters.wrong !== 0) {
        setMessage("Try guessing again");
      }
    }

    setValues();
    setCounters((prevCounters) => ({
      ...prevCounters,
      roundCounter: prevCounters.roundCounter + 1,
    }));
  };

  const handleResetClick = () => {
    setCounters({ roundCounter: 1, correct: 0, wrong: 0 });
    setMessage("");
    setEquations([]);
    setValues();
  };

  useEffect(() => {
    setValues();
  }, []);

  return (
    <div className="summationGameBoxContainer">
      {counters.roundCounter <= 5 ? (
        <div className="container">
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
        </div>
      ) : (
        <div className="container">
          <div className="resultContainer">
            <p>{message}</p>
            <button className="resetButton button" onClick={handleResetClick}>
              {equations.length > 0 ? "Try again" : "Reset"}
            </button>
          </div>
          {equations.length > 0 && (
            <div className="wrongEquationsContainer">
              <h4>Your wrong guesses :</h4>
              {equations
                .filter((equation) => !equation.isCorrect)
                .map((equation, index) => (
                  <div key={index} className="equation">
                    <div className="wrongEquation">
                      <p>
                        {equation.num1} + {equation.num2} ={" "}
                        {equation.selectedResult}
                      </p>
                      <img
                        src={wrongIcon}
                        alt="Wrong icon"
                        className="wrongIcon"
                      />
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
      )}
    </div>
  );
};

export default SummationGameBox;
