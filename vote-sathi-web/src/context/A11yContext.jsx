import React, { createContext, useState, useContext, useEffect } from 'react';

const A11yContext = createContext();

export const useA11y = () => useContext(A11yContext);

export const A11yProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${16 * fontSizeMultiplier}px`;
  }, [fontSizeMultiplier]);

  const toggleHighContrast = () => setHighContrast(!highContrast);
  const increaseFontSize = () => setFontSizeMultiplier(prev => Math.min(prev + 0.1, 1.5));
  const decreaseFontSize = () => setFontSizeMultiplier(prev => Math.max(prev - 0.1, 0.8));
  const resetA11y = () => {
    setHighContrast(false);
    setFontSizeMultiplier(1);
  };

  return (
    <A11yContext.Provider value={{
      highContrast,
      toggleHighContrast,
      fontSizeMultiplier,
      increaseFontSize,
      decreaseFontSize,
      resetA11y
    }}>
      {children}
    </A11yContext.Provider>
  );
};
