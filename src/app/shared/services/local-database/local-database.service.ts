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
    let collection = this.collections.find(item =>  item.collectionName === collectionName);
    if (collection) {
      return collection;
    } else {
      collection = this.dbDriver.collection(collectionName);
      this.collections.push(collection);
      return collection;
    }
  }
}

export class Collection {

  protected _docs: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor(public collectionName: string) {
    this.subscribeToDocs();
    this.loadDataFromLocalStorage();
  }

  documents(): Observable<Array<any>> {
    return this._docs;
  }

  save(document): Promise<any> {
    if (document) {
      if (document.id) {
        return this.create(document);
      } else {
        return this.update(document);
      }
    }
  }

  delete(document: any): Promise<boolean> {
    return new Promise<any>((res, rej) => {
      const docs = this.loadDataFromLocalStorage();
      const inMemmoryDoc = docs.find(_document => _document.id === document.id);
    });
  }

  private subscribeToDocs() {
    this._docs.subscribe(docs => {
      JsonLocalStorage.set(this.collectionName, docs);
    });
  }

  private loadDataFromLocalStorage() {
    const inMemoryDocs = JsonLocalStorage.get(this.collectionName);
    this._docs.next(inMemoryDocs);
    return this._docs.getValue();
  }


  create(document: any): Promise<any> {
    return new Promise<any>((res, rej) => {
      document.id = document.id || Date.now();
      const docs = this.loadDataFromLocalStorage();
      docs.push(document);
      res(this._docs.next(docs));
    });
  }

  update(document: any, upsert = false): Promise<any> {
    return new Promise<any>((res, rej) => {
      const docs = this.loadDataFromLocalStorage();
      const inMemmoryDoc = docs.find(_document => _document.id === document.id);
      if (inMemmoryDoc) {
        res(this._docs.next(docs));
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

class FirebaseCollection extends Collection {

  constructor(public collectionName: string, private db) {
    super(collectionName);
    this.loadDocs();
  }

  create(document): Promise<any> {
    return new Promise<any>((res, rej) => {
      const documentCopy = JSON.parse(JSON.stringify(document));
      this.db.firebaseDb.collection(this.collectionName).add(documentCopy)
      .then((docRef) => {
        document.id = docRef.id;
        super.save(document);
        res(docRef);
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
      const docRef = this.getRef(document.id);
      this.db.firebaseDb.collection(this.collectionName)
      .doc(docRef.id)
      .update()
      .then((res) => {
        super.update(document);
        res(true);
      })
      .catch((error) => {
        rej(error);
      });
    });
  }

  private getRef(id) {
    return this.db.firebaseDb.collection(this.collectionName).doc(id);
  }

  private loadDocs() {
    const docs = [];
    this.db.firebaseDb.collection(this.collectionName).get().then((posts) => {
      posts.forEach((doc) => {
        const document = doc.data();
        document.id = doc.id;
        docs.push(document);
      });
      this._docs.next(docs);
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
