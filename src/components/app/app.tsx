import { FC, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import AppHeader from "../app-header";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  IngredientPage,
  FeedPage,
  OrderDetailsPage,
} from "../../pages";
import { ProtectedRoute } from "../protected-route";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { getIngredients } from "../../redux/actions/ingredients";
import { checkUserAuth } from "../../redux/actions/auth";
import ErrorBoundary from "../../helpers/error-boundry";
import IngredientDetailsCard from "../ingredient-details";
import Profile from "../../pages/profile/profile";
import ProfileOrders from "../../pages/profile/profile-orders/profile-orders";
import { ProfileForms } from "../../pages/profile/profile-forms/profile-forms";
import OrderDetailsCard from "../order-details-card";

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

        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:orderId" element={<OrderDetailsPage />} />

        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        >
          <Route
            path=""
            element={<ProtectedRoute element={<ProfileForms />} />}
          />
          <Route
            path="orders"
            element={<ProtectedRoute element={<ProfileOrders />} />}
          />
        </Route>
        <Route
          path="/profile/orders/:orderId"
          element={<ProtectedRoute element={<OrderDetailsCard />} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetailsCard />} />
          <Route path="/feed/:orderId" element={<OrderDetailsCard />} />
          <Route
            path="/profile/orders/:orderId"
            element={<ProtectedRoute element={<OrderDetailsCard />} />}
          />
        </Routes>
      )}
    </ErrorBoundary>
  );
};

export default App;
