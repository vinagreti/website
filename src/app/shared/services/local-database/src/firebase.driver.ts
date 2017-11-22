import { MatSnackBar } from '@angular/material';
import { FirebaseCollection } from './firebase.collection';
import { LocalFirebaseService } from './../../local-firebase/local-firebase.service';

export class FirebaseDriver {

  constructor(protected localFirebaseService: LocalFirebaseService, protected snackBar: MatSnackBar) {
    console.log('LocalDatabaseService FirebaseDriver started');
  }

  collection = (collectionName) => {
    return new FirebaseCollection(collectionName, this.snackBar, this.localFirebaseService);
  }

}
