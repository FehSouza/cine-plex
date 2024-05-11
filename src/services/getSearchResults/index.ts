export const getSearchResults = async (query: string) => {
  const response = await fetch(`/api/search?q=${query}`)
  const result = await response.json()
  return result
}
