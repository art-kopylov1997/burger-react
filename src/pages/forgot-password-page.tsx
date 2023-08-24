import React, { FC, SyntheticEvent } from "react";
import classes from "./main-auth-style.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import { getAuthState } from "../redux/selectors/auth-selector";
import { sendResetPasswordEmail } from "../redux/action-creators/auth-creators";

export const ForgotPasswordPage: FC = () => {
  const location = useLocation();
  const { resetPasswordStarted } = useSelector(getAuthState);
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    email: "",
  });

  const onSubmit = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(sendResetPasswordEmail(values) as any);
    },
    [dispatch, values]
  );

  if (resetPasswordStarted) {
    return <Navigate to={"/reset-password"} state={{ from: location }} />;
  }

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <p className="text text_type_main-medium">Восстановление пароля</p>

      <div className={`${classes.blockInput} mt-6`}>
        <EmailInput
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Укажите e-mail"
        />
      </div>

      <div className="mt-6 mb-20">
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
        </Button>
      </div>

      <div className={classes.blockLinks}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to="/login" className={`${classes.link} text_color_accent`}>
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
};
