export interface FullMovie {
  dates?: {
    maximum: string
    minimum: string
  }
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface FullPerson {
  page: number
  results: PersonSearch[]
  total_pages: number
  total_results: number
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  media_type?: string
}

export interface MovieDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: BelongsToCollection
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface BelongsToCollection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface MovieCredits {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
  department: string
  job: string
}

export interface Videos {
  id: number
  results: Video[]
}

export interface Video {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface Certifications {
  id: number
  results: Certification[]
}

export interface Certification {
  iso_3166_1: string
  release_dates: CertificationData[]
}

export interface CertificationData {
  certification: string
  descriptors: string[]
  iso_639_1: string
  note: string
  release_date: string
  type: number
}

export interface Watch {
  id: number
  results: Record<string, WatchResults>
}

export interface WatchResults {
  link: string
  rent?: WatchData[]
  flatrate?: WatchData[]
  buy?: WatchData[]
  ads?: WatchData[]
}

export interface WatchData {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Person {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: any
  gender: number
  homepage: any
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string | null
}

export interface PersonSearch {
  adult: boolean
  gender: number
  id: number
  known_for_department?: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string | null
  known_for: KnownFor[]
}

export interface KnownFor {
  backdrop_path?: string | null
  id: number
  original_title?: string
  overview: string
  poster_path?: string | null
  media_type: string
  adult: boolean
  title?: string
  original_language: string
  genre_ids: number[]
  popularity: number
  release_date?: string
  video?: boolean
  vote_average: number
  vote_count: number
  original_name?: string
  name?: string
  first_air_date?: string
  origin_country?: string[]
}

export interface SocialMedia {
  id: number
  freebase_mid: string
  freebase_id: string
  imdb_id: string
  tvrage_id: number
  wikidata_id: string
  facebook_id: string
  instagram_id: string
  tiktok_id: string
  twitter_id: string
  youtube_id: string
}

export interface PersonCredits {
  cast: PersonCast[]
  crew: PersonCrew[]
  id: number
}

export interface PersonCast {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title?: string
  overview: string
  popularity: number
  poster_path?: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average: number
  vote_count: number
  character?: string
  credit_id: string
  order?: number
  media_type: string
  origin_country?: string[]
  original_name?: string
  first_air_date?: string
  name?: string
  episode_count?: number
  job?: string
  department?: string
}

export interface PersonCrew {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title?: string
  overview: string
  popularity: number
  poster_path?: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average: number
  vote_count: number
  credit_id: string
  department: string
  job?: string
  media_type: string
  origin_country?: string[]
  original_name?: string
  first_air_date?: string
  name?: string
  episode_count?: number
  character?: string
}

export type ListCredits = (
  | string
  | Record<
      string,
      {
        year: number
        date: string
        info: PersonCast | PersonCrew
      }[]
    >
)[]
