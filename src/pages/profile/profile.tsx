import { FC } from "react";

import { Route, Routes, useResolvedPath } from "react-router-dom";
import ProfileContainer from "./profile-container/profile-container";
import ProfileNavigation from "./profile-navigation/profile-navigation";
import ProfileOrders from "./profile-orders/profile-orders";

import classes from "./profile.module.css";

const Profile: FC = () => {
  const path = useResolvedPath("").pathname;

  return (
    <section className={classes.profile}>
      <Route path="/profile">
        <ProfileNavigation />
      </Route>

      <Routes>
        <Route path={`${path}`}>
          <ProfileContainer />
        </Route>
        <Route path={`${path}/orders`}>
          <ProfileOrders />
        </Route>
      </Routes>
    </section>
  );
};

export default Profile;
