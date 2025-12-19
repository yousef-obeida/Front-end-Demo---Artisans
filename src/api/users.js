const BASE_URL = "https://jsonplaceholder.typicode.com"

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`)
  return response.json()
}
