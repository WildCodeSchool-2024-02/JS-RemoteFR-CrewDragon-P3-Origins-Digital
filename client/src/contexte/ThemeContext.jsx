// ThemeContext.js
import  {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const value = useMemo(
    () => ({
      darkMode,
      toggleDarkMode: () => setDarkMode((prevMode) => !prevMode),
    }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTheme() {
  return useContext(ThemeContext);
}
