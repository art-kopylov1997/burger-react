import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

import classes from "./app-header.module.css";

const AppHeader: FC = () => {
  const location = useLocation();

  return (
    <header className={`${classes.header} text text_type_main-default m-10`}>
      <div className={`${classes.root} pl-20`}>
        <NavLink
          to="/"
          className={cn(classes.link, {
            [classes.activeLink]: location.pathname === "/",
          })}
        >
          <div className={`${classes.wrapperNav} p-4`}>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </div>
        </NavLink>

        <NavLink
          to="/feed"
          className={cn(classes.link, {
            [classes.activeLink]: location.pathname === "/feed",
          })}
        >
          <div className={`${classes.wrapperNav} p-4`}>
            <ListIcon type="primary" />
            <span>Лента заказов</span>
          </div>
        </NavLink>
      </div>

      <NavLink to="/">
        <Logo />
      </NavLink>

      <NavLink
        to="/profile"
        className={cn(classes.link, {
          [classes.activeLink]: location.pathname === "/profile",
        })}
      >
        <div className={`${classes.wrapperNav} pr-25`}>
          <ProfileIcon type="primary" />
          <span>Личный кабинет</span>
        </div>
      </NavLink>
    </header>
  );
};

export default AppHeader;
