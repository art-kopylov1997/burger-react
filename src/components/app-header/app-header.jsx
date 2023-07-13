import { NavLink } from "react-router-dom";
import classes from "./app-header.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderLink from "./header-link";

const AppHeader = () => {
  return (
    <header className={`${classes.header} text text_type_main-default m-10`}>
      <div className={`${classes.root} pl-20`}>
        <HeaderLink locationTo="/" iconType="burger">
          Конструктор
        </HeaderLink>

        <HeaderLink locationTo="/orderings" iconType="list">
          Лента заказов
        </HeaderLink>
      </div>

      <NavLink to="/">
        <Logo />
      </NavLink>

      <HeaderLink locationTo="/profile" iconType="profile">
        Личный кабинет
      </HeaderLink>
    </header>
  );
};

export default AppHeader;
