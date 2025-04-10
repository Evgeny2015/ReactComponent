import React, { FC, ReactNode, createContext, useContext, useState } from 'react';
import cn from 'clsx';
import './theme-toggle.css';

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
});

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Компонент переключения тем
 */
const ThemeToggle: FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={cn('theme-toggle', theme+'-theme')}>
            <button
                onClick={() => toggleTheme() }
                >{theme}</button>
        </div>
    );
};

export default ThemeToggle;