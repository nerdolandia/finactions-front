const API_URL = process.env.API_URL ?? 'http://localhost:5000/api'

async function fetchData(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<Response> {

  const timeoutEmMS = 3000

  const response=  await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    },
    signal: AbortSignal.timeout(timeoutEmMS)

  })
  return response;

  // if (!response.ok) {
  //   
  //   console.log(response)
  //   const errorData = await response.json()
  //   throw new Error(
  //     `HTTP error! status: ${response.status}`, {cause: response.status}
  //   )
  // }

  // return response
}

export async function getData(endpoint: string, token?: string) {
  return fetchData(endpoint, {
    method: 'GET',
  }, token)
}

export async function postData<U>(
  endpoint: string,
  data: U,
  token?: string
) {
  return fetchData(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }, token)
}

export default fetchData
