async function fetchLocal(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {


  return await fetch(`/api${endpoint}`, {
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

export async function getLocal(endpoint: string) {
  return fetchLocal(endpoint, {
    method: 'GET',
  })
}

export async function postLocal<U>(
  endpoint: string,
  data: U,
) {
  return fetchLocal(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

