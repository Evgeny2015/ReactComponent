import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'

import { rtkStore } from 'src/store/store'
import { LanguageProvider } from "src/context/lang-provider/lang-provider"
import { ThemeProvider } from "src/context/theme-provider/theme-provider"
import App from './app/App';
import './app/index.css';
import AuthProvider from './context/auth-provider/AuthProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={rtkStore}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)