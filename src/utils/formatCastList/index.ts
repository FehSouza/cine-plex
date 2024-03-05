import { MovieCredits } from '@/@types'
import { removeDuplicatesById } from '../removeDuplicatesById'

export interface listProps {
  credits: MovieCredits
}

export const castList = ({ credits }: listProps) => removeDuplicatesById(credits?.cast)
