import { getCookie } from "../../helpers/cookie-helper";

export function getRequest<T>(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function postRequest<TRequest, TResponse>(url: string, body: TRequest) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function getRequestWithAuth<T>(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token") ?? "",
    },
  });
}

export function patchRequestWithAuth<TRequest, TResponse>(
  url: string,
  body: TRequest
) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token") ?? "",
    },
    body: JSON.stringify(body),
  });
}
