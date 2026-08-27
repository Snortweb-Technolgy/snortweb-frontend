/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { translations } from "../data/translations";
import api from "../api/axios";

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
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [careersEnabled, setCareersEnabled] = useState(true);

  useEffect(() => {
    const checkCareers = async () => {
      try {
        const { data } = await api.get("/careers/status");
        if (data && data.enabled) {
          setCareersEnabled(true);
        } else {
          setCareersEnabled(false);
        }
      } catch (err) {
        setCareersEnabled(false);
      }
    };
    checkCareers();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("snortweb_lang", language);
  }, [language]);

  useEffect(() => {
    const fetchSettings = async () => {
      setIsSettingsLoading(true);
      try {
        const { data } = await api.get("/settings");
        setSettings(data);
      } catch (error) {
        // Quietly failover to static default settings context
      } finally {
        setIsSettingsLoading(false);
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
        settings,
        isSettingsLoading,
        careersEnabled,
        setCareersEnabled
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
