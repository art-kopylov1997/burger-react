import registryRequest from "../../services/api/register-request";

export const REGISTRATION_USER = "REGISTRATION_USER";

export function registrationUser(payload) {
  console.log("creators payload: ", payload);
  return function (dispatch) {
    registryRequest(payload).then((res) => {
      if (res && res.success) {
        dispatch({
          type: REGISTRATION_USER,
          payload: res.user,
        });
        console.log("res TRUE: ", res);
      } else {
        console.log("res FALSE: ", res);
      }
    });
  };
}
