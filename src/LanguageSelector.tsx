import React, { useState } from "react";
import localization from "./localizationConfig";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleChangeLanguage = (language: string) => {
    console.log("prev language : ", localization.getLanguage());
    setSelectedLanguage(language);
    console.log("selected language : ", selectedLanguage);
    localization.setLanguage(language);
    console.log("current language : ", localization.getLanguage());
  };

  return (
    <div>
      <p>language:</p>
      <button
        onClick={() => handleChangeLanguage("en")}
        disabled={selectedLanguage === "en"}
      >
        English
      </button>
      <button
        onClick={() => handleChangeLanguage("ar")}
        disabled={selectedLanguage === "ar"}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSelector;
