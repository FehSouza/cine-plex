export const removeDuplicatesById = <T extends { id: number }>(arr: T[]): T[] | undefined => {
  if (!arr?.length) return

  const deduplicated = new Map()

  arr.forEach((item) => {
    if (!item.id) return
    deduplicated.set(item.id, item)
  })

  const listDeduplicated = [...deduplicated.values()]

  if (!listDeduplicated.length) return
  return listDeduplicated
}
