import { FC } from "react";
import { NavLink } from "react-router-dom";

import { useAppDispatch } from "../../../hooks/useTypedSelector";
import { logoutUser } from "../../../redux/actions/auth";

import classes from "./profile-navigation.module.css";

const ProfileNavigation: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser() as any);
  };

  return (
    <div className={classes.navContainer}>
      <nav className={`text text_type_main-medium ${classes.navigation}`}>
        <NavLink
          to="/profile"
          className={`link text_color_inactive ${classes.link}`}
        >
          Профиль
        </NavLink>

        <NavLink
          to="/profile/orders"
          className={`link text_color_inactive ${classes.link}`}
        >
          История заказов
        </NavLink>
      </nav>
      <span
        className={`button text_type_main-medium text_color_inactive ${classes.link}`}
        onClick={handleLogout}
      >
        Выход
      </span>
      <p
        className={`mt-20 text text_type_main-default text_color_inactive ${classes.description}`}
      >
        В этом разделе вы можете изменить&#160;свои персональные данные
      </p>
    </div>
  );
};

export default ProfileNavigation;
