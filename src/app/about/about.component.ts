import { Component, OnInit } from '@angular/core';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';
import { AuthService } from './../auth/shared/auth-service/auth.service';

const profileCollectionName = 'profile';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  profile: any = {};
  user: any;

  constructor(private auth: AuthService,
              private db: LocalDatabaseService,) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.auth.user.subscribe(user => {
      if (user && user.uid) {
        this.user = user;
        this.db.collection(profileCollectionName)
        .document(user.uid)
        .subscribe((profile) => {
          if (profile && profile.id) {
            this.profile = profile;
          }
        });
      }
    });
  }
}
