import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';
import { AuthService } from './../auth/shared/auth-service/auth.service';
import { appRoutes } from './../app-routing.module';

const collectionName = 'profile';
const reservedUsernames = appRoutes.map(route => route.path);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any = {};
  user: any;

  constructor(private auth: AuthService,
              private db: LocalDatabaseService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadProfile();
  }

  private isReservedUsername(username) {
    return reservedUsernames.indexOf(username) >= 0;
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

  openSnackBar(msg) {
    this.snackBar.open(msg, 'Close', {duration: 0, extraClasses: ['warn-snackbar']});
  }

  save() {
    if (!this.profile.id) {
      this.profile.id = this.user.uid;
      this.db.collection(collectionName).create(this.profile);
    } else {
      this.db.collection(collectionName).update(this.profile);
    }
  }

/*  save() {
    if (this.isReservedUsername(this.profile.username)) {
      this.openSnackBar('This username is already taken...');
    } else {
      if (!this.profile.id) {
        this.profile.id = this.user.uid;
        this.db.collection(collectionName).create(this.profile);
      } else {
        this.db.collection(collectionName).update(this.profile);
      }
    }
  }*/

}
