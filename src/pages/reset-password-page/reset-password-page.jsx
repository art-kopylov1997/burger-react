import React, { useState } from "react";
import classes from "./reset-password-page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import createResetPasswordRequest from "../../services/api/createResetPassword";

function RestorePasswordPage() {
  const [passwordValue, setPasswordValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const resetPassword = async () => {
    const payload = {
      password: passwordValue,
      token: "",
    };

    const data = await createResetPasswordRequest(payload);
    try {
      console.log("data: ", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      <Input
        type="password"
        placeholder="Введите новый пароль"
        onChange={(e) => setPasswordValue(e.target.value)}
        value={passwordValue}
        icon="ShowIcon"
        extraClass="mt-6"
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        onChange={(e) => setTextValue(e.target.value)}
        value={textValue}
        extraClass="mt-6 mb-6"
      />

      <Button htmlType="button" onClick={resetPassword}>
        Сохранить
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Link to="/login" className={classes.link}>
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RestorePasswordPage;
