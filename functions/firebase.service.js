const firebase = require('firebase');
const firestore = require('firebase/firestore');
const environment = require('./environment').environment;

console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', environment.firebase_config)

const LocalFirebase  = function() {

  var firebaseDb = undefined;

  const startFirebase = function() {
    firebase.initializeApp(environment.firebase_config);
    firebase.firestore().enablePersistence();
    firebaseDb = firebase.firestore();
  };

  startFirebase();

  return firebaseDb;

};

exports.LocalFirebase = LocalFirebase();
