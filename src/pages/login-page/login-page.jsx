import React, { useState } from "react";
import classes from "./login-page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/action-creators/registry-creators";
import loginRequest from "../../services/api/login-request";

function LoginPage() {
  const [userObject, setUserObject] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await loginRequest(userObject);

    try {
      if (data.success) {
        dispatch(loginUser(userObject));
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <h2 className="text text_type_main-medium">Вход</h2>

      <Input
        type="email"
        placeholder="E-mail"
        onChange={(e) =>
          setUserObject((prevState) => ({
            ...prevState,
            email: e.target.value,
          }))
        }
        value={userObject.email}
        extraClass="mt-6"
      />
      <Input
        type="password"
        placeholder="Пароль"
        onChange={(e) =>
          setUserObject((prevState) => ({
            ...prevState,
            password: e.target.value,
          }))
        }
        icon="ShowIcon"
        value={userObject.password}
        extraClass="mt-6 mb-6"
      />

      <Button htmlType="button" onClick={handleLogin}>
        Войти
      </Button>

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
