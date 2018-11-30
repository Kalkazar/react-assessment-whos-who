import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

import {
  loadGenres,
  selectGenre,
  selectArtistCount,
  selectSongCount
} from '../../ducks/config.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadGenres()
  }

  render () {
    const genres = this.props.genres.map(
      genre => (
        <option
          key={genre}
          value={genre}>{genre}
        </option>
      )
    )

    return (
      <div>
        <select onChange={(event) => this.props.selectGenre(event.target.value)}>
          <option>-- Select a Genre --</option>
          {genres}
        </select>
        <div>
          Select number of artists
          <form onChange={(event) => this.props.selectArtistCount(event.target.value)}>
            <input type="radio" name="artists" value="2" /> 2 <br/>
            <input type="radio" name="artists" value="3" /> 3 <br/>
            <input type="radio" name="artists" value="4" /> 4
          </form>
        </div>
        <div>
          Select number of samples
          <form onChange={(event) => this.props.selectSongCount(event.target.value)}>
            <input type="radio" name="songs" value="1" /> 1 <br/>
            <input type="radio" name="songs" value="2" /> 2 <br/>
            <input type="radio" name="songs" value="3" /> 3 <br/>
          </form>
        </div>
        <Link to='/game'>
          <button>Play!</button> 
          {/* Make it so this button won't work unless we've got the necessary values */}
        </Link>
      </div>
    )
  }
}

Home.propTypes = {
  loadGenres: PropTypes.func.isRequired,
  selectGenre: PropTypes.func.isRequired,
  genres: PropTypes.array,
  selectArtistCount: PropTypes.func.isRequired,
  selectSongCount: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  genres: state.config.genres
})

const mapDispatchToProps = (dispatch) => ({
  loadGenres: () => dispatch(loadGenres()),
  selectGenre: genre => dispatch(selectGenre(genre)),
  selectArtistCount: artistCount => dispatch(selectArtistCount(artistCount)),
  selectSongCount: songCount =>  dispatch(selectSongCount(songCount))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
