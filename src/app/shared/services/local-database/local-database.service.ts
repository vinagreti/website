import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalFirebaseService } from './../local-firebase/local-firebase.service';

@Injectable()
export class LocalDatabaseService {

  dbDriver;

  collections: Array<Collection> = [];

  constructor(private fbS: LocalFirebaseService) {
    console.log('LocalDatabaseService started');
    this.dbDriver = new FirebaseDriver(fbS);
    JsonLocalStorage.checkStorageAvailability();
  }

  collection = (key) => {
    let collection = this.collections.find(item =>  item.key === key);
    if (collection) {
      return collection;
    } else {
      collection = this.dbDriver.collection(key);
      this.collections.push(collection);
      return collection;
    }
  }
}

export class Collection {

  protected docs: Array<any> = [];
  protected _docs: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor(public key: string) {
    const inMemoryDocs = JsonLocalStorage.get(key);
    if (inMemoryDocs) {
      this.docs = JsonLocalStorage.get(key);
    } else {
      this.docs = [];
    }
  }

  documents(): Observable<Array<any>> {
    return this._docs;
  }

  create = (object): Observable<any> => {
    object['id'] = Date.now();
    this.docs.push(object);
    JsonLocalStorage.set(this.key, this.docs);
    return Observable.of(object);
  }

  delete = (object: any): Observable<any> => {
    this.docs = this.docs.map(document => document['id'] !== object['id']);
    JsonLocalStorage.set(this.key, this.docs);
    return Observable.of(object);
  }

}

class FirebaseCollection extends Collection {

  constructor(public key: string, private db) {
    super(key);
    this.subscribeToCollection();
    this.loadDocs();
  }

  create = (object): Observable<any> => {
    const operationObservable = new BehaviorSubject<any>(null);
    const objectCopy = JSON.parse(JSON.stringify(object));
    this.db.collection(this.key).add(objectCopy)
    .then((docRef) => {
      object.id = docRef.id;
      this.docs.push(object);
      this._docs.next(this.docs);
      operationObservable.next(docRef);
    })
    .catch((error) => {
      operationObservable.error(error);
    });
    return operationObservable;
  }

  delete = (object: any): Observable<any> => {
    const operationObservable = new BehaviorSubject<any>(null);
    const docRef = this.getRef(object.id);
    this.db.collection(this.key).doc(docRef.id).delete().then((res) => {
      this.docs = this.docs.filter(doc => doc.id !== object.id);
      this._docs.next(this.docs);
      operationObservable.next(true);
    });
    return operationObservable;
  }

  private getRef(id) {
    return this.db.collection(this.key).doc(id);
  }

  private loadDocs() {
    const docs = [];
    this.db.collection(this.key).get().then((posts) => {
      posts.forEach((doc) => {
        const document = doc.data();
        document.id = doc.id;
        docs.push(document);
      });
      this._docs.next(docs);
    });
  }

  private subscribeToCollection() {
    this._docs.subscribe(docs => this.docs = docs);
  }
}

export class FirebaseDriver {

  constructor(private localFirebaseService: LocalFirebaseService) {
    console.log('LocalDatabaseService FirebaseDriver started');
  }

  collection = (key) => {
    return new FirebaseCollection(key, this.localFirebaseService);
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

  get: (key) => {
    if (!key) {
      return;
    }
    const sessionValue = sessionStorage.getItem(key);
    if (sessionValue) {
      return JSON.parse(sessionValue);
    } else {
      const localValue = localStorage.getItem(key);
      if (localValue) {
        return JSON.parse(localValue);
      } else {
        return undefined;
      }
    }
  },

  set: (key, value) => {
    try {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        JsonLocalStorage.remove(key);
      }
      return true;
    } catch (e) {
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

};
