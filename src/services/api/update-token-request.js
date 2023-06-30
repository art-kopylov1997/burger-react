const URL = "https://norma.nomoreparties.space/api/auth/token";

const updateTokenRequest = async (payload) => {
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

export default updateTokenRequest;
