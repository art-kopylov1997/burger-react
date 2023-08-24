export type TServerResponse<T> = {
  success: boolean;
} & T;

export function checkSuccess<T>(
  response: TServerResponse<T>
): Promise<TServerResponse<T>> {
  if (response && response.success) {
    return Promise.resolve(response);
  }

  return Promise.reject(`Ответ не success: ${response}`);
}

export function checkResponse<T>(response: Response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка ${response.status}`);
}
