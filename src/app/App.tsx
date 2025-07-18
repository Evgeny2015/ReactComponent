import React, { FC, useContext, useEffect } from "react"
import "./App.css"
import "src/i18n/config"
import { useTranslation } from "react-i18next"
import { Navigate, Route, Routes } from "react-router"
import { useDispatch } from 'react-redux';

import { LanguageContext } from "src/context/lang-provider/lang-provider"
import Layout from "src/pages/layout/layout"
import ProfilePage from "src/pages/profile/ProfilePage"
import ProductPage from "src/pages/product/ProductPage"
import BasketPage from "src/pages/basket/BasketPage"
import NotFoundPage from "src/pages/not-found/not-found"
import AppRoutes from "./Routes"

import AuthPage from "src/pages/auth/AuthPage"
import RoleRoute from "src/shared/role-route/RoleRoute"
import Logout from "src/shared/logout/logout"

const App: FC = () => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("title")
  }, [language])

  // Установим состояние приложения
  useDispatch()(appActions.set())

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Navigate to={"/prod"} />} />
        <Route index path="/prod" element={<ProductPage />} />
        <Route path="/basket" element={<BasketPage />} />

        <Route path="/profile" element={
          <RoleRoute role="admin" >
            <ProfilePage />
          </RoleRoute>
          } />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App;
