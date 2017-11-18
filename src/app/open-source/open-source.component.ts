import { Component, OnInit } from '@angular/core';
import { LocalDatabaseService, Collection } from './../shared/services/local-database/local-database.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-open-source',
  templateUrl: './open-source.component.html',
  styleUrls: ['./open-source.component.scss']
})
export class OpenSourceComponent implements OnInit {

  private collectionName = 'openSource';
  private collection: Collection;
  private documents: Observable<Array<any>>;

  constructor(private db: LocalDatabaseService) { }

  ngOnInit() {
    this.loadOpenSourceCollection();
    this.loadOpenSourceDocuments();
  }

  loadOpenSourceCollection() {
    this.collection = this.db.collection(this.collectionName)
  }

  loadOpenSourceDocuments() {
    this.documents = this.db.collection(this.collectionName).documents();
  }

}
