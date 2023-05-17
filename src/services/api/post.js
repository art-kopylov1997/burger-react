const URL = "https://norma.nomoreparties.space/api/orders";

const post = (payload) => {
  // const res = fetch(URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // })
  //   .then((response) => {
  //     console.log("response", response);
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     return response.json();
  //   })
  //   .then((json) => {
  //     console.log("Тут хочу получить json, но ничего не приходит", json);
  //   });
  //
  // return res;

  fetch("https://norma.nomoreparties.space/api/orders", {
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
      console.log("Ничего не приходит", json);
    });
};

export default post;
