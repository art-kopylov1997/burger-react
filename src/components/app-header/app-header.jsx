import classes from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={classes.header}>
      <div className={`${classes.navsBlock} m-5 p-5`}>
        <div
          className={`${classes.wrapperNav} text text_type_main-default p-4`}
        >
          <BurgerIcon type="primary" />
          <span>Конструктор</span>
        </div>
        <div
          className={`${classes.wrapperNav} text text_type_main-default p-4`}
        >
          <ListIcon type="primary" />
          <span>Лента заказов</span>
        </div>
      </div>

      <Logo />

      <div className="m-5 p-5">
        <div
          className={`${classes.wrapperNav} text text_type_main-default p-4`}
        >
          <ProfileIcon type="secondary" />
          <span>Личный кабинет</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
