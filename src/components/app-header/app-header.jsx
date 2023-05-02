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
      <div style={{ display: "flex" }} className="pl-20">
        <div className={`${classes.wrapperNav} p-4`}>
          <BurgerIcon type="primary" />
          <span>Конструктор</span>
        </div>
        <div className={`${classes.wrapperNav} p-4`}>
          <ListIcon type="primary" />
          <span>Лента заказов</span>
        </div>
      </div>

      <Logo />

      <div className={`${classes.wrapperNav} pr-25`}>
        <ProfileIcon type="secondary" />
        <span>Личный кабинет</span>
      </div>
    </header>
  );
};

export default AppHeader;
