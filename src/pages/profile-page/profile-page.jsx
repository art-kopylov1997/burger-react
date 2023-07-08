import React, { useState } from "react";
import classes from "./profile-page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserState } from "../../redux/selectors/auth-selector";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/action-creators/registry-creators";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const user = useSelector(getUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const wasEdited = React.useMemo(
    () =>
      userInfo.name !== user.name ||
      userInfo.email !== user.email ||
      !!userInfo.password,
    [user, userInfo]
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.blockMenu}>
          <p className={`${classes.menuElement} text text_type_main-medium`}>
            Профиль
          </p>
          <p className={`${classes.menuElement} text text_type_main-medium`}>
            История заказов
          </p>
          <p
            className={`${classes.menuElement} text text_type_main-medium`}
            onClick={handleLogout}
          >
            Выход
          </p>
          <p className="text text_type_main-default text_color_inactive mt-10">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>

        <div>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            value={userInfo.name}
            icon="EditIcon"
            extraClass="mb-6"
          />
          <Input
            type="email"
            placeholder="Логин"
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            value={userInfo.email}
            icon="EditIcon"
            extraClass="mb-6"
          />
          <Input
            type="password"
            placeholder="Пароль"
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
            value={userInfo.password}
            icon="EditIcon"
            extraClass="mb-6"
          />
        </div>
      </div>

      {wasEdited && (
        <div>
          <Button htmlType="button" type="secondary" size="medium">
            Отмена
          </Button>

          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
