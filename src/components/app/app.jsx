import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../app-header";
import MainPage from "../../pages/main-page";
import LoginPage from "../../pages/login-page";
import RegisterPage from "../../pages/register-page";
import RestorePasswordPage from "../../pages/restore-password-page";
import ResetPasswordPage from "../../pages/reset-password-page";
import ProfilePage from "../../pages/profile-page";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../redux/action-creators/ingredients-creators";
import { checkUserAuth } from "../../redux/action-creators/registry-creators";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Router>
        <AppHeader />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<RestorePasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
