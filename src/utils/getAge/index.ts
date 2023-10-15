interface getAgeProps {
  birthday: string
  deathday: string | null
}

export const getAge = ({ birthday, deathday }: getAgeProps) => {
  const birthDate = new Date(birthday)
  const today = deathday ? new Date(deathday) : new Date()

  const dayToday = today.getDate()
  const monthToday = today.getMonth() + 1
  const yearToday = today.getFullYear()

  const dayBirthDate = birthDate.getDate()
  const monthBirthDate = birthDate.getMonth() + 1
  const yearBirthDate = birthDate.getFullYear()

  let age = yearToday - yearBirthDate

  if (monthToday - monthBirthDate < 0) return (age -= 1)
  if (monthToday - monthBirthDate === 0 && dayToday < dayBirthDate) return (age -= 1)
  return age
}
