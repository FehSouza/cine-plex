import { MOCK_GET_SOCIAL_MEDIA } from '@/mocks'
import { describe, expect, it } from 'vitest'
import { filterSocialMediaSelected } from '.'

const MOCK_FILTER_SOCIAL_MEDIA_SELECTED_FORMATTED = [
  ['facebook', 'emmawatson'],
  ['instagram', 'EmmaWatson'],
  ['twitter', 'EmmaWatson'],
]

describe('person', () => {
  it('filterSocialMediaSelected', () => {
    const mock = MOCK_GET_SOCIAL_MEDIA
    const SUT = filterSocialMediaSelected(mock)
    const expected = MOCK_FILTER_SOCIAL_MEDIA_SELECTED_FORMATTED
    expect(SUT).toStrictEqual(expected)
  })
})
