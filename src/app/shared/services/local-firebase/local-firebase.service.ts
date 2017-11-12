import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { environment } from './../../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LocalFirebaseService {

  firebaseDb;
  public authStatus: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() {
    console.log('LocalDatabaseService FirebaseDriver started');
    this.startFirebase();
  }

  private startFirebase() {
    firebase.initializeApp(environment.firebase_config);
    firebase.firestore().enablePersistence();
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
