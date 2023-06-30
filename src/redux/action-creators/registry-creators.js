import registryRequest from "../../services/api/register-request";

export const REGISTRATION_USER = "REGISTRATION_USER";
// export const CHANGE_EMAIL = "CHANGE_EMAIL";

// export const registrationUser = (payload) => ({
//     type: REGISTRATION_USER,
//     payload,
// });

export function registrationUser(payload) {
  return function (dispatch) {
    // dispatch({
    //   type: REGISTRATION_USER,
    // });
    registryRequest(payload).then((res) => {
        console.log('res: ', res)

        // dispatch({
        //   type: REGISTRATION_USER,
        //     payload: res
        // });
    });
  };
}

// export const changeEmail = (payload) => ({
//     type: CHANGE_EMAIL,
//     payload,
// });

// export const clearCurrentIngredient = () => ({
//     type: CLEAR_CURRENT_INGREDIENT,
// });
