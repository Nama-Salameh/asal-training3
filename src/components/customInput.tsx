import React, { useContext, useState } from "react";
import errorIcon from "../images/SignUpImages/error.png";
import localization from "../localizationConfig";
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
  const [errorMessage, setErrorMessage] = useState(
    state.data.signUpErrorMessages[name] || ""
  );
  const [validEmailMessage, setValidEmailMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const validateInput = (event: any) => {
    const { validity } = event.target;
    switch (true) {
      case validity.valueMissing:
        setErrorMessage(localization.requiredErrorMessage);
        break;
      case (validity.typeMismatch && name === localization.email) ||
        (validity.patternMismatch && name === localization.email):
        setErrorMessage(localization.validEmailErrorMessage);
        break;
      case validity.patternMismatch && name === localization.password:
        setErrorMessage(localization.validPasswordErrorMessage);
        break;
      case validity.patternMismatch &&
        (name === localization.firstName ||
          name === localization.lastName ||
          name === localization.middleName):
        setErrorMessage(localization.validNameErrorMessage);
        break;
      case validity.tooShort:
        setErrorMessage(localization.tooShortErrorMessage);
        break;
      default:
        setErrorMessage("");
        break;
    }
  };

  const handleChangeErrorMessage = (passwordErrorMessage?: string) => {
    if (passwordErrorMessage) {
      console.log("change with pass");
      console.log("pass ", passwordErrorMessage);
      dispatch({
        type: "set-input",
        payload: {
          signUpErrorMessages: {
            ...state.data.signUpErrorMessages,
            ["password"]: passwordErrorMessage,
            [name]: errorMessage,
          },
        },
      });
    } else {
      console.log("change without pass");
      dispatch({
        type: "set-input",
        payload: {
          signUpErrorMessages: {
            ...state.data.signUpErrorMessages,
            [name]: errorMessage,
          },
        },
      });
    }
  };

  const handleBlurValidation = (event: any) => {
    const { value } = event.target;

    if (name !== localization.password) {
      validateInput(event);
      if (name === localization.firstName || name === localization.lastName) {
        console.log("included");
        const { password } = state.data.userData;
        setPasswordErrorMessage(
          password.toLowerCase().includes(value.toLowerCase())
            ? localization.passwordContainNameErrorMessage
            : ""
        );

        if (passwordErrorMessage)
          handleChangeErrorMessage(passwordErrorMessage);
        else handleChangeErrorMessage();
        console.log(state);
      }

      if (name === localization.email && errorMessage === "") {
        setValidEmailMessage(
          `${localization.successVerificationEmailMessage} ${value}`
        );
      }
      onChange(event);
    }
  };

  const handleChangeValidation = (event: any) => {
    const { value } = event.target;
    if (name === localization.password) {
      validateInput(event);

      if (!errorMessage) {
        const { firstName, lastName } = state.data.userData;
        if (
          (firstName &&
            value.toLowerCase().includes(firstName.toLowerCase())) ||
          (lastName && value.toLowerCase().includes(lastName.toLowerCase()))
        ) {
          setErrorMessage(localization.passwordContainNameErrorMessage);
        }
      }

      handleChangeErrorMessage();
      onChange(event);
    }
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
        onChange={handleChangeValidation}
        onBlur={handleBlurValidation}
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
      {validEmailMessage && !errorMessage && (
        <span className={styles.validEmailMessage}>{validEmailMessage}</span>
      )}
    </div>
  );
};

export default CustomInput;
