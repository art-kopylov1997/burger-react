export function checkSuccess(response) {
  if (response && response.success) {
    return Promise.resolve(response);
  }

  return Promise.reject(`Ответ не success: ${response}`);
}

export function checkResponse(response) {
  if (response.ok) return response.json();

  return response.json().then((error) => Promise.reject(error));
}
