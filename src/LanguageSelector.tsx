import React, { useState } from "react";
import localization from "./localizationConfig";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const changeLanguage = (language: string) => {
    setSelectedLanguage(language);
    localization.setLanguage(language);
  };

  return (
    <div>
      <p>language:</p>
      <button
        onClick={() => changeLanguage("en")}
        disabled={selectedLanguage === "en"}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        disabled={selectedLanguage === "ar"}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSelector;
