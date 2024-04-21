import React, { useContext, useState } from "react";
import errorIcon from "../images/SignUpImages/error.png";
import { GlobalContext } from "../store";
import styles from "./CustomInput.module.scss";
import localization from "../localizationConfig";

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
  const [passwordContainNameErrorMessage, setPasswordContainNameErrorMessage] =
    useState<string | null>(null);

  const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { validity, value } = event.target;
    let errorMessage = "";

    switch (true) {
      case validity.valueMissing:
        errorMessage = localization.requiredErrorMessage;
        break;
      case (validity.typeMismatch && name === localization.email) ||
        (validity.patternMismatch && name === localization.email):
        errorMessage = localization.validEmailErrorMessage;
        break;
      case validity.patternMismatch && name === localization.password:
        errorMessage = localization.validPasswordErrorMessage;
        break;
      case validity.patternMismatch &&
        (name === localization.firstName ||
          name === localization.lastName ||
          name === localization.middleName):
        errorMessage = localization.validNameErrorMessage;
        break;
      case validity.tooShort:
        errorMessage = localization.tooShortErrorMessage;
        break;
      default:
        break;
    }

    if (name === localization.password) {
      const { firstName, lastName } = state.data.userData;
      if (
        (firstName && value.toLowerCase().includes(firstName.toLowerCase())) ||
        (lastName && value.toLowerCase().includes(lastName.toLowerCase()))
      ) {
        //errorMessage = localization.passwordContainNameErrorMessage;
        setPasswordContainNameErrorMessage(
          localization.passwordContainNameErrorMessage
        );
      }
    }

    if (name === localization.firstName || name === localization.lastName) {
      const { password } = state.data.userData;
      if (password.toLowerCase().includes(value.toLowerCase())) {
        setPasswordContainNameErrorMessage(
          localization.passwordContainNameErrorMessage
        );
      } else {
        setPasswordContainNameErrorMessage("");
      }
    }

    dispatch({
      type: "set-input",
      payload: {
        signUpErrorMessages: {
          ...state.data.signUpErrorMessages,
          ["password"]: passwordContainNameErrorMessage,
          [name]: errorMessage,
        },
      },
    });

    if (name === localization.email && errorMessage === "") {
      setValidEmailMessage(
        `${localization.successVerificationEmailMessage} ${value}`
      );
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
            alt={localization.errorIcon}
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
