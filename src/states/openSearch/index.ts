import { createReStateMethods } from '@raulpesilva/re-state'

const searchKey = 'openSearch'
const initialValue = false

export const handleOpenSearch = () => dispatchOpenSearch(true)

export const { useOpenSearch, dispatchOpenSearch, getOpenSearch, resetOpenSearch } = createReStateMethods(searchKey, initialValue)
