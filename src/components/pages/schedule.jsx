import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { sorting } from "../../utils";

import IconImage from "../../assets/icon192x192.png";

const Schedule = (props) => {
  const getInitials = (n) =>
    `${n.split(" ")[0].charAt(0)}${(n.split(" ")[1] || "").charAt(0)}`;

  return (
    <div className="schedule-wrapper content">
      {(props.schedule || []).map((s) => (
        <div className="schedule" key={s.seq}>
          <div className="match-date">
            {s.day} <br />
            {s.date} <br />
            {s.time}
          </div>
          <div className="team-initials">
            <img src={IconImage} alt="ca eagles" />
            vs
            <span className="oponent-initial">{getInitials(s.vs)}</span>
          </div>
          <div className="oponent">
            Ca eagles V {s.vs}
            <br />
            <div className="venue">Venue: {s.venue}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  schedule: sorting(state.firestore.ordered.schedule),
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "schedule",
    },
  ])
)(Schedule);
