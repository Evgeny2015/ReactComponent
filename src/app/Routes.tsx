import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router";

import BasketPage from "src/pages/basket/BasketPage";
import NotFoundPage from "src/pages/not-found/not-found";
import ProductPage from "src/pages/product/ProductPage";
import ProfilePage from "src/pages/profile/ProfilePage";
import Layout from "src/pages/layout/layout";
import ProductEditDialog from "src/pages/prod-edit/prod-edit.page";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Navigate to={"/prod"} />} />
        <Route index path="/prod" element={<ProductPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit" element={<ProductEditDialog />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes