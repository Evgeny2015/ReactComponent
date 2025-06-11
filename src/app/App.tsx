import React, { FC, useContext, useEffect } from "react"
import "./App.css"
import cn from "clsx"
import "src/i18n/config"
import { useTranslation } from "react-i18next"
import { Navigate, Route, Routes } from "react-router"
import { ThemeContext } from "src/shared/theme-provider/theme-provider"
import { LanguageContext } from "src/shared/lang-provider/lang-provider"

import Layout from "src/pages/layout/layout"
import ProfilePage from "src/pages/profile/ProfilePage"
import ProductPage from "src/pages/product/ProductPage"
import BasketPage from "src/pages/basket/BasketPage"
import NotFoundPage from "src/pages/not-found/not-found"
import AppRoutes from "./Routes"

const App: FC = () => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("title")
  }, [language])

  return (
    <AppRoutes />
  )
}

export default App;
