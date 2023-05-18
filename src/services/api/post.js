const URL = "https://norma.nomoreparties.space/api/orders";

const post = (payload) => {
  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log("response", response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((json) => {
      console.log("Тут приходит json", json);
    });
};

export default post;
