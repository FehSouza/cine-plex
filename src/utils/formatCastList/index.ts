import { Cast, Crew, MovieCredits, PersonCast, PersonCrew } from '@/@types'

export interface listProps {
  credits: MovieCredits
  set: Set<unknown>
}

export const removeDuplicates = ({ item, set }: { item: Cast | Crew | PersonCast | PersonCrew; set: Set<unknown> }) => {
  const duplicated = set.has(item.id)
  set.add(item.id)
  return !duplicated
}

export const castList = ({ credits, set }: listProps) => credits.cast.filter((cast) => removeDuplicates({ item: cast, set }))
