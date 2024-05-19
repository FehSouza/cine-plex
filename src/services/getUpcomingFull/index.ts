import { sortByReleaseDateAsc } from '@/utils'
import { getUpcoming } from '../getUpcoming'

export async function getUpcomingFull() {
  const response = await getUpcoming()
  const sortedList = sortByReleaseDateAsc(response.results)
  return { ...response, results: sortedList }
}
