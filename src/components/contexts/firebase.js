import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

firebase.initializeApp(config)

const auth = firebase.auth()
const db = firebase.database()
const googleProvider = new firebase.auth.GoogleAuthProvider()

// Users API
const doCreateUserWithEmailAndPassword = (email, password, username, fname, lname, setError) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      const { uid } = authUser.user
      const displayName = `${fname} ${lname}`
      const role = 'USER'
      return db.ref(`users/${authUser.user.uid}`).set({
        uid,
        email,
        username,
        fname,
        lname,
        displayName,
        role,
      })
    })
    .catch(err => {
      const { code, message } = err
      setError(message)
      console.error(`Error ${code} -- ${message}`)
    })
}
const doSignInWithEmailAndPassword = (email, password, setError) => {
  auth.signInWithEmailAndPassword(email, password)
    .catch((err) => {
      const errCode = err.code
      const errMessage = err.message
      setError(errMessage)
      console.error(`Error ${errCode} -- ${errMessage}`)
    })
}

const doSignInWithGoogle = () => auth.signInWithPopup(googleProvider)
const doSignOut = () => auth.signOut()
const doPasswordReset = email => auth.sendPasswordResetEmail(email)
const doEmailVerification = () => auth.currentUser.sendEmailVerification({
  url: process.env.CONFIRMATION_EMAIL_REDIRECT,
})
const onUpdateProfile = (user, displayName) => user.updateProfile({
  displayName,
})
const users = () => db.ref('users')

// Board API
const board = bid => db.ref(`boards/${bid}`)
const boards = () => db.ref('boards')

// Card API
const actionItems = bid => db.ref(`action-items/${bid}`)
const wentWell = bid => db.ref(`went-well/${bid}`)
const needsImprove = bid => db.ref(`needs-improve/${bid}`)
const updateCard = (boardType, bid, cid) => db.ref(`${boardType}/${bid}/${cid}`)
const addCard = (boardType, bid) => db.ref(`${boardType}/${bid}`)

// Team API
const team = tid => db.ref(`teams/${tid}`)
const teams = () => db.ref('teams')

export {
  auth,
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignOut,
  doPasswordReset,
  doEmailVerification,
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
