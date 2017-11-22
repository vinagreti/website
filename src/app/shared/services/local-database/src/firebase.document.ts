import { Document } from './document';

export class FirebaseDocument extends Document {

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
