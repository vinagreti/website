import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { environment } from './../../../../environments/environment';

@Injectable()
export class LocalFirebaseService {

  firebaseDb;

  constructor() {
    console.log('LocalDatabaseService FirebaseDriver started');
    this.startFirebase();
  }

  private startFirebase() {
    firebase.initializeApp(environment.firebase_config);
    firebase.firestore().enablePersistence();
    this.firebaseDb = firebase.firestore();
  }

}
