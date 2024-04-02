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
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  firstName?: string;
  lastName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  required,
  pattern,
  minLength,
  type = "text",
  onChange,
  setErrors,
  firstName,
  lastName,
}) => {
  const [error, setError] = useState<string>("");
  const [validEmailMessage, setValidEmailMessage] = useState<string>("");

  const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { validity, value } = event.target;
    let errorMessage = "";

    switch (true) {
      case validity.valueMissing:
        errorMessage = "Required!";
        break;
      case (validity.typeMismatch && name === "email") ||
        (validity.patternMismatch && name === "email"):
        errorMessage = "Please enter a valid email";
        break;
      case validity.patternMismatch && name === "password":
        errorMessage = "Enter a valid password";
        break;
      case validity.patternMismatch &&
        (name === "firstName" || name === "lastName" || name === "middleName"):
        errorMessage = "Please enter a valid name";
        break;
      case validity.tooShort:
        errorMessage = "Too short!";
        break;
      default:
        break;
    }

    if (name === "password") {
      if (
        (firstName &&
          value
            .toLowerCase()
            .trim()
            .includes(firstName.toLowerCase().trim())) ||
        (lastName &&
          value.toLowerCase().trim().includes(lastName.toLowerCase().trim()))
      ) {
        errorMessage = "Password cannot include your first or last name";
      }
    }

    setError(errorMessage);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    if (name === "email" && errorMessage === "") {
      setValidEmailMessage(`A verificaiton email will be sent to ${value}`);
    }
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
      />
      {error && (
        <div className="errorMessage">
          <img src={errorIcon} className="errorIcon" alt="error icon" />
          <span>{error}</span>
        </div>
      )}
      {validEmailMessage && (
        <span className="validEmailMessage">{validEmailMessage}</span>
      )}
    </div>
  );
};

export default InputField;
