import bcrypt from "bcryptjs";
import React, { useContext, useEffect, useState } from "react";
import InputField from "../components/customInput";
import googleIcon from "../images/SignUpImages/googleIcon.png";
import rightArrowIcon from "../images/SignUpImages/rightArrowIcon.png";
import styles from "./signup.module.scss";
import { GlobalContext } from "../store";
import { useRouter } from "next/navigation";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(GlobalContext);
  const [signWithEmail, setSignWithEmail] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const errors = state.data.signUpErrorMessages;

  const inputInfo = {
    firstName: {
      name: "firstName",
      placeholder: "First Name *",
      required: true,
      minLength: 3,
      pattern: "[a-zA-Zs]+",
      onChange: handleValidation,
    },
    middleName: {
      name: "middleName",
      placeholder: "Middle Name",
      pattern: "[a-zA-Zs]+",
      onChange: handleValidation,
    },
    lastName: {
      name: "lastName",
      placeholder: "Last Name *",
      required: true,
      minLength: 3,
      pattern: "[a-zA-Zs]+",
      onChange: handleValidation,
    },
    promoCode: {
      name: "promoCode",
      placeholder: "Promo Code (optional)",
      minLength: 8,
      onChange: handleValidation,
    },
    email: {
      name: "email",
      placeholder: "Enter your e-mail address",
      type: "email",
      required: true,
      pattern: "^[^@]+@[^@]+\\.[^@]+$",
      onChange: handleValidation,
    },
    password: {
      name: "password",
      placeholder: "Create password",
      type: "password",
      required: true,
      minLength: 8,
      pattern: "^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$",
      onChange: handleValidation,
    },
    agreement: {
      type: "checkbox",
      name: "agreement",
      required: true,
      onChange: handleValidation,
    },
  };

  function handleValidation(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked.toString() : value;
    setFormData({ ...formData, [name]: newValue });
    dispatch({
      type: "set-input",
      payload: { userData: { ...state.data.userData, [name]: value } },
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!", formData);
    const encryptedPass = bcrypt.hashSync(formData["password"]);
    formData["password"] = encryptedPass;
    console.log("Form submitted with encryption!", formData);
    localStorage.setItem("email", formData["email"]);
    router.push("/home");
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
    <div className={styles.signUpPage}>
      <div className={styles.signUpFormContainer}>
        <h2 className={styles.title}>Welcome!</h2>
        <p>
          Applying for a Jasper Mastercard is quick and easy, let's get you on
          board.
        </p>
        <form onSubmit={handleSubmit} className={styles.signUpForm}>
          <div className={styles.inlineInputContainer}>
            <div className={styles.inputDiv}>
              <InputField {...inputInfo["firstName"]} />
            </div>
            <div className={styles.inputDiv}>
              <InputField {...inputInfo["middleName"]} />
            </div>
          </div>
          <InputField {...inputInfo["lastName"]} />
          <InputField {...inputInfo["promoCode"]} />
          {signWithEmail && (
            <div>
              <InputField {...inputInfo["email"]} />
              <InputField {...inputInfo["password"]} />
            </div>
          )}
          <div className={styles.checkboxContainer}>
            <input
              {...inputInfo["agreement"]}
              className={styles.agreementCheckbox}
            />
            <label htmlFor="agreement" className={styles.agreementLabel}>
              By checking this box, you are accepting the terms of the
              <span className={styles.agreementLink}>
                {" "}
                E-Sign consent Agreement
              </span>
            </label>
          </div>

          {!signWithEmail ? (
            <button
              type="submit"
              className={`${styles.continueButton} ${styles.continueButtonWithGoogle} ${styles.button}`}
              disabled={!isValid}
            >
              <img
                src={googleIcon.src}
                className={styles.googleIcon}
                alt="googleIcon"
              />
              Continue with Google
            </button>
          ) : (
            <button
              type="submit"
              className={`${styles.continueButton} ${styles.button} ${
                isValid
                  ? styles.continueButtonWithEmail
                  : styles.disabledContinueButtonWithEmail
              }`}
              disabled={!isValid}
            >
              Continue
              <img
                src={rightArrowIcon.src}
                className={styles.arrowIcon}
                alt="Right arrow icon"
              />
            </button>
          )}
        </form>
        <div className={styles.hrContainer}>
          <hr />
          <span>or</span>
          <hr />
        </div>
        <button
          className={` ${styles.changeButton} ${styles.button}`}
          onClick={() => setSignWithEmail(!signWithEmail)}
        >
          {signWithEmail ? "Sign up with google" : "Sign up with e-mail"}
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
