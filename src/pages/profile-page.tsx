import React, { FC, SyntheticEvent, useCallback, useMemo } from "react";
import classes from "./profile-page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getAuthUserState } from "../redux/selectors/auth-selector";
import { useSelector, useDispatch } from "react-redux";
import {
  editUserAuth,
  logoutUser,
} from "../redux/action-creators/auth-creators";
import { useForm } from "../hooks/useForm";

export const ProfilePage: FC = () => {
  const user = useSelector(getAuthUserState);
  const dispatch = useDispatch();

  const initValues = {
    name: user.name,
    email: user.email,
    password: "",
  };
  const { values, handleChange, setValues } = useForm(initValues);

  const wasEdited = useMemo(
    () =>
      values.name !== user.name ||
      values.email !== user.email ||
      !!values.password,
    [user, values]
  );

  const handleCancelChange = () => {
    setValues(initValues);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(editUserAuth(values) as any);
  };

  const handleLogout = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(logoutUser() as any);
    },
    [dispatch]
  );

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <div className={classes.wrapperLinks}>
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

      <div className={classes.wrapperInputs}>
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
  );
};
