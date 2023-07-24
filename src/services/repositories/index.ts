import { getCookie } from "../../helpers/cookie-helper";
import { checkResponse } from "../helpers/check-request";

export function getRequest<T>(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse<T>);
}

export function postRequest<TRequest, TResponse>(url: string, body: TRequest) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(checkResponse<TResponse>);
}

export function getRequestWithAuth<T>(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token") ?? "",
    },
  }).then(checkResponse<T>);
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
  }).then(checkResponse<TResponse>);
}
