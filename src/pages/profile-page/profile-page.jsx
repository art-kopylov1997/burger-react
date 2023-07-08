import React, { useState } from "react";
import classes from "./profile-page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserState } from "../../redux/selectors/auth-selector";
import { useSelector, useDispatch } from "react-redux";
import {
  editUser,
  logoutUser,
} from "../../redux/action-creators/registry-creators";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

function ProfilePage() {
  const user = useSelector(getUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initValues = {
    name: user.name,
    email: user.email,
    password: "",
  };

  const { values, handleChange, setValues } = useForm(initValues);

  const wasEdited = React.useMemo(
    () =>
      values.name !== user.name ||
      values.email !== user.email ||
      !!values.password,
    [user, values]
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  const handleCancelChange = () => {
    setValues(initValues);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(editUser(values));
  };

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <div className={classes.wrapper}>
        <p
          className={`${classes.menuElement} text text_type_main-medium text_color_primary`}
        >
          Профиль
        </p>
        <p
          className={`${classes.menuElement} text text_type_main-medium text_color_inactive`}
        >
          История заказов
        </p>
        <p
          className={`${classes.menuElement} text text_type_main-medium text_color_inactive`}
          onClick={handleLogout}
        >
          Выход
        </p>
        <p
          className={`${classes.menuElement} mt-20 text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div>
        <Input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
          icon="EditIcon"
        />
        <Input
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Логин"
          icon="EditIcon"
        />
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Пароль"
          icon="EditIcon"
        />

        {wasEdited && (
          <div>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={handleCancelChange}
            >
              Отмена
            </Button>

            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </form>
    // <div className={classes.root}>
    //   <div className={classes.wrapper}>
    //     <div className={classes.blockMenu}>
    //       <p className={`${classes.menuElement} text text_type_main-medium`}>
    //         Профиль
    //       </p>
    //       <p className={`${classes.menuElement} text text_type_main-medium`}>
    //         История заказов
    //       </p>
    //       <p
    //         className={`${classes.menuElement} text text_type_main-medium`}
    //         onClick={handleLogout}
    //       >
    //         Выход
    //       </p>
    //       <p className="text text_type_main-default text_color_inactive mt-10">
    //         В этом разделе вы можете изменить свои персональные данные
    //       </p>
    //     </div>
    //
    //     <div>
    //       <Input
    //         type="text"
    //         placeholder="Имя"
    //         onChange={(e) =>
    //           setUserInfo((prevState) => ({
    //             ...prevState,
    //             name: e.target.value,
    //           }))
    //         }
    //         value={userInfo.name}
    //         icon="EditIcon"
    //         extraClass="mb-6"
    //       />
    //       <Input
    //         type="email"
    //         placeholder="Логин"
    //         onChange={(e) =>
    //           setUserInfo((prevState) => ({
    //             ...prevState,
    //             email: e.target.value,
    //           }))
    //         }
    //         value={userInfo.email}
    //         icon="EditIcon"
    //         extraClass="mb-6"
    //       />
    //       <Input
    //         type="password"
    //         placeholder="Пароль"
    //         onChange={(e) =>
    //           setUserInfo((prevState) => ({
    //             ...prevState,
    //             password: e.target.value,
    //           }))
    //         }
    //         value={userInfo.password}
    //         icon="EditIcon"
    //         extraClass="mb-6"
    //       />
    //     </div>
    //   </div>
    //
    //   {wasEdited && (
    //     <div>
    //       <Button
    //         htmlType="button"
    //         type="secondary"
    //         size="medium"
    //         onClick={handleCancelChange}
    //       >
    //         Отмена
    //       </Button>
    //
    //       <Button
    //         htmlType="submit"
    //         type="primary"
    //         size="medium"
    //         onClick={() => handleEditUser(userInfo)}
    //       >
    //         Сохранить
    //       </Button>
    //     </div>
    //   )}
    // </div>
  );
}

export default ProfilePage;
