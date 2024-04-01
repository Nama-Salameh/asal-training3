import React, { useState } from "react";
import errorIcon from "../../images/SignUpImages/error.png";
import "./inputField.scss";

interface InputFieldProps {
  name: string;
  placeholder: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  required,
  pattern,
  minLength,
  type = "text",
  onChange,
  value,
  setErrors,
}) => {
  const [error, setError] = useState<string>("");

  const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { validity } = event.target;

    let errorMessage = "";

    if (validity.valueMissing) {
      errorMessage = "Required!";
    } else if (validity.tooShort) {
      errorMessage = "Too short!";
    } else if (validity.typeMismatch) {
      if (name === "email") {
        errorMessage = "Please enter a valid email";
      }
    } else if (validity.patternMismatch) {
      if (name === "password") {
        errorMessage = "Enter a valid password";
      } else if (
        name === "firstName" ||
        name === "lastName" ||
        name === "middleName"
      ) {
        errorMessage = "Please enter a valid name";
      }
    }

    setError(errorMessage);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    onChange(event);
  };

  return (
    <div className="inputContainer">
      <input
        name={name}
        className={`textInput ${error ? "notValidInput" : ""}`}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        pattern={pattern}
        type={type}
        onChange={handleValidation}
        value={value}
      />
      {error && (
        <div className="errorMessage">
          <img src={errorIcon} className="errorIcon" alt="error icon" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;
