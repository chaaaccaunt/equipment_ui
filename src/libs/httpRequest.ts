const errorResults: Record<number, string> = {
  400: "Неверный формат данных в запросе",
  404: "Убедитесь, что URL введен правильно"
}

export function httpRequest<T extends any = unknown>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", body?: Record<any, any>): Promise<T> {
  const params: RequestInit = {
    method,
    credentials: "include"
  }
  if (body) params.body = JSON.stringify(body)
  return new Promise<T>((resolve, reject) => {
    return fetch(`http://api.equipment.local${url}`, params)
      .then((response) => response.status !== 200 ? reject(`Ошибка при выполнении запроса. ${errorResults[response.status]}`) : response.json())
      .then((json) => {
        if (typeof json === "undefined" || json?.error) return reject(json);
        return resolve(json.response)
      })
      .catch((error) => reject(error))
  })
}