import { FC } from "react";
import { Outlet } from "react-router-dom";

import { ProfileNavigation } from "./profile-navigation/profile-navigation";

import classes from "./profile.module.css";

const Profile: FC = () => (
  <section className={classes.profile}>
    <ProfileNavigation />
    <Outlet />
  </section>
);

export default Profile;
