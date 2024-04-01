import React, { useEffect, useState } from "react";
import "./signUpForm.scss";
import googleIcon from "../images/SignUpImages/googleIcon.png";
import InputField from "../components/SignUpTaskComponents/InputField";

const SignUpForm: React.FC = () => {
  const [signWithEmail, setSignWithEmail] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  //   const [submittedData, setSubmittedData] = useState<{ [key: string]: string }>(
  //     {}
  //   );

  const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //setSubmittedData(formData);
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
      ? requiredFieldsForSignWithEmail.some(
          (field) => !formData[field] && field !== "middleName"
        )
      : requiredFieldsForSignWithGoogle.some(
          (field) => !formData[field] && field !== "middleName"
        );
    const hasErrors = Object.values(errors).some((error) => !!error);
    const isValidForm = !hasMissingValues && !hasErrors;
    
    setIsValid(isValidForm);
  }, [formData, errors]);

  return (
    <div className="signUpForm">
      <h2>Welcome!</h2>
      <p>
        Applying for a Jasper Mastercard is quick and easy, let's get you on
        board.
      </p>
      <form onSubmit={handleSubmit}>
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
          <div className="emailSignUpContainer">
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
            value="agree"
            className="agreementCheckbox"
            required
            onChange={handleValidation}
          />
          <label htmlFor="agreement">
            By checking this box, you are accepting the terms of the
            <span className="agreementLink"> E-Sign consent Agreement</span>
          </label>
        </div>
        <button
          type="submit"
          className={`continueButton ${!isValid ? "disabled" : ""}`}
          disabled={!isValid}
        >
          {signWithEmail ? (
            "Continue"
          ) : (
            <div className="continueWithGoogle">
              <img src={googleIcon} className="googleIcon" alt="googleIcon" />
              Continue with Google
            </div>
          )}
        </button>
      </form>
      <div className="hrContainer">
        <hr />
        <span>or</span>
        <hr />
      </div>
      <button
        className="changeButton"
        onClick={() => setSignWithEmail(!signWithEmail)}
      >
        {signWithEmail ? "Sign up with google" : "Sign up with e-mail"}
      </button>

      {/* {Object.keys(submittedData).length > 0 && (
        <div className="submittedData">
          <h3>Submitted Data:</h3>
          <ul>
            {Object.entries(submittedData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default SignUpForm;
