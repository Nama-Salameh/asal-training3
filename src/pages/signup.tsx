import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import InputField from "../components/customInput";
import googleIcon from "../images/SignUpImages/googleIcon.png";
import rightArrowIcon from "../images/SignUpImages/rightArrowIcon.png";
import localization from "../localizationConfig";
import { GlobalContext } from "../store";
import styles from "./signup.module.scss";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(GlobalContext);
  const [signWithEmail, setSignWithEmail] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const errors = state.data.signUpErrorMessages;

  const inputInfo = {
    firstName: {
      name: localization.firstName,
      placeholder: localization.firstNamePlaceholder,
      required: true,
      minLength: 3,
      pattern: "[a-zA-Zs]+",
      onChange: handleValidation,
    },
    middleName: {
      name: localization.middleName,
      placeholder: localization.middleNamePlaceholder,
      pattern: "[a-zA-Zs]+",
      onChange: handleValidation,
    },
    lastName: {
      name: localization.lastName,
      placeholder: localization.lastNamePlaceholder,
      required: true,
      minLength: 3,
      pattern: "[a-zA-Zs]+",
      onChange: handleValidation,
    },
    promoCode: {
      name: localization.promoCode,
      placeholder: localization.promoCodePlaceholder,
      minLength: 8,
      onChange: handleValidation,
    },
    email: {
      name: localization.email,
      placeholder: localization.emailPlaceholder,
      type: localization.email,
      required: true,
      pattern: "^[^@]+@[^@]+\\.[^@]+$",
      onChange: handleValidation,
    },
    password: {
      name: localization.password,
      placeholder: localization.passwordPlaceholder,
      type: localization.password,
      required: true,
      minLength: 8,
      pattern: "^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$",
      onChange: handleValidation,
    },
    agreement: {
      type: localization.checkbox,
      name: localization.agreement,
      required: true,
      onChange: handleValidation,
    },
  };

  function handleValidation(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    const newValue =
      type === localization.checkbox ? checked.toString() : value;
    setFormData({ ...formData, [name]: newValue });
    dispatch({
      type: "set-input",
      payload: { userData: { ...state.data.userData, [name]: value } },
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!", formData);
    const encryptedPass = bcrypt.hashSync(formData[localization.password]);
    formData[localization.password] = encryptedPass;
    console.log("Form submitted with encryption!", formData);
    localStorage.setItem(localization.email, formData[localization.email]);
    router.push("/home");
  };

  useEffect(() => {
    const requiredFieldsForSignWithEmail = [
      localization.firstName,
      localization.lastName,
      localization.agreement,
      localization.email,
      localization.password,
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
        <h2 className={styles.title}>{localization.welcome}</h2>
        <p>{localization.applyingMessage}</p>
        <form onSubmit={handleSubmit} className={styles.signUpForm}>
          <div className={styles.inlineInputContainer}>
            <div className={styles.inputDiv}>
              <InputField {...inputInfo[localization.firstName]} />
            </div>
            <div className={styles.inputDiv}>
              <InputField {...inputInfo[localization.middleName]} />
            </div>
          </div>
          <InputField {...inputInfo[localization.lastName]} />
          <InputField {...inputInfo[localization.promoCode]} />
          {signWithEmail && (
            <div>
              <InputField {...inputInfo[localization.email]} />
              <InputField {...inputInfo[localization.password]} />
            </div>
          )}
          <div className={styles.checkboxContainer}>
            <input
              {...inputInfo[localization.agreement]}
              className={styles.agreementCheckbox}
            />
            <label
              htmlFor={localization.agreement}
              className={styles.agreementLabel}
            >
              {localization.acceptingTerms}
              <span className={styles.agreementLink}>
                {localization.eSignAgreement}
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
                alt={localization.googleIcon}
              />
              {localization.continueWithGoogle}
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
              {localization.continue}
              <img
                src={rightArrowIcon.src}
                className={styles.arrowIcon}
                alt={localization.rightArrowIcon}
              />
            </button>
          )}
        </form>
        <div className={styles.hrContainer}>
          <hr />
          <span>{localization.or}</span>
          <hr />
        </div>
        <button
          className={` ${styles.changeButton} ${styles.button}`}
          onClick={() => setSignWithEmail(!signWithEmail)}
        >
          {signWithEmail
            ? localization.signWithGoogle
            : localization.signWithEmail}
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
