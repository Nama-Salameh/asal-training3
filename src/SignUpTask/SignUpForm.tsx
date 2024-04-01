import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import InputField from "../components/SignUpTaskComponents/InputField";
import googleIcon from "../images/SignUpImages/googleIcon.png";
import "./signUpForm.scss";

const SignUpForm: React.FC = () => {
  const [signWithEmail, setSignWithEmail] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked.toString() : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!", formData);
  };

  useEffect(() => {
    const requiredFieldsForSignWithEmail = [
      "firstName",
      "lastName",
      "agreement",
      "email",
      "password",
    ];
    const requiredFieldsForSignWithGoogle = [
      "firstName",
      "lastName",
      "agreement",
    ];

    const hasMissingValues = signWithEmail
      ? requiredFieldsForSignWithEmail.some((field) => !formData[field])
      : requiredFieldsForSignWithGoogle.some((field) => !formData[field]);
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
            <InputField
              name="firstName"
              placeholder="First Name *"
              required
              minLength={3}
              pattern="[a-zA-Z\s]+"
              onChange={handleValidation}
              value={formData["firstName"] || ""}
              setErrors={setErrors}
            />
          </div>
          <div className="inputDiv">
            <InputField
              name="middleName"
              placeholder="Middle Name"
              pattern="[a-zA-Z\s]+"
              onChange={handleValidation}
              value={formData["middleName"] || ""}
              setErrors={setErrors}
            />
          </div>
        </div>
        <InputField
          name="lastName"
          placeholder="Last Name *"
          required
          minLength={3}
          pattern="[a-zA-Z\s]+"
          onChange={handleValidation}
          value={formData["lastName"] || ""}
          setErrors={setErrors}
        />
        <InputField
          name="promoCode"
          placeholder="Promo Code (optional)"
          minLength={8}
          onChange={handleValidation}
          value={formData["promoCode"] || ""}
          setErrors={setErrors}
        />
        {signWithEmail && (
          <div>
            <InputField
              name="email"
              placeholder="Enter your e-mail address"
              type="email"
              required
              onChange={handleValidation}
              value={formData["email"] || ""}
              setErrors={setErrors}
            />
            <InputField
              name="password"
              placeholder="Create password"
              type="password"
              required
              minLength={8}
              pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
              onChange={handleValidation}
              value={formData["password"] || ""}
              setErrors={setErrors}
            />
          </div>
        )}
        <div className="checkboxContainer">
          <input
            type="checkbox"
            name="agreement"
            className="agreementCheckbox"
            required
            onChange={handleValidation}
          />
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
            <FontAwesomeIcon icon={faArrowRight} className="arrowIcon" />
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
