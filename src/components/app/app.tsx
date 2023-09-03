import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "../app-header";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
  IngredientPage,
  FeedPage,
  OrderDetailsPage,
} from "../../pages";
import { ProtectedRoute } from "../protected-route";

import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { getIngredients } from "../../redux/actions/ingredients";
import { checkUserAuth } from "../../redux/actions/auth";
import ErrorBoundary from "../../helpers/error-boundry";
import IngredientDetailsCard from "../ingredient-details";
import { FC } from "react";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <AppHeader />

      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<ProtectedRoute onlyUnAuth={true} element={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth={true} element={<RegisterPage />} />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute
              onlyUnAuth={true}
              element={<ForgotPasswordPage />}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth={true} element={<ResetPasswordPage />} />
          }
        />
        <Route
          path="/feed"
          element={<ProtectedRoute element={<FeedPage />} />}
        />
        <Route path="/feed/:orderId" element={<OrderDetailsPage />} />
        <Route
          path="/profile/*"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetailsCard />} />
          <Route path="/feed/:orderId" element={<OrderDetailsPage />} />
        </Routes>
      )}
    </ErrorBoundary>
  );
};

export default App;
