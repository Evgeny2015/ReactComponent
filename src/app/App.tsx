import React, { FC, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import cn from 'clsx';
import ThemeToggle, { ThemeContext, ThemeProvider } from 'src/shared/theme-toggle/theme-toggle';
import LanguageToggle, { LanguageProvider } from 'src/shared/lang-toggle/lang-toggle';
import 'src/i18n/config';
import { useTranslation } from 'react-i18next';


const HeadTitle: FC = () => {
      const { t } = useTranslation();
      return (
          <div>
              <p>{t('title')}</p>
          </div>
      )
}

const AppForm: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={cn('App', theme + '-theme')}>
      <header className={cn('App-header', theme + '-theme')}>
        <img src={logo} className="App-logo" alt="logo" />

        <HeadTitle/>
        <div className='tools'>
          <ThemeToggle />
          <LanguageToggle/>
        </div>
      </header>
    </div>
  );
}

const App: FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppForm />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
