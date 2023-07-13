import React from "react";
import classes from "./profile-page.module.css";
import cn from "classnames";
import { useLocation } from "react-router-dom";

const MenuLink = ({ children, onClick, pathLocation }) => {
  const location = useLocation();

  return (
    <p
      className={cn(
        `${classes.link} text text_type_main-medium text_color_inactive`,
        {
          [classes.linkActive]: pathLocation === location.pathname,
        }
      )}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export default MenuLink;
