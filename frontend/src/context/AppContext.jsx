/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeModalService, setActiveModalService] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  
  const [theme] = useState("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
  }, []);

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
        setTheme: () => {}
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
