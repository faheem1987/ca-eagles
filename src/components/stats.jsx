import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Stats extends Component {
  constructor(props) {
    super(props);

    this.batters = this.batters.bind(this);

    this.state = {
      isBatsmen: true,
      isBowlers: false
    }
  }

  setActiveTab(currentVal, pastVal) {
    this.setState({
      [pastVal]: false,
      [currentVal]: true
    })
  }
  
  batters() {
    return (this.props.batters || []).map((b, index) => <li key={index}>
      <img src="http://placekitten.com/30/30" alt="cat"/>
      {b.fullname}
      </li>
    );
  }

  badge() {
    return (
      <div className="badge">
        <img src="http://placekitten.com/400/400" alt="cat"/> 
      </div>
    )
  }

  render() {
    const {isBatsmen, isBowlers} = this.state;
    return (
      <div className="stats">
        <h2>Player Stats</h2>
        <div className="player-team-stats">
          <div className="badges-wrapper">
            <h3>Most Runs</h3>
            {this.badge()}
            <ul className="player">
              {this.batters()}
            </ul>
          </div>
          <div className="badges-wrapper">
            <h3>Most Runs</h3>
            {this.badge()}
            <ul className="player">
              {this.batters()}
            </ul>
          </div>
          <div className="badges-wrapper">
            <h3>Most Runs</h3>
            {this.badge()}
            <ul className="player">
              {this.batters()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    batters: (state.firestore.ordered.battersRanking || []).slice().sort((a, b) => a.ranking - b.ranking)
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'battersRanking'
  }])
)(Stats);