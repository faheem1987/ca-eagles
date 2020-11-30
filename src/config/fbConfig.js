import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSwGiv06q1bcS-ErsJosotT-Lqy14qAfo",
  authDomain: "ca-eagles-b56b7.firebaseapp.com",
  databaseURL: "https://ca-eagles-b56b7.firebaseio.com",
  projectId: "ca-eagles-b56b7",
  storageBucket: "ca-eagles-b56b7.appspot.com",
  messagingSenderId: "895653083001",
  appId: "1:895653083001:web:c37a018f29f0808852e1a8",
  measurementId: "G-LYK1EGV1CE",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
