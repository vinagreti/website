import { BehaviorSubject, Observable } from 'rxjs/Rx';

export class Document {

  value: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(public collectionName: string,
              public documentId: string) {

  }
}
