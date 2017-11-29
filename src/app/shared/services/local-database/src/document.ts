import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Document {

  value: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public collectionName: string,
              public documentId: string) {

  }
}
