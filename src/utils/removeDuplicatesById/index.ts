export const removeDuplicatesById = <T extends { id: number }>(arr: T[]): T[] | undefined => {
  if (!arr?.length) return

  const deduplicated = new Map()
  arr.forEach((item) => deduplicated.set(item.id, item))
  return [...deduplicated.values()]
}
