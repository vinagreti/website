import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class LocalDatabaseService {

  constructor() {
    console.log('LocalDatabaseService started');
    localDatabase.checkStorageAvailability();
  }

  collection = (key) => {
    return new Collection(key);
  }

}


class Collection {

  documents = [];

  constructor(private collectionName) {
    this.documents = localDatabase.get(collectionName) || [];
  }

  push = (data) => {
    data.id = Date.now();
    this.documents.push(data);
    localDatabase.set(this.collectionName, this.documents);
    return Observable.of(data);
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
      console.error('LocalDatabaseService => Cannot find ' + type + ' on this browser.');
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
