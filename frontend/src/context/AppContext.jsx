/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { translations } from "../data/translations";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeModalService, setActiveModalService] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("snortweb_lang") || "en";
  });
  
  const [theme] = useState("dark");
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("snortweb_lang", language);
  }, [language]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/settings");
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const t = (key) => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        isLoaded,
        setIsLoaded,
        activeModalService,
        setActiveModalService,
        menuOpen,
        setMenuOpen,
        contactSuccess,
        setContactSuccess,
        theme,
        setTheme: () => {},
        language,
        setLanguage,
        t,
        settings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
};
