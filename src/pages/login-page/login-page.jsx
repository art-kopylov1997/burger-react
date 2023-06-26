import React from "react";
import classes from "./login-page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function LoginPage() {
  const [value, setValue] = React.useState("");

  return (
    <div className={classes.root}>
      <h2 className="text text_type_main-medium">Вход</h2>

      <Input
        type="email"
        placeholder="E-mail"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        extraClass="mt-6"
      />
      <Input
        type="password"
        placeholder="Пароль"
        onChange={(e) => setValue(e.target.value)}
        icon="ShowIcon"
        value={value}
        extraClass="mt-6 mb-6"
      />

      <Button htmlType="button">Войти</Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?
        <Link to="/register" className={classes.link}>
          {" "}
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Link to="/forgot-password" className={classes.link}>
          {" "}
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
