import React, { FC, ReactNode, createContext, useContext, useState } from 'react';
import cn from 'clsx';
import './lang-toggle.css';
import { useTranslation, Trans } from 'react-i18next';

type Language = 'ru' | 'en';

type ILanguage = {
    [index in Language]: { name: string; };
};;

const languages: ILanguage = {
    ru: { name: 'Ру' },
    en: { name: 'En' },
  };

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
    language: "ru",
    setLanguage: (lang: Language) => {},
});

type LanguageProviderProps = {
    children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguage] = useState<Language>("ru");
    const { i18n } = useTranslation();

    const handleLanguage = async (lang: Language) => {
        setLanguage(() => lang);
        await i18n.changeLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

/**
 * Компонент переключения языка
 */
const LanguageToggle: FC = () => {

    const { language, setLanguage } = useContext(LanguageContext);

    return (
        <div className='language-toggle'>
            {Object.keys(languages).map((lng: Language) => (
                <button
                    key={lng}
                    className={cn({'selected': language === lng})}
                    type="button"
                    onClick={() => setLanguage(lng)}
                    >{languages[lng].name}
                </button>
            ))}
        </div>
    );
};

export default LanguageToggle;