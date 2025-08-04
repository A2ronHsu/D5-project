// src/context/ThemeContext.ts
import { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define the type for your context value
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Create the Context Object with a default value (optional, but good for types)
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define a type for the children prop
interface ThemeProviderProps {
  children: ReactNode;
}

// 3. Create a custom Provider component (best practice)
// This component will hold the state and provide it.
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // The value prop is crucial! It holds the data/functions to be shared.
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Optional: Create a custom hook to consume the context
// This adds a layer of error checking and simplifies consumption
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};