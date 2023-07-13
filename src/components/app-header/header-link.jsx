import classes from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const HeaderLink = ({ locationTo, iconType, children }) => {
  const location = useLocation();

  return (
    <NavLink
      to={locationTo}
      className={({ isActive }) =>
        isActive ? classes.activeLink : classes.link
      }
    >
      <div className={`${classes.wrapperNav} p-4`}>
        {(iconType === "burger" && (
          <BurgerIcon
            type={location.pathname === locationTo ? "primary" : "secondary"}
          />
        )) ||
          (iconType === "list" && (
            <ListIcon
              type={location.pathname === locationTo ? "primary" : "secondary"}
            />
          )) ||
          (iconType === "profile" && (
            <ProfileIcon
              type={location.pathname === locationTo ? "primary" : "secondary"}
            />
          ))}

        <span>{children}</span>
      </div>
    </NavLink>
  );
};

export default HeaderLink;
