import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const API_KEY = "AIzaSyCViLMLlNGLaNixHHXdzTAPuFnZU60fBAY";
const AUTH_DOMAIN = "ex-post-facto-dev.firebaseapp.com";
const DATABASE_URL = "https://ex-post-facto-dev.firebaseio.com";
const PROJECT_ID = "ex-post-facto-dev";
const STORAGE_BUCKET = "ex-post-facto-dev.appspot.com";
const MESSAGING_SENDER_ID = "29625557107";
const APP_ID = "1:29625557107:web:6323c685ba8f51ffcbca06";

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
}

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.database();

const googleProvider = new firebase.auth.GoogleAuthProvider();

// Users API
const doCreateUserWithEmailAndPassword = (email, password, setError) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      return db.ref(`users/${authUser.user.uid}`).set({
        uid: authUser.user.uid,
        email,
      });
    })
    .catch(err => {
      const { code, message } = err;
      setError(message);
      console.error(`Error ${code} -- ${message}`)
    });
}
const doSignInWithEmailAndPassword = (email, password, setError) => {
  auth.signInWithEmailAndPassword(email, password)
    .catch(err => {
      const { code, message } = err;
      setError(message);
      console.error(`Error ${code} -- ${message}`)
    });
}
const doSignInWithGoogle = () => auth.signInWithPopup(googleProvider);

const doSignOut = () => auth.signOut();
const doPasswordReset = email => auth.sendPasswordResetEmail(email);
const doEmailVerification = () => auth.currentUser.sendEmailVerification({
  url: process.env.CONFIRMATION_EMAIL_REDIRECT,
});


const user = firebase.auth().currentUser
console.log(user)
const onUpdateProfile = (displayName) => user.updateProfile({
  displayName,
})

const onAuthUserListener = () => (
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log(user.displayName)
      return user;
    } else {
      console.log('nope')
    }
  })
)
const users = () => db.ref(`users`);

// Board API
const board = bid => db.ref(`boards/${bid}`);
const boards = () => db.ref(`boards`);

// Card API
const actionItems = bid => db.ref(`action-items/${bid}`);
const wentWell = bid => db.ref(`went-well/${bid}`);
const needsImprove = bid => db.ref(`needs-improve/${bid}`);
const updateCard = (boardType, bid, cid) => db.ref(`${boardType}/${bid}/${cid}`);
const addCard = (boardType, bid) => db.ref(`${boardType}/${bid}`);

// Team API
const team = tid => db.ref(`teams/${tid}`);
const teams = () => db.ref(`teams`);

export {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignOut,
  doPasswordReset,
  doEmailVerification,
  onAuthUserListener,
  board,
  boards,
  team,
  teams,
  users,
  actionItems,
  wentWell,
  needsImprove,
  updateCard,
  addCard,
  onUpdateProfile,
}
