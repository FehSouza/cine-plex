import { listProps, removeDuplicates } from '../formatCastList'

export const crewList = ({ credits, set }: listProps) => {
  const crewList = credits.crew.filter((crew) => removeDuplicates({ item: crew, set }))

  const crewListSorted = crewList.sort(function (a, b) {
    if (a.job < b.job) return -1
    if (a.job > b.job) return 1
    return 0
  })

  let departments = [] as string[]

  crewListSorted.forEach((item) => {
    const depart = item.department
    if (!departments.includes(depart)) departments.push(depart)
  })

  return departments.sort().map((depart) => {
    const filter = crewListSorted.filter((item) => item.department === depart)
    return [depart, filter]
  })
}
