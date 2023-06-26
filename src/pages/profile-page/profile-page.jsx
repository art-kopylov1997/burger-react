import React, { useState } from "react";
import classes from "./profile-page.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

function ProfilePage() {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.blockMenu}>
          <p className="text text_type_main-medium">Профиль</p>
          <p className="text text_type_main-medium">История заказов</p>
          <p className="text text_type_main-medium">Выход</p>
          <p className="text text_type_main-default text_color_inactive mt-10">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>

        <div>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setNameValue(e.target.value)}
            value={nameValue}
            icon="EditIcon"
            extraClass="mb-6"
          />
          <Input
            type="email"
            placeholder="Логин"
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
            icon="EditIcon"
            extraClass="mb-6"
          />
          <Input
            type="password"
            placeholder="Пароль"
            onChange={(e) => setPasswordValue(e.target.value)}
            value={passwordValue}
            icon="EditIcon"
            extraClass="mb-6"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
