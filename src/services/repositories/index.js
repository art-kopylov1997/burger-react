import { getCookie } from "../../helpers/cookie-helper";

export function getRequest(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function postRequest(url, body) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function getRequestWithAuth(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token") ?? "",
    },
  });
}

export function patchRequestWithAuth(url, body) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token") ?? "",
    },
    body: JSON.stringify(body),
  });
}
