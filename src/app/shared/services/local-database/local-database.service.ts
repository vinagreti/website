import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalFirebaseService } from './../local-firebase/local-firebase.service';

@Injectable()
export class LocalDatabaseService {

  dbDriver;

  dbScope; // when inside a user profile ex: host/'bruno'/about

  collections: Array<Collection> = [];

  constructor(private fbS: LocalFirebaseService) {
    console.log('LocalDatabaseService started');
    this.dbDriver = new FirebaseDriver(fbS);
    JsonLocalStorage.checkStorageAvailability();
  }

  collection = (collectionName) => {
    let collection = this.collections[collectionName];
    if (collection) {
      return collection;
    } else {
      collection = this.dbDriver.collection(collectionName);
      this.collections[collectionName] = collection;
      return collection;
    }
  }
}

export class Collection {

  protected collection: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  protected docs: any = {};

  constructor(public collectionName: string) {
    this.subscribeToDocs();
    this.loadDataFromLocalStorage();
  }

  documents(): Observable<Array<any>> {
    return this.collection;
  }

  document(id): Observable<any> {
    let document = this.docs[id];
    if (document) {
      return document;
    } else {
      const document = new Document(this.collectionName, id);
      this.docs[id] = new BehaviorSubject<any>(document);
      return this.docs[id];
    }
  }

  save(document): Promise<any> {
    if (document) {
      if (document.id) {
        return this.update(document);
      } else {
        return this.create(document);
      }
    }
  }

  delete(document: any): Promise<boolean> {
    return new Promise<any>((res, rej) => {
      const docs = this.loadDataFromLocalStorage();
      const inMemmoryDoc = docs[document.id];
    });
  }

  private subscribeToDocs() {
    this.collection.subscribe(docs => {
      JsonLocalStorage.set(this.collectionName, docs);
    });
  }

  private loadDataFromLocalStorage() {
    const inMemoryDocs = JsonLocalStorage.get(this.collectionName);
    // this.collection.next(inMemoryDocs);
    return this.collection.getValue();
  }


  create(document: any): Promise<any> {
    return new Promise<any>((res, rej) => {
      document.id = document.id || Date.now();
      const docs = this.loadDataFromLocalStorage();
      docs[document.id] = document;
      res(this.collection.next(docs));
    });
  }

  update(document: any, upsert = false): Promise<any> {
    return new Promise<any>((res, rej) => {
      const docs = this.loadDataFromLocalStorage();
      const inMemmoryDoc = docs[document.id];
      if (inMemmoryDoc) {
        res(this.collection.next(docs));
      } else {
        if (upsert) {
          this.create(document).then(res, rej);
        } else {
          rej('Document does not exist. Enable upsert to insert documents when they are not found within the collection.');
        }
      }
    });
  }
}

class Document {

  value: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(public collectionName: string,
              public documentId: string) {

  }
}

class FirebaseCollection extends Collection {

  constructor(public collectionName: string, private db) {
    super(collectionName);
    this.subscribeToFirebaseCollection();
  }

  document(id): Observable<any> {
    let document = this.docs[id];
    if (document) {
      return document;
    } else {
      const document = new FirebaseDocument(this.collectionName, id, this.db);
      this.docs[id] = document.value;
      return this.docs[id];
    }
  }

  create(document): Promise<any> {
    return new Promise<any>((res, rej) => {
      let operation;
      if (document.id) {
        operation = this.db.firebaseDb.collection(this.collectionName).doc(document.id).set(document);
      } else {
        operation = this.db.firebaseDb.collection(this.collectionName).add(document);
      }

      operation.then((docRef) => {
        document.id = docRef.id;
        super.save(document);
        res(document);
      })
      .catch((error) => {
        rej(error);
      });
    });
  }

  delete(document: any): Promise<any> {
    return new Promise<any>((res, rej) => {
      const docRef = this.getRef(document.id);
      this.db.firebaseDb.collection(this.collectionName)
      .doc(docRef.id)
      .delete()
      .then((res) => {
        super.delete(document);
        res(true);
      })
      .catch((error) => {
        rej(error);
      });
    });
  }

  update(document: any): Promise<any> {
    return new Promise<any>((res, rej) => {
      this.db.firebaseDb.collection(this.collectionName)
      .doc(document.id)
      .update(document)
      .then((doc) => {
        super.update(document);
        res(document);
      })
      .catch((error) => {
        rej(error);
      });
    });
  }

  private getRef(id) {
    return this.db.firebaseDb.collection(this.collectionName).doc(id);
  }

  private subscribeToFirebaseCollection() {
    this.db.firebaseDb.collection(this.collectionName).onSnapshot((docs) => {
      const parsedDocs = [];
      docs.forEach((doc) => {
        const document = doc.data();
        document.id = doc.id;
        parsedDocs[document.id] = document;
      });
      this.collection.next(parsedDocs);
    });
  }
}

class FirebaseDocument extends Document {

  constructor(public collectionName: string,
              public documentId: string,
              private db) {
    super(collectionName, documentId);
    this.subscribeToFirebaseDocument();
  }

  private subscribeToFirebaseDocument() {
    this.db.firebaseDb
    .collection(this.collectionName)
    .doc(this.documentId).onSnapshot((document) => {
      if (document.exists) {
        this.value.next(document.data());
      }
    });
  }
}

export class FirebaseDriver {

  constructor(private localFirebaseService: LocalFirebaseService) {
    console.log('LocalDatabaseService FirebaseDriver started');
  }

  collection = (collectionName) => {
    return new FirebaseCollection(collectionName, this.localFirebaseService);
  }

}

export const JsonLocalStorage = {

  checkStorageAvailability: () => {
    let type = '';
    try {
      const testKey = '__np_storage_test__' + Date.now();
      type = 'localStorage';
      localStorage.setItem(testKey, 'work');
      localStorage.removeItem(testKey);
      type = 'sessionStorage';
      sessionStorage.setItem(testKey, 'work');
      sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.error('LocalDatabaseServiceError: Cannot find ' + type + ' on this browser.');
      return false;
    }
  },

  get: (collectionName) => {
    if (!collectionName) {
      return;
    }
    const sessionValue = sessionStorage.getItem(collectionName);
    if (sessionValue) {
      return JSON.parse(sessionValue);
    } else {
      const localValue = localStorage.getItem(collectionName);
      if (localValue) {
        return JSON.parse(localValue);
      } else {
        return undefined;
      }
    }
  },

  set: (collectionName, value) => {
    try {
      if (value) {
        localStorage.setItem(collectionName, JSON.stringify(value));
      } else {
        JsonLocalStorage.remove(collectionName);
      }
      return true;
    } catch (e) {
      return false;
    }
  },

  remove: (collectionName) => {
    try {
      localStorage.removeItem(collectionName);
      sessionStorage.removeItem(collectionName);
      return true;
    } catch (e) {
      return false;
    }
  }

};
