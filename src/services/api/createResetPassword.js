const URL = "https://norma.nomoreparties.space/api/password-reset/reset";

const createResetPasswordRequest = async (payload) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default createResetPasswordRequest;
