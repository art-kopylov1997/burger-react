function checkResponse(response) {
  if (response.ok) return response.json();

  return response.json().then((error) => Promise.reject(error));
}

export default checkResponse;
