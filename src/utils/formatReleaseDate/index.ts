export const formatReleaseDate = (date: string) => {
  if (!date) return
  if (!/\d{4}-\d{1,2}-\d{1,2}/.test(date)) return

  const [year] = date.split('-')
  return `${year}`
}
