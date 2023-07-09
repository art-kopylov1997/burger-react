import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "../app-header";
import HomePage from "../../pages/home-page";
import LoginPage from "../../pages/login-page";
import RegisterPage from "../../pages/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page";
import ProfilePage from "../../pages/profile-page";
import { ProtectedRoute } from "../protected-route";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../redux/action-creators/ingredients-creators";
import { checkUserAuth } from "../../redux/action-creators/auth-creators";
import ErrorBoundary from "../../helpers/error-boundry";
import IngredientDetails from "../ingredient-details";
import NotFoundPage from "../../pages/not-found-page";

function App() {
  const dispatch = useDispatch();
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
          path="/profile/*"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
        </Routes>
      )}
    </ErrorBoundary>
  );
}

export default App;
