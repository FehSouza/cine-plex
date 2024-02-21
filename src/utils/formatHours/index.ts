export const formatHours = (duration: number) => {
  if (duration === undefined || duration === null) throw new Error(`formatHours: a duração não pode ser ${duration}`)

  const hours = Math.trunc(duration / 60)
  if (Number.isNaN(hours)) throw new Error('formatHours: a duração deve ser um número')

  const minutes = Math.ceil(duration % 60)
  return hours ? `${hours}h ${String(minutes).padStart(2, '0')}min` : `${String(minutes).padStart(2, '0')}min`
}
