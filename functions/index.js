// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions =require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin =require('firebase-admin');

const LocalFirebase = require('./firebase.service');

admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  try {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    LocalFirebase
    .collection('/messages')
    .add({original: original})
    .then(snapshot => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      res.redirect(303, snapshot.ref);
    });
  } catch (err) {
    console.error('Error adding message', err)
    res.status(504).json(err);
  }
});
