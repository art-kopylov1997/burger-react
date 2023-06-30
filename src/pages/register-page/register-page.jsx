import React, { useState } from "react";
import classes from "./register-page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import {registrationUser} from "../../redux/action-creators/registry-creators";

function RegisterPage() {
  const [userObject, setUserObject] = useState({
      "email": "",
      "password": "",
      "name": ""
  });
  const dispatch = useDispatch();

  const handleRegistry = () => {
      dispatch(registrationUser(userObject))
  }

  return (
    <div className={classes.root}>
      <h2 className="text text_type_main-medium">Регистрация</h2>

      <Input
        type="text"
        placeholder="Имя"
        onChange={(e) => setUserObject(prevState => ({ ...prevState, name: e.target.value }))}
        value={userObject.name}
        extraClass="mt-6"
      />
      <Input
        type="email"
        placeholder="E-mail"
        // onChange={(e) => setValue2(e.target.value)}
        onChange={(e) => setUserObject(prevState => ({ ...prevState, email: e.target.value }))}
        value={userObject.email}
        extraClass="mt-6"
      />
      <Input
        type="password"
        placeholder="Пароль"
        // onChange={(e) => setValue3(e.target.value)}
        onChange={(e) => setUserObject(prevState => ({ ...prevState, password: e.target.value }))}
        icon="ShowIcon"
        value={userObject.password}
        extraClass="mt-6 mb-6"
      />

      <Button htmlType="button" onClick={handleRegistry}>Зарегистрироваться</Button>

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
