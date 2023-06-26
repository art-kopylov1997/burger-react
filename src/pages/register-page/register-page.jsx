import React from "react";
import classes from "./register-page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [value, setValue] = React.useState("");

  return (
    <div className={classes.root}>
      <h2 className="text text_type_main-medium">Регистрация</h2>

      <Input
        type="text"
        placeholder="Имя"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        extraClass="mt-6"
      />
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

      <Button htmlType="button">Зарегистрироваться</Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <Link to="/login" className={classes.link}>
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
