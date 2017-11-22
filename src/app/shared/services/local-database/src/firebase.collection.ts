import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Collection } from './collection';
import { FirebaseDocument } from './firebase.document';

export class FirebaseCollection extends Collection {

  constructor(public collectionName: string, protected snackBar: MatSnackBar, protected db) {
    super(collectionName, snackBar);
    this.subscribeToFirebaseCollection();
  }

  document(id): Observable<any> {
    const document = this.docs.find(item => item.key === id);
    if (document) {
      return document.value;
    } else {
      const newDocument = new FirebaseDocument(this.collectionName, id, this.db);
      this.docs.push({key: id, value: newDocument.value});
      return newDocument.value;
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
      .then(() => {
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
        super.update(document, true);
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
        parsedDocs.push(document);
      });
      this.collection.next(parsedDocs);
    });
  }
}
