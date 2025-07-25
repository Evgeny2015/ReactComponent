import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router";

import AuthPage from "src/pages/auth/AuthPage";
import BasketPage from "src/pages/basket/BasketPage";
import Layout from "src/pages/layout/layout";
import LogoutPage from "src/pages/logout/Logout";
import ProductEditDialog from "src/pages/prod-edit/prod-edit.page";
import ProductPage from "src/pages/product/ProductPage";
import ProfilePage from "src/pages/profile/ProfilePage";
import NotFoundPage from "src/pages/not-found/not-found";
import RegisterPage from "src/pages/register/RegisterPage";
import ProtectedRoute from "src/shared/protected-route/ProtectedRoute";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to={"/prod"} />} />
        <Route path="/prod" element={
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
          } />
        <Route path="/basket" element={
          <ProtectedRoute>
            <BasketPage />
          </ProtectedRoute>
          } />
        <Route path="/edit" element={
          <ProtectedRoute>
            <ProductEditDialog />
          </ProtectedRoute>
          } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
          } />

        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes