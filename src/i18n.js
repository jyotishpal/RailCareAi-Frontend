import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          railCareAI :"RailCareAI",
          fileComplaint: "File Complaint",
          complaintStatus: "Complaint Status",
          dashboard: "Dashboard",
          logout: "Logout",
          signIn: "Sign In",
          signUp: "Sign Up",
          superAdminPanel: "Super Admin Panel",
          WelcometoRailCareAI :"Welcome to RailCareAI"
        }
      },
      hi: {
        translation: {
          railCareAI :"रेलकेयर एआई",
          fileComplaint: "शिकायत दर्ज करें",
          complaintStatus: "शिकायत की स्थिति",
          dashboard: "डैशबोर्ड",
          logout: "लॉगआउट",
          signIn: "साइन इन",
          signUp: "रजिस्टर करें",
          superAdminPanel: "सुपर एडमिन पैनल",
          WelcometoRailCareAI: "रेलकेयर एआई में आपका स्वागत है"
        }
      }
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
