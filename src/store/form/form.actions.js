export const toggleVideoUploader = (isOpen=true) => ({
  type: "SHOW_VIDEO_UPLOADER",
  isOpen
})

export const uploadVideo = (url) => (dispatch, getState, {getFirebase, getFirestore}) => {
  dispatch({type: "UPLOAD_VIDEO_REQUEST"});
  const firestore = getFirestore();
  const arrayUnion = firestore.FieldValue.arrayUnion;
  const doc = firestore.doc('videos/URL');
  
  return doc.update({
    URL: arrayUnion(url)
  }).then(() => dispatch({type: "UPLOAD_VIDEO_SUCCESS"}))
    .catch(() => dispatch({type: "UPLOAD_VIDEO_FAILURE"}));
};

export const postRankings = ranking => (dispatch, getState, {getFirebase, getFirestore}) => {
  dispatch({type: "POST_RANKING_REQUEST"});
  const firestore = getFirestore();
  return firestore.collection('battersRanking')
    .add({ ...ranking, createdAt: new Date() })
    .then(response => {
      return dispatch({type: "POST_RANKING_SUCCESS", response})
    })
    .catch(err => dispatch({type: "POST_RANKING_FAILURE", err}))
}


