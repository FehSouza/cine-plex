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
  mockGetVideos,
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
  mockGetVideos,
  mockGetWatch,

  mockGetMovie,
]
