import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { compose } from "redux";
import { classHelper as ch } from "../utils";
import Badge from "./common/badge";
import Loader from "./common/loader";

const bc = "stats";
const bw = ch(bc, "b-wrapper");

const Stats = (props) => {
  const { isLoading, batters, bowlers, results } = props;

  const players = (players, t = null) => {
    return (players || []).map((player, index) => {
      if (index <= 4) {
        return (
          <li key={index}>
            <span className="stat-name">{player.fullname}</span>
            <span>{t ? player.wickets : player.runs}</span>
          </li>
        );
      }
      return null;
    });
  };

  const getTopPlayerImageURL = (name) => {
    if ((props.players || []).length && batters.length) {
      const topPlayer = props.players.filter((p) => p.playerName === name)[0];
      return topPlayer ? topPlayer.url : "";
    }
    return null;
  };

  const r = (results = []) => {
    return results.map((r, i) => {
      return i <= 3 ? (
        <li key={i}>
          {r.winner === "CA eagles" ? (
            <FaThumbsUp className="fa-thumbs-up" />
          ) : (
            <FaThumbsDown className="fa-thumbs-down" />
          )}
          <span className={ch(bc, "w")}>
            {r.winner} {"won against "}
            {r.looser}
          </span>
          <br />
          <div className={ch(bc, "m-d")}>
            {r.matchDate}
            <a
              className="float-right"
              href={r.url}
              target="_blank"
              rel="noreferrer"
            >
              Scoreboard
            </a>
          </div>
        </li>
      ) : null;
    });
  };

  const getName = (p) => p.length && p[0].fullname;

  return (
    <section className={bc}>
      {isLoading || isLoading === undefined ? (
        <Loader
          index={3}
          className="content"
          childClass="stats-loader"
          width="100%"
          height="300px"
        />
      ) : (
        <Fragment>
          <h2 className="content">Player Stats</h2>
          <div className={ch(bc, "wrapper")}>
            <div className={`${ch(bc, "content")} content`}>
              <div className={bw}>
                <h3>Most runs</h3>
                <Badge
                  className="top-batter"
                  url={getTopPlayerImageURL(getName(batters))}
                />
                <ul className={ch(bc, "players")}>{players(batters)}</ul>
              </div>
              <div className={bw}>
                <h3>Most wickets</h3>
                <Badge
                  className="top-bowler"
                  url={getTopPlayerImageURL(getName(bowlers))}
                />
                <ul className={ch(bc, "players")}>{players(bowlers, "b")}</ul>
              </div>
              <div className={bw}>
                <h3 className="float-left">Recent results</h3>
                <Link to="/results" className={ch(bc, "see-more")}>
                  See more
                </Link>
                <ul className={ch(bc, "results")}>{r(results)}</ul>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  batters: (state.firestore.ordered.battersRanking || [])
    .slice()
    .sort((a, b) => b.runs - a.runs),
  bowlers: (state.firestore.ordered.bowlersRanking || [])
    .slice()
    .sort((a, b) => b.wickets - a.wickets),
  results: state.firestore.ordered.winter2520202021,
  players: state.firestore.ordered.playerInfo,
  isLoading:
    state.firestore.status.requesting.battersRanking ||
    state.firestore.status.requesting.bowlersRanking ||
    state.firestore.status.requesting.playerInfo,
});

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
    {
      collection: "playerInfo",
    },
  ])
)(Stats);
