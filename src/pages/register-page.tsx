import React, { FC, SyntheticEvent, useCallback } from "react";
import classes from "./main-auth-style.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registrationUser } from "../redux/action-creators/auth-creators";
import { useForm } from "../hooks/useForm";

export const RegisterPage: FC = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(registrationUser(values) as any);
    },
    [dispatch, values]
  );

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <p className="text text_type_main-medium">Регистрация</p>

      <div className={`${classes.blockInputs} mt-6`}>
        <Input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
        />
        <EmailInput name="email" value={values.email} onChange={handleChange} />
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6 mb-20">
        <Button htmlType="submit" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </div>

      <div className={classes.blockLinks}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={`${classes.link} text_color_accent`}>
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
};
