export const formatDate = (date: string) => {
  if (!date) return
  if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(date)) return date
  if (!/\d{4}-\d{1,2}-\d{1,2}/.test(date)) return

  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}
