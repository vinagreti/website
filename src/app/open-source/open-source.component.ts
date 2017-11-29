import { Component, OnInit } from '@angular/core';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';
import { Collection } from './../shared/services/local-database/src/collection';
import { Observable } from 'rxjs/Observable';

const openSourceCollectionName = 'openSource';

@Component({
  selector: 'app-open-source',
  templateUrl: './open-source.component.html',
  styleUrls: ['./open-source.component.scss']
})
export class OpenSourceComponent implements OnInit {

  private collection: Collection;
  projects: Observable<Array<any>>;

  constructor(private db: LocalDatabaseService) { }

  ngOnInit() {
    this.loadOpenSourceCollection();
    this.loadOpenSourceDocuments();
  }

  loadOpenSourceCollection() {
    this.collection = this.db.collection(openSourceCollectionName);
  }

  loadOpenSourceDocuments() {
    this.projects = this.db.collection(openSourceCollectionName).documents();
  }
}
