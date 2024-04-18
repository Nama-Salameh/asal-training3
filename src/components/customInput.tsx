import React, { useContext, useState } from "react";
import errorIcon from "../images/SignUpImages/error.png";
import { GlobalContext } from "../store";
import styles from "./CustomInput.module.scss";

interface CustomInputProps {
  name: string;
  placeholder: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  placeholder,
  required,
  pattern,
  minLength,
  type = "text",
  onChange,
}) => {
  const { state, dispatch } = useContext(GlobalContext);
  const errorMessage = state.data.signUpErrorMessages[name] || "";
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
      const { firstName, lastName } = state.data.userData;
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

    dispatch({
      type: "set-input",
      payload: {
        signUpErrorMessages: {
          ...state.data.signUpErrorMessages,
          [name]: errorMessage,
        },
      },
    });

    if (name === "email" && errorMessage === "") {
      setValidEmailMessage(`A verificaiton email will be sent to ${value}`);
    }
    onChange(event);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        name={name}
        className={`${styles.textInput} ${
          errorMessage ? styles.notValidInput : ""
        }`}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        pattern={pattern}
        type={type}
        onChange={handleValidation}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>
          <img
            src={errorIcon.src}
            className={styles.errorIcon}
            alt="error icon"
          />
          <span>{errorMessage}</span>
        </div>
      )}
      {validEmailMessage && (
        <span className={styles.validEmailMessage}>{validEmailMessage}</span>
      )}
    </div>
  );
};

export default CustomInput;
