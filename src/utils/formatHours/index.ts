export const formatHours = (duration: number) => {
  const hours = Math.trunc(duration / 60)
  const minutes = duration % 60
  return hours ? `${hours}h ${String(minutes).padStart(2, '0')}min` : `${minutes}min`
}
