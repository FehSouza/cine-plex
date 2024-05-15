import { filterClassificationsByRegion } from '@/utils'
import { getClassifications } from '../getClassifications'

export async function getClassificationsByRegion(id: string) {
  const { results } = await getClassifications(id)
  const classificationsList = filterClassificationsByRegion(results)
  return classificationsList
}
