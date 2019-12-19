import app from 'firebase/app';
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

app.initializeApp(config);

const auth = app.auth;
const db = app.database();

const googleProvider = new app.auth.GoogleAuthProvider();

const doCreateUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);
const doSignInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);
const doSignInWithGoogle = () => auth.signInWithPopup(googleProvider);

const doSignOut = () => auth.signOut();
const doPasswordReset = email => auth.sendPasswordResetEmail(email);
const doEmailVerification = () => auth.currentUser.sendEmailVerification({
  url: process.env.CONFIRMATION_EMAIL_REDIRECT,
});

const onAuthUserListener = (next, fallback) => {
  auth.onAuthStateChanged(authUser => {
    if (authUser) {
      user(authUser.uid)
        .once('value')
        .then(snapshot => {
          const dbUser = snapshot.value();

          if (!dbUser.roles) {
            dbUser.roles = [];
          }

          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            ...dbUser,
          };

          next(authUser);
        });
    } else {
      fallback();
    }
  });
}

// Users API

/**
 * Used
 * ```
 * users().on("value", (snapshot) => {
 *   do something
 * });
 * ```
 * @param {number} uid - user id
 */
const user = uid => db.ref(`users/${uid}`);
const users = () => db.ref(`users`);

// Board API
const board = bid => db.ref(`boards/${bid}`);
const boards = () => db.ref(`boards`);

// Card API
const actionItems = bid => db.ref(`action-items/${bid}`);
const wentWell = bid => db.ref(`went-well/${bid}`);
const needsImprove = bid => db.ref(`needs-improve/${bid}`);

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
  user,
  users,
  actionItems,
  wentWell,
  needsImprove,
}
