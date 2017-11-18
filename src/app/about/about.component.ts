import { Component, OnInit } from '@angular/core';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';
import { environment } from './../../environments/environment';

const profileCollectionName = 'profile';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  profile: any = {};
  user: any;

  constructor(private db: LocalDatabaseService,) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.db.collection(profileCollectionName)
    .document(environment.USER_DOCUMENT_ID)
    .subscribe((profile) => {
      if (profile && profile.id) {
        this.profile = profile;
      }
    });
  }
}
