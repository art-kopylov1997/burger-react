import registryRequest from "../../services/api/register-request";
import loginRequest from "../../services/api/login-request";
import setCookie from "../../helpers/cookie-helper";
import setTokenExpirationDate from "../../helpers/local-storage-helper";
import updateTokenRequest from "../../services/api/update-token-request";

export const REGISTRATION_USER = "REGISTRATION_USER";
export const LOGIN_USER = "LOGIN_USER";

export function registrationUser(payload) {
  return function (dispatch) {
    registryRequest(payload).then((res) => {
      if (res && res.success) {
        setCookie("token", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        setTokenExpirationDate(15);

        dispatch({
          type: REGISTRATION_USER,
          payload: res.user,
        });
      } else {
        console.error("error: ", res);
      }
    });
  };
}

export function loginUser(payload) {
  return function (dispatch) {
    loginRequest(payload).then(async (res) => {
      if (res && res.success) {
        setCookie("token", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        setTokenExpirationDate(15);

        const tokenPayload = { token: res.refreshToken };
        await updateTokenRequest(tokenPayload);

        dispatch({
          type: LOGIN_USER,
          payload: res.user,
        });
      } else {
        console.error("error: ", res);
      }
    });
  };
}
