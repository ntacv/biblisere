import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "localization/en";
import fr from "localization/fr";

const resources = {
  en,
  fr,
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en", // default language to use.
  // if you're using a language detector, do not define the lng option
  interpolation: {
    escapeValue: false,
  },
});
export default i18next;
