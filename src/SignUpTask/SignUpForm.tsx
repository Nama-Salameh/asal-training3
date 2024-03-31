import React, { useEffect, useState } from "react";
import "./signUpForm.scss";
import googleIcon from "./googleIcon.png";

const SignUpForm = () => {
  const [signWithEmail, setSignWithEmail] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //event.preventDefault(); // Prevent default form submission
    console.log("Form submitted!", formData);
  };

  const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity } = event.target;
    const newErrors = { ...errors };
    const newFormData = { ...formData };

    if (validity.valueMissing) {
      newErrors[name] = "Required!";
    } else if (validity.tooShort) {
      newErrors[name] = "Too short!";
    } else if (validity.typeMismatch) {
      if (name === "email") {
        newErrors[name] = "Please enter a valid email";
      }
    } else if (validity.patternMismatch) {
      if (name === "password") {
        newErrors[name] = "Enter a valid password";
      } else if (
        name === "firstName" ||
        name === "lastName" ||
        name === "middleName"
      ) {
        newErrors[name] = "Please enter a valid name";
      }
    } else {
      delete newErrors[name];
      newFormData[name] = value;
      console.log(newFormData);
    }
    setErrors(newErrors);
    setFormData(newFormData);
  };

  useEffect(() => {
    const requiredFields = ["firstName", "lastName", "agreement"];
    const hasMissingValues = requiredFields.some((field) => !formData[field]);
    const hasErrors = Object.values(errors).some((errorMsg) => errorMsg !== "");

    setIsValid(!hasErrors && !hasMissingValues);
  }, [formData, errors]);

  return (
    <div className="form">
      <h2>Welcome!</h2>
      <p>
        Applying for a Jasper Mastercard is quick and easy, let's get you on
        board.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="inlineInputContainer">
          <div>
            <input
              name="firstName"
              className="textInput"
              placeholder="First Name *"
              required
              minLength={3}
              pattern="[a-zA-Z\s]+"
              onChange={handleValidation}
            />
            {errors["firstName"] && (
              <span className="errorMessage">{errors["firstName"]}</span>
            )}
          </div>
          <div>
            <input
              name="middleName"
              className="textInput"
              placeholder="Middle Name"
              pattern="[a-zA-Z\s]+"
              onChange={handleValidation}
            />
            {errors["middleName"] && (
              <span className="errorMessage">{errors["middleName"]}</span>
            )}
          </div>
        </div>

        <input
          name="lastName"
          className="textInput blockInput"
          placeholder="Last Name *"
          required
          minLength={3}
          pattern="[a-zA-Z\s]+"
          onChange={handleValidation}
        />
        {errors["lastName"] && (
          <span className="errorMessage">{errors["lastName"]}</span>
        )}
        <input
          name="promoCode"
          className="textInput blockInput"
          placeholder="Promo Code (optional)"
          minLength={8}
          onChange={handleValidation}
        />
        {errors["promoCode"] && (
          <span className="errorMessage">{errors["promoCode"]}</span>
        )}
        {signWithEmail && (
          <div className="emailSignUpContainer">
            <input
              name="email"
              className="textInput blockInput"
              placeholder="Enter your e-mail address"
              type="email"
              required
              onChange={(event) => {
                handleValidation(event);
                setValidEmail(event.target.value);
              }}
            />
            {errors["email"] ? (
              <span className="errorMessage">{errors["email"]}</span>
            ) : (
              validEmail && (
                <span className="validEmailMessage">
                  A verification email will be sent to {validEmail}
                </span>
              )
            )}
            <input
              name="password"
              className="textInput blockInput"
              placeholder="Create password"
              type="password"
              required
              minLength={8}
              pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
              onChange={handleValidation}
            />
            {errors["password"] && (
              <span className="errorMessage">{errors["password"]}</span>
            )}
          </div>
        )}
        <div className="checkboxContanier">
          <input
            type="checkbox"
            name="agreement"
            value="agree"
            className="agreementCheckbox"
            required
            onChange={handleValidation}
          />
          <label htmlFor="agreement">
            By checking this box, you are accepting the terms of the{" "}
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
              Countinue with Google
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
    </div>
  );
};
export default SignUpForm;
