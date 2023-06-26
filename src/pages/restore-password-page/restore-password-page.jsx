import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./restore-password-page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import createNewEmailRequest from "../../services/api/createNewEmailRequest";

function RestorePasswordPage() {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const sendEmail = async () => {
    const payload = { email: value };
    const data = await createNewEmailRequest(payload);

    try {
      if (data.success) {
        navigate("/reset-password", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      <Input
        type="email"
        placeholder="Укажите e-mail"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        extraClass="mt-6 mb-6"
      />

      <Button htmlType="button" onClick={sendEmail}>
        Восстановить
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
