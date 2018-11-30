import { fetchFromSpotify } from '../services/api'
import { chooseRandom } from '../utils/chooseRandom'

export const SELECT_ARTIST_GUESS = 'cooksys/whos-who/Game/SELECT_ARTIST_GUESS'
export const SELECT_ARTIST_CHECK = 'cooksys/whos-who/Game/SELECT_ARTIST_CHECK'
export const LOAD_ARTISTS_AND_SONGS_DONE = 'cooksys/whos-who/Game/LOAD_ARTISTS_AND_SONGS_DONE'
export const LOAD_ARTISTS_AND_SONGS_FAILURE = 'cooksys/whos-who/Game/LOAD_ARTISTS_FAILURE'

const initialState = {
  artists: [],
  selectedArtist: {},
  selectedSongs: [],
  errorLoadingArtistsAndSongs: false,
}

export default function play(state = initialState, action) {
  switch (action.type) {
    case SELECT_ARTIST_GUESS:
      console.log(action.artistGuess)
      return {
        ...state,
        artistGuess: action.artistGuess
      }
    case SELECT_ARTIST_CHECK:
      console.log(action)
      return {
        ...state,
        areTheyRight: action.artistGuess === action.selectedArtist.id
      }
    case LOAD_ARTISTS_AND_SONGS_DONE:
      console.log("IT WORKED!")
      console.log(action)
      return {
        ...state,
        errorLoadingArtistsAndSongs: false,
        artists: action.artists,
        selectedArtist: action.selectedArtist,
        selectedSongs: action.selectedSongs,
      }
    case LOAD_ARTISTS_AND_SONGS_FAILURE:
      console.log("it didn't work...")
      console.log(action)
      return {
        ...state,
        errorLoadingArtistsAndSongs: true,
        artists: initialState.artists,
        selectedArtist: initialState.selectedArtist,
        selectedSongs: initialState.selectedSongs
      }
    default:
      return state
  }
}

export const selectArtistCheck = () => ({
  type: SELECT_ARTIST_CHECK,
  areTheyRight
})

export const selectArtistGuess = (artistGuess) => ({
  type: SELECT_ARTIST_GUESS,
  artistGuess
})

const loadArtistAndSongsDone = (artists, selectedArtist, selectedSongs) => ({
  type: LOAD_ARTISTS_AND_SONGS_DONE,
  artists,
  selectedArtist,
  selectedSongs
})

const loadArtistAndSongsFailure = () => ({
  type: LOAD_ARTISTS_AND_SONGS_FAILURE
})

export const loadArtistsAndSongs = ({
  genre: genre,
  artistCount: artistCount,
  songCount: songCount
}) => dispatch => 
  fetchFromSpotify({
    endpoint: 'search',
    params: {
      q: `genre:${genre.split(' ').join('%20')}`,
      type: 'artist',
      limit: 50,
    }
  })
  .then(({ artists: items }) => {
    const artists = chooseRandom(
      items.items.map(( {id, name, images} ) => ({id, name, images})),
      artistCount
    )
    const selectedArtist = artists[Math.floor(Math.random() * artists.length)]
    fetchFromSpotify({
      endpoint: 'search',
      params: {
        q: `artist:${selectedArtist.name.split(' ').join('%20')}`,
        type: 'track',
        limit: 50,
      }
    }).then(({tracks: { items } }) => {
      const selectedSongs = chooseRandom(items.map(
        item => ({
          id: item.id,
          name: item.name,
          preview_url: item.preview_url
        })), songCount
      )
      return dispatch(loadArtistAndSongsDone(artists, selectedArtist, selectedSongs))
    })
  }).catch(err => dispatch(loadArtistAndSongsFailure(err)))