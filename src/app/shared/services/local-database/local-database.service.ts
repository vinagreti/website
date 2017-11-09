import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class LocalDatabaseService {

  collections: Array<Collection> = [];

  constructor() {
    console.log('LocalDatabaseService started');
    localDatabase.checkStorageAvailability();
  }

  collection = (name) => {
    let collection = this.collections.find(item =>  item.name === name);
    if (collection) {
      return collection;
    } else {
      collection = new Collection(name);
      this.collections.push(collection);
      return collection;
    }
  }

}


class Collection {

  private docs: Array<any> = [];

  constructor(public name: string) {
    const inMemoryDocs = localDatabase.get(name);
    if (inMemoryDocs) {
      this.docs = localDatabase.get(name);
    } else {
      this.docs = [];
    }
  }

  documents(): Observable<Array<any>> {
    return Observable.of(this.docs);
  }

  create(object: any): Observable<any> {
    object['id'] = Date.now();
    this.docs.push(object);
    localDatabase.set(this.name, this.docs);
    return Observable.of(object);
  }

  delete(object: any): Observable<any> {
    this.docs = this.docs.map(document => document['id'] !== object['id']);
    localDatabase.set(this.name, this.docs);
    return Observable.of(object);
  }

}

const localDatabase = {

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
        localDatabase.remove(key);
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
