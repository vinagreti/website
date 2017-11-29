import { Component, Input, OnInit } from '@angular/core';
import { LocalDatabaseService } from './../../shared/services/local-database/local-database.service';

const openSourceCollectionName = 'openSource';

@Component({
  selector: 'app-open-source-card',
  templateUrl: './open-source-card.component.html',
  styleUrls: ['./open-source-card.component.scss']
})
export class OpenSourceCardComponent implements OnInit {

  editionMode: boolean;

  @Input() project: any;

  constructor(private db: LocalDatabaseService) { }

  ngOnInit() {
  }

  enableEditionMode(event, project) {
    event.preventDefault();
    event.stopPropagation();
    this.editionMode = true;
  }

  handleEdition(res) {
    console.log('handleEdition', res)
    this.editionMode = false;
  }

  delete(event, project) {
    event.preventDefault();
    event.stopPropagation();
    this.db.collection(openSourceCollectionName)
    .delete(project);
  }
}
