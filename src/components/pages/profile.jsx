import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import getProfile from "../../store/profile/profile.actions";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: null,
    };
  }

  componentDidMount() {
    const { players, getProfile, match } = this.props;
    if (players && players.length) {
      const { id } = match.params || {};
      getProfile(players, id);
    }
  }

  static getDerivedStateFromProps(nextProps, previousState) {
    if (nextProps.players !== previousState.players) {
      return { players: nextProps.players };
    }
    return null;
  }

  componentDidUpdate(nextProps) {
    const { players, getProfile, match } = this.props;
    const { id } = match.params || {};
    if (players !== nextProps.players) {
      getProfile(players, id);
    }
  }

  render() {
    const { profile } = this.props;
    const {
      url,
      country,
      playerName,
      DOB,
      battingStyle,
      bowlingStyle,
      videoURL,
    } = this.props.profile || {};
    return (
      <div className="profile content">
        {!profile ? (
          <div>Loader ....</div>
        ) : (
          <Fragment>
            <div className="profile-info">
              <img src={url} alt="player" />
              <div className="dob-player-style">
                <h2>{playerName}</h2>
                <div>
                  <p className="border-bottom">
                    <span className="float-left">DOB</span>
                    <span className="float-right">Country</span>
                  </p>
                  <p className="p-info">
                    <span className="float-left">{DOB}</span>
                    <span className="float-right">{country}</span>
                  </p>
                </div>
                <div>
                  <p className="border-bottom">
                    <span className="float-left">Batting style</span>
                    <span className="float-right">Bowling style</span>
                  </p>
                  <p className="p-info">
                    <span className="float-left">{battingStyle}</span>
                    <span className="float-right">{bowlingStyle}</span>
                  </p>
                </div>
              </div>
              <div className="profile-icons">
                {videoURL && (
                  <a href={videoURL} target="_blank" rel="noreferrer">
                    <FaYoutube />
                  </a>
                )}
                <FaFacebook />
              </div>
            </div>
            <div className="bio">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  players: state.firestore.ordered.playerInfo,
  profile: state.profile.player,
  isLoading: state.firestore.status.requesting.images,
});

export default compose(
  connect(mapStateToProps, {
    getProfile,
  }),
  firestoreConnect([
    {
      collection: "playerInfo",
    },
  ])
)(Profile);
