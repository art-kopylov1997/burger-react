import React, { FC, SyntheticEvent, useCallback } from "react";
import { NavLink } from "react-router-dom";

import classes from "./profile-navigation.module.css";

import { useAppDispatch } from "../../../hooks/useTypedSelector";
import { logoutUser } from "../../../redux/actions/auth";

export const ProfileNavigation: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(logoutUser() as any);
    },
    [dispatch]
  );

  return (
    <div className={classes.root}>
      <NavLink to="/profile" className={classes.link}>
        <p
          className={`${classes.menuElement} text text_type_main-medium text_color_primary`}
        >
          Профиль
        </p>
      </NavLink>
      <NavLink to="/profile/orders" className={classes.link}>
        <p
          className={`${classes.menuElement} text text_type_main-medium text_color_inactive`}
        >
          История заказов
        </p>
      </NavLink>
      <span
        className={`${classes.menuElement} text text_type_main-medium text_color_inactive`}
        onClick={handleLogout}
      >
        Выход
      </span>
      <p
        className={`${classes.menuElement} mt-20 text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};
