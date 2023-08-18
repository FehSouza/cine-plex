import { createReStateMethods } from '@raulpesilva/re-state'

const openVideoModalKey = 'openVideoModal'
const initialValue = false

export const { useOpenVideoModal, dispatchOpenVideoModal } = createReStateMethods(openVideoModalKey, initialValue)
