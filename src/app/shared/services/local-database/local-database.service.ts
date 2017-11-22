import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LocalFirebaseService } from './../local-firebase/local-firebase.service';

import { Collection } from './src/collection';
import { FirebaseDriver } from './src/firebase.driver';
import { LocalDbDriver } from './src/local-db.driver';

@Injectable()
export class LocalDatabaseService {

  collections: Array<{key: string, value: Collection}> = [];

  dbDriver;

  dbScope; // when inside a user profile ex: host/'bruno'/about


  /*
  * Avoid duplicated operations once local-db.driver observes dbDriver;
  */
  localDriverOnly;

  constructor(private fbS: LocalFirebaseService, private snackBar: MatSnackBar) {
    console.log('LocalDatabaseService started');
    this.dbDriver = new FirebaseDriver(fbS, snackBar);
    LocalDbDriver.checkStorageAvailability();
  }

  collection = (collectionName): Collection => {
    const collection = this.collections.find(item => item.key === collectionName);
    if (collection) {
      return collection.value;
    } else {
      const newCollection = this.dbDriver.collection(collectionName, this.snackBar, this.localDriverOnly);
      this.collections.push({key: '', value: newCollection});
      return newCollection;
    }
  }

  get(key) {
    return LocalDbDriver.get(key);
  }

  set(key, value) {
    return LocalDbDriver.set(key, value);
  }
}
