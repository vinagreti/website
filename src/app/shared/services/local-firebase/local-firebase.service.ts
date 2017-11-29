import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { environment } from './../../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

let FIREBASE_INITIALIZED: boolean;

@Injectable()
export class LocalFirebaseService {

  firebaseDb;
  public authStatus: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() {
    console.log('LocalDatabaseService FirebaseDriver started');
    this.startFirebase();
  }

  private startFirebase() {
/*    if (!FIREBASE_INITIALIZED) {
      console.log('FIREBASE_INITIALIZED');*/
      firebase.initializeApp(environment.firebase_config);
/*      FIREBASE_INITIALIZED = true;
    }*/
    // firebase.firestore().enablePersistence();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authStatus.next(user);
      } else {
        this.authStatus.next(false);
      }
    });
    this.firebaseDb = firebase.firestore();
  }

}
