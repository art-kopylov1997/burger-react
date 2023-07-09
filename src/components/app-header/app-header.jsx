import { NavLink } from "react-router-dom";
import classes from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={`${classes.header} text text_type_main-default m-10`}>
      <div className={`${classes.root} pl-20`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? classes.activeLink : classes.link
          }
        >
          <div className={`${classes.wrapperNav} p-4`}>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </div>
        </NavLink>

        <div className={`${classes.wrapperNav} text_color_inactive p-4`}>
          <ListIcon type="primary" />
          <span>Лента заказов</span>
        </div>
      </div>

      <Logo />

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? classes.activeLink : classes.link
        }
      >
        <div className={`${classes.wrapperNav} pr-25`}>
          <ProfileIcon type="secondary" />
          <span>Личный кабинет</span>
        </div>
      </NavLink>
    </header>
  );
};

export default AppHeader;
