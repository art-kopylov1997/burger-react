import React, { FC, SyntheticEvent, useCallback } from "react";
import classes from "./main-auth-style.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "../hooks/typedHooksRedux";
import { loginUser } from "../redux/actions/auth";
import { useForm } from "../hooks/useForm";

export const LoginPage: FC = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(loginUser(values.email, values.password) as any);
    },
    [dispatch, values]
  );

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <p className="text text_type_main-medium">Вход</p>

      <div className={`${classes.blockInputs} mt-6`}>
        <EmailInput name="email" value={values.email} onChange={handleChange} />
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6 mb-20">
        <Button htmlType="submit" type="primary" size="large">
          Войти
        </Button>
      </div>

      <div className={classes.blockLinks}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{" "}
          <Link to="/register" className={`${classes.link} text_color_accent`}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link
            to="/forgot-password"
            className={`${classes.link} text_color_accent`}
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </form>
  );
};
