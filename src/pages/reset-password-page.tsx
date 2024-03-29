import React, { FC, SyntheticEvent } from "react";
import classes from "./main-auth-style.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { useForm } from "../hooks/useForm";
import { getAuthState } from "../redux/selectors/auth-selector";
import { sendPassword } from "../redux/actions/auth";

export const ResetPasswordPage: FC = () => {
  const location = useLocation();
  const { resetPasswordStarted, resetPasswordFinished } =
    useAppSelector(getAuthState);
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({
    emailCode: "",
    password: "",
  });

  const onSubmit = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(sendPassword(values.password, values.emailCode) as any);
    },
    [dispatch, values]
  );

  if (resetPasswordFinished) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  if (!resetPasswordStarted) {
    return <Navigate to={"/forgot-password"} state={{ from: location }} />;
  }

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <p className="text text_type_main-medium">Восстановление пароля</p>

      <div className={`${classes.blockInputs} mt-6`}>
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Введите новый пароль"
        />
        <Input
          name="emailCode"
          value={values.emailCode}
          onChange={handleChange}
          placeholder="Введите код из письма"
        />
      </div>

      <div className="mt-6 mb-20">
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
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
