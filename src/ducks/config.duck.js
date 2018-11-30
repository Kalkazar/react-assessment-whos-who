import { fetchGenres } from '../services/api'

export const LOAD_GENRES_BEGIN = 'cooksys/whos-who/Home/LOAD_GENRES_BEGIN'
export const LOAD_GENRES_FAILURE = 'cooksys/whos-who/Home/LOAD_GENRES_FAILURE'
export const LOAD_GENRES_DONE = 'cooksys/whos-who/Home/LOAD_GENRES_DONE'
export const LOAD_GENRES_UPDATE = 'cooksys/whos-who/Home/LOAD_GENRES_UPDATE'
export const SELECT_GENRE = 'cooksys/whos-who/Home/SELECT_GENRE'
export const SELECT_ARTIST_COUNT = 'cooksys/whos-who/Home/SELECT_ARTIST_COUNT'
export const SELECT_SONG_COUNT = 'cooksys/whos-who/Home/SELECT_SONG_COUNT'

const initialState = {
  genres: [],
  errorLoadingGenres: false,
}

export default function config (state = initialState, action) {
  switch (action.type) {
    case LOAD_GENRES_DONE:
      return {
        ...state,
        errorLoadingGenres: false,
        genres: action.payload
      }
    case LOAD_GENRES_FAILURE:
      return {
        ...state,
        errorLoadingGenres: true,
        genres: initialState.genres
      }
    case SELECT_GENRE:
      return {
        ...state,
        selectedGenre: action.payload
      }
    case SELECT_ARTIST_COUNT:
      return {
        ...state,
        selectedArtistCount: action.payload
      }
    case SELECT_SONG_COUNT:
      return {
        ...state,
        selectedSongCount: action.payload
      }
    default:
      return state
  }
}

export const selectArtistCount = (artistCount) => ({
  type: SELECT_ARTIST_COUNT,
  payload: artistCount
})

export const selectSongCount = (songCount) => ({
  type: SELECT_SONG_COUNT,
  payload: songCount
})

export const selectGenre = (genre) => ({
  type: SELECT_GENRE,
  payload: genre
})

const loadGenresDone = (genres) => ({
  type: LOAD_GENRES_DONE,
  payload: genres
})

const loadGenresFailure = () => ({
  type: LOAD_GENRES_FAILURE
})

export const loadGenres = () =>
  (dispatch) =>
    fetchGenres()
      .then(({ genres }) => { return dispatch(loadGenresDone(genres)) })
      .catch(err => dispatch(loadGenresFailure(err)))
