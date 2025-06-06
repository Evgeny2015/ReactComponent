import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router';
import { LanguageProvider } from "src/shared/lang-provider/lang-provider"
import { ThemeProvider } from "src/shared/theme-provider/theme-provider"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
)