import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import ReactPlayer from 'react-player/youtube'

const Videos = (props) => {
  const URL = (props.videos && props.videos[0].URL) || [];
  return (
    <section>
      <h2>Latest Video</h2>
      <div className="videos-wrapper">
      { URL.map( (u, i) => 
        <ReactPlayer
          className="video"
          key={i} 
          url={u} 
          controls={true} 
          width={"370px"}
          height={"260px"}
        /> ) }
    </div>
    </section>
    
  )
}


const mapStateToProps = state => {
  return {
    videos: state.firestore.ordered.videos
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'videos'
  }])
)(Videos);