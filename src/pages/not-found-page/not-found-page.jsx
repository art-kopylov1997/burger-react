import React from "react";
import { Link } from "react-router-dom";
import classes from "./not-found-page.module.css";

function NotFoundPage() {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1>Упс! Кажется что-то пошло не так...</h1>
        <p>Запрашиваемая вами страница не существует</p>
        <br />
        <br />
        <p>
          Вернуться обратно на <Link to="/">главную страницу</Link>
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
