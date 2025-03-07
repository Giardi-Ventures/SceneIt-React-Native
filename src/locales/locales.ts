import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import {getLocales} from "react-native-localize";

// Import translation files
import en from "./translations/en.json";
import es from "./translations/es.json";

// Define available languages
const resources = {
  en: {translation: en},
  es: {translation: es},
};

// Detect device language
const getDeviceLanguage = () => {
  const locales = getLocales();

  return locales.length > 0 ? locales[0].languageCode : "en";
};

// Initialize i18n
i18next.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(), // Set default language based on device
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already prevents XSS
  },
});

export type TranslationKeys = keyof typeof en; // ✅ Extracts all top-level keys

export default i18next;
