export const formatReleaseDate = (date: string) => {
  const [year] = date.split('-')

  return `${year}`
}
