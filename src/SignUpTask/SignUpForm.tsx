import bcrypt from "bcryptjs";
import React, { useEffect, useState } from "react";
import InputField from "../components/SignUpTaskComponents/InputField";
import googleIcon from "../images/SignUpImages/googleIcon.png";
import rightArrowIcon from "../images/SignUpImages/rightArrowIcon.png";
import "./signUpForm.scss";

const SignUpForm: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [signWithEmail, setSignWithEmail] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const inputInfo = {
    firstName: {
      name: "firstName",
      placeholder: "First Name *",
      required: true,
      minLength: 3,
      pattern: "[a-zA-Zs]+",
      onChange: handleValidation,
      setErrors: setErrors,
    },
    middleName: {
      name: "middleName",
      placeholder: "Middle Name",
      pattern: "[a-zA-Zs]+",
      onChange: handleValidation,
      setErrors: setErrors,
    },
    lastName: {
      name: "lastName",
      placeholder: "Last Name *",
      required: true,
      minLength: 3,
      pattern: "[a-zA-Zs]+",
      onChange: handleValidation,
      setErrors: setErrors,
    },
    promoCode: {
      name: "promoCode",
      placeholder: "Promo Code (optional)",
      minLength: 8,
      onChange: handleValidation,
      setErrors: setErrors,
    },
    email: {
      name: "email",
      placeholder: "Enter your e-mail address",
      type: "email",
      required: true,
      pattern: "^[^@]+@[^@]+\\.[^@]+$",
      onChange: handleValidation,
      setErrors: setErrors,
    },
    password: {
      name: "password",
      placeholder: "Create password",
      type: "password",
      required: true,
      minLength: 8,
      pattern: "^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$",
      onChange: handleValidation,
      setErrors: setErrors,
    },
    agreement: {
      type: "checkbox",
      name: "agreement",
      className: "agreementCheckbox",
      required: true,
      onChange: handleValidation,
      setErrors: setErrors,
    },
  };

  function handleValidation(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked.toString() : value;
    setFormData({ ...formData, [name]: newValue });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!", formData);
    const encryptedPass = bcrypt.hashSync(formData["password"]);
    formData["password"] = encryptedPass;
    console.log("Form submitted with encryption!", formData);
  };

  useEffect(() => {
    const requiredFieldsForSignWithEmail = [
      "firstName",
      "lastName",
      "agreement",
      "email",
      "password",
    ];

    const hasMissingValues = signWithEmail
      ? requiredFieldsForSignWithEmail.some((field) => !formData[field])
      : false;
    const hasErrors = Object.values(errors).some((error) => !!error);
    const isAgreementChecked = formData.agreement === "true";

    const isValidForm = !hasMissingValues && !hasErrors && isAgreementChecked;

    setIsValid(isValidForm);
  }, [formData, errors]);

  return (
    <div className="signUpFormContainer">
      <h2 className="title">Welcome!</h2>
      <p>
        Applying for a Jasper Mastercard is quick and easy, let's get you on
        board.
      </p>
      <form onSubmit={handleSubmit} className="signUpForm">
        <div className="inlineInputContainer">
          <div className="inputDiv">
            <InputField {...inputInfo["firstName"]} />
          </div>
          <div className="inputDiv">
            <InputField {...inputInfo["middleName"]} />
          </div>
        </div>
        <InputField {...inputInfo["lastName"]} />
        <InputField {...inputInfo["promoCode"]} />
        {signWithEmail && (
          <div>
            <InputField {...inputInfo["email"]} />
            <InputField
              {...inputInfo["password"]}
              firstName={formData["firstName"]}
              lastName={formData["lastName"]}
            />
          </div>
        )}
        <div className="checkboxContainer">
          <input {...inputInfo["agreement"]} className="agreementCheckbox" />
          <label htmlFor="agreement" className="agreementLabel">
            By checking this box, you are accepting the terms of the
            <span className="agreementLink"> E-Sign consent Agreement</span>
          </label>
        </div>

        {!signWithEmail ? (
          <button
            type="submit"
            className={"continueButton continueButtonWithGoogle button"}
            disabled={!isValid}
          >
            <img src={googleIcon} className="googleIcon" alt="googleIcon" />
            Continue with Google
          </button>
        ) : (
          <button
            type="submit"
            className={`continueButton  button ${
              !isValid
                ? "disabledContinueButtonWithEmail"
                : "continueButtonWithEmail"
            }`}
            disabled={!isValid}
          >
            Continue
            <img
              src={rightArrowIcon}
              className="arrowIcon"
              alt="Right arrow icon"
            />
          </button>
        )}
      </form>
      <div className="hrContainer">
        <hr />
        <span>or</span>
        <hr />
      </div>
      <button
        className="changeButton button"
        onClick={() => setSignWithEmail(!signWithEmail)}
      >
        {signWithEmail ? "Sign up with google" : "Sign up with e-mail"}
      </button>
    </div>
  );
};

export default SignUpForm;
