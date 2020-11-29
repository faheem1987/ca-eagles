import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Badge from './common/badge';

const Players = (props) => {
  const {playerInfo} = props;
  return (
    <div className="players-main content">
      {
        (playerInfo || []).map(({url, id}) => <Badge url={url} id={id} key={id} asLink={true}/>)
      }
    </div>
    
  )
}

const mapStateToProps = state => {
  return {
    playerInfo: state.firestore.ordered.playerInfo
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'playerInfo',
  }])
)(Players);
