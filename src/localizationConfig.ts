import LocalizedStrings from "react-localization";
import * as enTranslations from "./locals/en.json";
import * as arTranslation from "./locals/ar.json";

const localization = new LocalizedStrings({
  en: enTranslations,
  //ar: arTranslation,
});

export default localization;
