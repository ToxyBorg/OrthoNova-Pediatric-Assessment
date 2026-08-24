import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Language = 'fr' | 'ar';
type LanguageContextValue = { language: Language; isArabic: boolean; setLanguage: (language: Language) => void; toggleLanguage: () => void };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const value = useMemo(() => ({ language, isArabic: language === 'ar', setLanguage, toggleLanguage: () => setLanguage((current) => current === 'fr' ? 'ar' : 'fr') }), [language]);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}