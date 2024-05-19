import {
  mockGetBestMovies,
  mockGetClassifications,
  mockGetCreditsMovie,
  mockGetMovie,
  mockGetNowPlaying,
  mockGetPerson,
  mockGetPersonCredits,
  mockGetPopular,
  mockGetRecommendations,
  mockGetSocialMedia,
  mockGetUpcoming,
  mockGetWatch,
} from '@/services'

export const handlers = [
  mockGetNowPlaying,
  mockGetUpcoming,
  mockGetPopular,

  mockGetBestMovies,
  mockGetClassifications,
  mockGetCreditsMovie,
  mockGetPerson,
  mockGetPersonCredits,
  mockGetRecommendations,
  mockGetSocialMedia,
  mockGetWatch,

  mockGetMovie,
]
