import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { compose } from "redux";
import { classHelper as ch } from "../utils";
import Badge from "./common/badge";

const bc = "stats";
const bw = ch(bc, "b-wrapper");

const Stats = (props) => {
  const players = (p, t = null) => {
    return (p || []).map((b, index) => {
      if (index <= 4) {
        return (
          <li key={index}>
            <img src="http://placekitten.com/30/30" alt="cat" />
            <span className="stat-name">{b.fullname}</span>
            <span>{t ? b.wickets : b.runs}</span>
          </li>
        );
      }
      return null;
    });
  };

  const r = (results = []) => {
    return results.map((r, i) => {
      return i <= 3 ? (
        <li key={i}>
          <FA
            className="f-icon"
            icon={r.winner === "CA eagles" ? faThumbsUp : faThumbsDown}
          />
          <span className={ch(bc, "w")}>
            {r.winner} won against
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
  const { batters, bowlers, results } = props;
  return (
    <section className={bc}>
      <h2 className="content">Player Stats</h2>
      <div className={ch(bc, "wrapper")}>
        <div className={`${ch(bc, "content")} content`}>
          <div className={bw}>
            <h3>Most runs</h3>
            <Badge url="http://placekitten.com/400/400" />
            <ul className={ch(bc, "players")}>{players(batters)}</ul>
          </div>
          <div className={bw}>
            <h3>Most wickets</h3>
            <Badge url="http://placekitten.com/400/400" />
            <ul className={ch(bc, "players")}>{players(bowlers, "b")}</ul>
          </div>
          <div className={bw}>
            <h3 className="float-left">Recent results</h3>
            <Link to="/results" className={ch(bc, "see-more")}>
              See more
            </Link>
            <Badge url="http://placekitten.com/400/400" />
            <ul className={ch(bc, "results")}>{r(results)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  batters: state.firestore.ordered.battersRanking,
  bowlers: (state.firestore.ordered.bowlersRanking || [])
    .slice()
    .sort((a, b) => a.ranking - b.ranking),
  results: state.firestore.ordered.winter2520202021,
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
  ])
)(Stats);
