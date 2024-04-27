import React, { useEffect, useState, useContext, createContext } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "white");

    const changeTheme = () => {
        setTheme(prevTheme => (prevTheme === "dark" ? "white" : "dark"));
    };

    const value = {
        theme,
        changeTheme,
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        // Uncomment the following line if you want to dynamically change theme
        // document.querySelector('html').setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeContextProvider");
    }
    return context;
};
