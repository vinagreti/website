import { Component, OnInit } from '@angular/core';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';
import { AuthService } from './../auth/shared/auth-service/auth.service';

const collectionName = 'profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any = {};
  user: any;

  constructor(private auth: AuthService,
              private db: LocalDatabaseService) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.auth.user.subscribe(user => {
      if (user && user.uid) {
        this.user = user;
        this.db.collection(collectionName)
        .document(user.uid)
        .subscribe((profile) => {
          if (profile && profile.id) {
            this.profile = profile;
          }
        });
      }
    });
  }

  save() {
    if (!this.profile.id) {
      this.profile.id = this.user.uid;
      this.db.collection(collectionName).create(this.profile);
    } else {
      this.db.collection(collectionName).update(this.profile);
    }
  }

}
