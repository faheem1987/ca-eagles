import React, { Component } from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons"
import { compose } from "redux"
import Badge from "./common/badge"

class Stats extends Component {
  constructor(props) {
    super(props)

    this.players = this.players.bind(this)
  }

  players(p) {
    return (p || []).map((b, index) => (
      <li key={index}>
        <img src="http://placekitten.com/30/30" alt="cat" />
        {b.fullname}
      </li>
    ))
  }

  render() {
    const { batters, bowlers, results } = this.props
    const inCAEaglesWinner = (w) => w === "CA eagles"
    return (
      <section className="stats">
        <h2 className="content">Player Stats</h2>
        <div className="player-team-stats-wrapper">
          <div className="player-team-stats content">
            <div className="badges-wrapper">
              <h3>Most runs</h3>
              <Badge url="http://placekitten.com/400/400" />
              <ul className="player report">{this.players(batters)}</ul>
            </div>
            <div className="badges-wrapper">
              <h3>Most wickets</h3>
              <Badge url="http://placekitten.com/400/400" />
              <ul className="player report">{this.players(bowlers)}</ul>
            </div>
            <div className="badges-wrapper">
              <div className="see-more results" onClick={() => {}}>
                See more
              </div>
              <h3>Recent results</h3>
              <Badge url="http://placekitten.com/400/400" />
              <ul className="match-result report">
                {(results || []).map((r, i) => (
                  <li key={i}>
                    <FontAwesomeIcon
                      className="f-icon"
                      icon={inCAEaglesWinner(r.winner) ? faThumbsUp : faThumbsDown}
                    />
                    <span className="winner">
                      {r.winner} won against
                      {r.looser}
                    </span>
                    <br />
                    <div className="date-url">
                      <span className="date">{r.matchDate}</span>
                      <a className="float-right" href={r.url} target="_blank">
                        Scoreboard
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  batters: (state.firestore.ordered.battersRanking || [])
    .slice()
    .sort((a, b) => a.ranking - b.ranking),
  bowlers: (state.firestore.ordered.bowlersRanking || [])
    .slice()
    .sort((a, b) => a.ranking - b.ranking),
  results: state.firestore.ordered.winter2520202021,
})

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "battersRanking",
    },
    {
      collection: "bowlersRanking",
    },
    {
      collection: "winter2520202021",
    },
  ])
)(Stats)
