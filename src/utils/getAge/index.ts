interface getAgeProps {
  birthday: string | null | undefined
  deathday: string | null | undefined
}

export const getAge = ({ birthday, deathday }: getAgeProps) => {
  if (!birthday) return
  if (!/\d{4}-\d{1,2}-\d{1,2}/.test(birthday)) return
  if (deathday && !/\d{4}-\d{1,2}-\d{1,2}/.test(deathday)) return

  const birthDate = new Date(birthday)
  const today = deathday ? new Date(deathday) : new Date()

  const dayToday = today.getDate()
  const monthToday = today.getMonth() + 1
  const yearToday = today.getFullYear()

  const dayBirthDate = birthDate.getDate()
  const monthBirthDate = birthDate.getMonth() + 1
  const yearBirthDate = birthDate.getFullYear()

  let age = yearToday - yearBirthDate
  let month = monthToday - monthBirthDate
  let day = dayToday - dayBirthDate

  if (age < 0 || (age === 0 && month < 0) || (age === 0 && month === 0 && day < 0)) return
  if (monthToday - monthBirthDate < 0) return (age -= 1)
  if (monthToday - monthBirthDate === 0 && dayToday < dayBirthDate) return (age -= 1)
  return age
}
