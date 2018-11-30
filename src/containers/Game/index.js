import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import styled from 'styled-components'

import { loadArtistsAndSongs, selectArtistGuess, selectArtistCheck } from '../../ducks/play.duck'

const Container = styled.div`
  text-align: center
`

class Game extends React.Component {
    componentDidMount () {
        this.props.loadArtistsAndSongs(this.props)
    }
    render() {
        console.log(this.props)
        const samples = this.props.selectedSongs.map(
            thisSong => (
                <audio controls>
                    <source src={thisSong.preview_url}></source>
                    Your browser does not support the audio element
                </audio>
            )
        )
        const artistChoices = this.props.artists.map(
            thisArtist => (
                <label>
                    <input type="radio" name="choice" value={thisArtist.id} />
                    {thisArtist.name}
                    <img src={thisArtist.images[Math.floor(Math.random() * 3)].url} height="200" width="200"></img>
                </label>
                // FORMAT THIS BETTER WHEN YOU HAVE THE TIME
            )
        )

        return(
            <Container>
                <h4>GENRE: {this.props.genre}</h4>
                <div>{samples}</div>
                <form onChange={(event) => this.props.selectArtistGuess(event.target.value)}>
                    {artistChoices}
                </form>
                {/* <button onClick={this.props.selectArtistCheck(this.props.selectArtistGuess)}> */}
                <button>
                    Check Answer
                </button>
            </Container>
        )
    }
}

Game.propTypes = {
    loadArtistsAndSongs: PropTypes.func.isRequired,
    selectArtistGuess: PropTypes.func.isRequired,
    // selectArtistCheck: PropTypes.func.isRequired,
    artists: PropTypes.array,
    selectedArtist: PropTypes.object,
    selectedSongs: PropTypes.array
}

const mapStateToProps = (state) => ({
    genre: state.config.selectedGenre,
    artistCount: state.config.selectedArtistCount,
    songCount: state.config.selectedSongCount,
    artists: state.play.artists,
    selectedArtist: state.play.selectedArtist,
    selectedSongs: state.play.selectedSongs,
    selectArtistGuess: state.play.selectArtistGuess,
    selectArtistCheck: state.play.selectArtistCheck
})

const mapDispatchToProps = (dispatch) => ({
    loadArtistsAndSongs: (config) => dispatch(loadArtistsAndSongs(config)),
    selectArtistGuess: artistGuess => dispatch(selectArtistGuess(artistGuess)),
    // selectArtistCheck: artistCheck => dispatch(selectArtistGuess(artistCheck))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)