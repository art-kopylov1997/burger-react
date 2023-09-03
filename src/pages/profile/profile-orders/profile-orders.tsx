import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Orders from "../../../components/orders";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { WSS_FOR_PROFILE_ORDERS } from "../../../utils/constans";
import { OrderDetailsPage } from "../../order-details-page";
import { ProtectedRoute } from "../../../components/protected-route";
import { Loader } from "../../../components/UI/loader/loader";

const ProfileOrders: FC = () => {
  const { connect, closeWs } = useWebSocket();
  const feedOrders = useAppSelector(
    (store) => store.wsReducers.wsMessage?.orders
  );
  const accessToken = useAppSelector((store) => store.profile.accessToken);

  useEffect(() => {
    connect(
      `${WSS_FOR_PROFILE_ORDERS}?token=${accessToken?.replace("Bearer ", "")}`
    );

    return () => {
      closeWs();
    };
  }, [accessToken]);

  return (
    <Routes>
      <Route path="/profile/orders">
        {feedOrders ? (
          <Orders feedOrders={[...feedOrders].reverse()} />
        ) : (
          <Loader size="small" />
        )}
      </Route>

      <Route
        path="/profile/orders/:orderId"
        element={<ProtectedRoute element={<OrderDetailsPage />} />}
      />
    </Routes>
  );
};

export default ProfileOrders;
