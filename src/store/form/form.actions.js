import formatedDate from "../../utils";
import * as types from "./form.types";

export const uploadVideo = (url) => (dispatch, getState, { getFirestore }) => {
  dispatch({ type: types.UPLOAD_VIDEO_REQUEST });
  const firestore = getFirestore();
  const { arrayUnion } = firestore.FieldValue;
  const doc = firestore.doc("videos/URL");

  return doc
    .update({
      URL: arrayUnion(url),
    })
    .then(() => dispatch({ type: types.UPLOAD_VIDEO_SUCCESS }))
    .catch(() => dispatch({ type: types.UPLOAD_VIDEO_FAILURE }));
};

export const postRankings = (ranking, type) => (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: types.POST_RANKING_REQUEST });
  const firestore = getFirestore();
  const collectionType =
    type === "Bowler" ? "bowlersRanking" : "battersRanking";
  return firestore
    .collection(collectionType)
    .add({ ...ranking, createdAt: new Date() })
    .then(() => dispatch({ type: types.POST_RANKING_SUCCESS }))
    .catch((err) => dispatch({ type: types.POST_RANKING_FAILURE, err }));
};

export const uploadImage = (playerBio) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const { image, playerName } = playerBio;
  dispatch({ type: types.UPLOAD_IMAGE_REQUEST });
  const metadata = {
    contentType: "image/jpeg",
  };
  const firebase = getFirebase();
  const uploadTask = firebase
    .storage()
    .ref(`images/${image.name}`)
    .put(image, metadata);
  return uploadTask.on(
    "state_changed",
    (snapshot) =>
      Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
    () => dispatch({ type: types.UPLOAD_IMAGE_FAILURE }),
    () =>
      firebase
        .storage()
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          dispatch({ type: types.UPLOAD_IMAGE_SUCCESS });
          const firestore = getFirestore();
          // eslint-disable-next-line no-param-reassign
          delete playerBio.image;
          const minifiedName = playerName.split(" ").join("");
          const DOB = formatedDate(new Date(playerBio.DOB));
          return firestore
            .collection("playerInfo")
            .doc(minifiedName)
            .set({
              url,
              ...playerBio,
              DOB,
              createdAt: new Date(),
            });
        })
  );
};

export const postMatchResult = (result) => (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: types.POST_MATCH_RESULT_REQUEST });
  const firestore = getFirestore();
  const d = result.matchDate;
  const matchDate = formatedDate(d);
  // eslint-disable-next-line no-param-reassign
  delete result.matchDate;
  return firestore
    .collection("winter2520202021")
    .add({ ...result, matchDate, createdAt: new Date() })
    .then((response) =>
      dispatch({ type: types.POST_MATCH_RESULT_SUCCESS, response })
    )
    .catch((err) => dispatch({ type: types.POST_MATCH_RESULT_FAILURE, err }));
};

export const resetSuccessMessage = () => ({ type: "RESET_SUCCESS_MESSAGE" });
