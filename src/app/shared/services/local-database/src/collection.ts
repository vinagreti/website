import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { LocalDbDriver } from './local-db.driver';
import { Document } from './document';

export class Collection {

  protected collection: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  protected docs: Array<{key: string, value: Observable<Document>}> = [];

  constructor(public collectionName: string, protected snackBar: MatSnackBar, protected localDriverOnly?) {
    this.loadDataFromLocalStorage()
    .then(this.subscribeToDocs);
  }

  documents(): Observable<Array<any>> {
    return this.collection;
  }

  document(id): Observable<any> {
    const document = this.docs.find(item => item.key === id);
    if (document) {
      return document.value;
    } else {
      const doc = new Document(this.collectionName, id);
      const newDocObs = new BehaviorSubject<Document>(doc);
      this.docs.push({key: id, value: newDocObs});
      return newDocObs;
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
      if (this.localDriverOnly) {
        LocalDbDriver.delete(this.collectionName, document);
      }
      this.snackBar.open('Deleted!', 'Close', {duration: 1e3, extraClasses: ['primary-snackbar']});
    });
  }

  create(document: any): Promise<any> {
    return new Promise<any>((res, rej) => {
      if (this.localDriverOnly) {
        LocalDbDriver.create(this.collectionName, document);
      }
      this.snackBar.open('Created!', 'Close', {duration: 1e3, extraClasses: ['primary-snackbar']});
    });
  }

  update(document: any, upsert = false): Promise<any> {
    return new Promise<any>((res, rej) => {
      if (this.localDriverOnly) {
        LocalDbDriver.update(this.collectionName, document);
      }
      this.snackBar.open('Updated!', 'Close', {duration: 1e3, extraClasses: ['primary-snackbar']});
    });
  }

  private subscribeToDocs = () => {
    this.collection.subscribe(docs => {
        LocalDbDriver.set(this.collectionName, docs);
    });
  }

  private loadDataFromLocalStorage(): Promise<any> {
    return new Promise<any>((res, rej) => {
      if (this.localDriverOnly) {
        const inMemoryDocs = LocalDbDriver.get(this.collectionName) || [];
        this.collection.next(inMemoryDocs);
        res(inMemoryDocs);
      } else {
        res();
      }
    });
  }
}
