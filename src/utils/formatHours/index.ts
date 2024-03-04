export const formatHours = (duration: number) => {
  if (duration === undefined || duration === null || (typeof duration === 'string' && duration === '')) return
  const durationValue = Number(duration)
  if (durationValue < 0 || Number.isNaN(durationValue)) return

  const hours = Math.trunc(durationValue / 60)
  const minutes = Math.ceil(durationValue % 60)
  return hours ? `${hours}h ${String(minutes).padStart(2, '0')}min` : `${String(minutes).padStart(2, '0')}min`
}
