import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      "welcome": "Welcome to VoteSathi",
      "home": "Home",
      "learn": "Learn",
      "services": "Services",
      "faq": "FAQ",
      "assistant": "Web Assistant",
      "login": "Login",
      "logout": "Logout",
      "locator": "Polling Booth",
      "register": "Register",
      "calendar": "Calendar",
      "quiz": "Quiz",
      "candidates": "Candidates",
    }
  },
  hi: {
    translation: {
      "welcome": "VoteSathi में आपका स्वागत है",
      "home": "होम",
      "learn": "सीखें",
      "services": "सेवाएं",
      "faq": "सामान्य प्रश्न",
      "assistant": "वेब सहायक",
      "login": "लॉग इन करें",
      "logout": "लॉग आउट",
      "locator": "मतदान केंद्र",
      "register": "पंजीकरण",
      "calendar": "कैलेंडर",
      "quiz": "क्विज़",
      "candidates": "उम्मीदवार",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
