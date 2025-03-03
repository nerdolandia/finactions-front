async function fetchLocal(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<Response> {


  return await fetch(`${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
  })

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

export async function getLocal(endpoint: string, token?: string) {
  return fetchLocal(endpoint, {
    method: 'GET',
  }, token)
}

export async function postLocal<U>(
  endpoint: string,
  data: U,
  token?: string
) {
  return fetchLocal(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }, token)
}

