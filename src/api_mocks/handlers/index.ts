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
  mockGetWatch,
} from '@/services'

export const handlers = [
  mockGetNowPlaying,
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
