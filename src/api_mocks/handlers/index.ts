import {
  mockGetClassifications,
  mockGetCreditsMovie,
  mockGetDiscoverMovie,
  mockGetMovie,
  mockGetNowPlaying,
  mockGetPerson,
  mockGetPersonCredits,
  mockGetPopular,
  mockGetRecommendations,
  mockGetSearch,
  mockGetSearchPerson,
  mockGetSearchResults,
  mockGetSocialMedia,
  mockGetUpcoming,
  mockGetVideos,
  mockGetWatch,
} from '@/services'

export const handlers = [
  mockGetNowPlaying,
  mockGetUpcoming,
  mockGetPopular,

  mockGetDiscoverMovie,
  mockGetClassifications,
  mockGetCreditsMovie,
  mockGetPersonCredits,
  mockGetRecommendations,
  mockGetSocialMedia,
  mockGetVideos,
  mockGetWatch,
  mockGetSearch,
  mockGetSearchPerson,
  mockGetSearchResults,

  mockGetMovie,
  mockGetPerson,
]
