import { PersonCast, PersonCrew } from '@/@types'

export const getListCredits = (list: (PersonCast | PersonCrew)[]) => {
  if (!list?.length) return

  const setDateAndYear = list.map((item) => {
    const date = item.release_date ?? item.first_air_date ?? '-'
    const year = new Date(date).getFullYear()

    return { date, year, info: item }
  })

  const listCreditsForDate = setDateAndYear.sort(function (a, b) {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
  })

  const listCreditsForDepartments = listCreditsForDate.reduce((acc, item) => {
    const depart = item.info.department

    if (!depart) return { ...acc, Acting: [...(acc['Acting'] ?? []), item] }

    if (depart && acc[depart]) return { ...acc, [depart]: [...acc[depart], item] }
    return { ...acc, [depart]: [item] }
  }, {} as Record<string, { year: number; date: string; info: PersonCast | PersonCrew }[]>)

  const listCreditsForDepartmentsArr = Object.entries(listCreditsForDepartments)

  const listCreditsOrdered = listCreditsForDepartmentsArr.map((itemA) => {
    const yearsAndInfos = itemA[1].reduce((acc, itemB) => {
      const year = itemB.year

      if (!year && !acc['Produção']) return { ...acc, ['Produção']: [itemB] }
      if (!year && acc['Produção']) return { ...acc, ['Produção']: [...acc['Produção'], itemB] }

      if (acc[year]) return { ...acc, [year]: [...acc[year], itemB] }
      return { ...acc, [year]: [itemB] }
    }, {} as Record<string, { year: number; date: string; info: PersonCast | PersonCrew }[]>)

    return [itemA[0], yearsAndInfos]
  })

  return listCreditsOrdered
}
