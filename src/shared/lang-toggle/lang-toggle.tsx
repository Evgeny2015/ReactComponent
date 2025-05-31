import React, { FC, ReactNode, createContext, useContext, useState } from 'react';
import cn from 'clsx';
import './lang-toggle.css';
import { Language, LanguageContext, Languages } from '../lang-provider/lang-provider';


/**
 * Компонент переключения языка
 */
const LanguageToggle: FC = () => {
    const { language, setLanguage } = useContext(LanguageContext);

    return (
        <div className='language-toggle'>
            {Object.keys(Languages).map((lng: Language) => (
                <button
                    key={lng}
                    className={cn({'selected': language === lng})}
                    type="button"
                    onClick={() => setLanguage(lng)}
                    >{Languages[lng].name}
                </button>
            ))}
        </div>
    );
};

export default LanguageToggle;