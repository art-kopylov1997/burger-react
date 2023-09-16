import React, { FC, SyntheticEvent, useMemo } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./profile-forms.module.css";

import { getAuthUserState } from "../../../redux/selectors/auth-selector";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../hooks/useTypedSelector";
import { editUserAuth } from "../../../redux/actions/auth";
import { useForm } from "../../../hooks/useForm";

export const ProfileForms: FC = () => {
  const user = useAppSelector(getAuthUserState);
  const dispatch = useAppDispatch();

  const initValues = {
    name: user.name,
    email: user.email,
    password: "",
  };
  const { values, handleChange, setValues } = useForm(initValues);

  const wasEdited = useMemo(
    () =>
      values.name !== user.name ||
      values.email !== user.email ||
      !!values.password,
    [user, values]
  );

  const handleCancelChange = () => {
    setValues(initValues);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(editUserAuth(values) as any);
  };

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <div className={classes.blockInputs}>
        <Input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
          icon="EditIcon"
        />
        <Input
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Логин"
          icon="EditIcon"
        />
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Пароль"
          icon="EditIcon"
        />

        {wasEdited && (
          <div>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={handleCancelChange}
            >
              Отмена
            </Button>

            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};
