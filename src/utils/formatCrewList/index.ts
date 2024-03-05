import { listProps } from '../formatCastList'
import { removeDuplicatesById } from '../removeDuplicatesById'

export const crewList = ({ credits }: listProps) => {
  if (!credits) return

  const crewList = removeDuplicatesById(credits.crew)
  if (!crewList) return

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
