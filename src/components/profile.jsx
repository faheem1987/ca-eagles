import React, { Component } from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { compose } from "redux"
import getProfile from "../store/profile/profile.actions"

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: null,
    }
  }

  componentDidMount() {
    const { players, getProfile, match } = this.props
    if (players && players.length) {
      const { id } = match.params || {}
      getProfile(players, id)
    }
  }

  static getDerivedStateFromProps(nextProps, previousState) {
    if (nextProps.players !== previousState.players) {
      return { players: nextProps.players }
    }
    return null
  }

  componentDidUpdate(nextProps) {
    const { players, getProfile, match } = this.props
    const { id } = match.params || {}
    if (players !== nextProps.players) {
      getProfile(players, id)
    }
  }

  render() {
    const { profile } = this.props
    const { url, country, playerName, DOB } = this.props.profile || {}
    return (
      <div className="profile content">
        {!profile ? (
          <div>Loader ....</div>
        ) : (
          <div className="profile-info">
            <img src={url} />
            <div className="dob-player-style">
              <h2>{playerName}</h2>
              <div>
                <p className="border-bottom">
                  <span className="float-left">DOB</span>
                  <span className="float-right">Country</span>
                </p>
                <p>
                  <span className="float-left">{DOB}</span>
                  <span className="float-right">{country}</span>
                </p>
              </div>
              <div>
                <p className="border-bottom">
                  <span className="float-left">Batting style</span>
                  <span className="float-right">Bowling style</span>
                </p>
                <p>
                  <span className="float-left">Right Handed Bat</span>
                  <span className="float-right">Right Arm Legbreak</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  players: state.firestore.ordered.playerInfo,
  profile: state.profile.player,
  isLoading: state.firestore.status.requesting.images,
})

export default compose(
  connect(mapStateToProps, {
    getProfile,
  }),
  firestoreConnect([
    {
      collection: "playerInfo",
    },
  ])
)(Profile)
