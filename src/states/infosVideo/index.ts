import { createReStateMethods } from '@raulpesilva/re-state'

const infosVideoKey = 'infosVideo'
const initialValue = { title: '', key: '' }

export const { useInfosVideo, dispatchInfosVideo } = createReStateMethods(infosVideoKey, initialValue)
