export function httpRequest(url: string, method: "GET" | "POST" | "PUT" | "DELETE", body: Record<any, any>) {
  const params: RequestInit = {
    method
  }
  if (body) params.body = JSON.stringify(body)
  return new Promise((resolve, reject) => {
    return fetch(url, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.error) return reject(json.response)
        return resolve(json.response)
      })
      .catch((error) => reject(error))
  })
}