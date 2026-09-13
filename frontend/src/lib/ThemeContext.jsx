import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
  glassMode: true,
  toggleGlassMode: () => {},
  setGlassMode: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("chakravyuh_theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark"; // Default to high-tech dark mode
  });

  const [glassMode, setGlassMode] = useState(() => {
    const saved = localStorage.getItem("chakravyuh_glass_mode");
    return saved !== "false"; // Default to true (Active glass morphism)
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      body?.classList.add("light");
      body?.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      body?.classList.add("dark");
      body?.classList.remove("light");
      root.setAttribute("data-theme", "dark");
    }
    localStorage.setItem("chakravyuh_theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (glassMode) {
      root.classList.add("glass-mode-active");
      body?.classList.add("glass-mode-active");
    } else {
      root.classList.remove("glass-mode-active");
      body?.classList.remove("glass-mode-active");
    }
    localStorage.setItem("chakravyuh_glass_mode", String(glassMode));
  }, [glassMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleGlassMode = () => {
    setGlassMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, glassMode, toggleGlassMode, setGlassMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
