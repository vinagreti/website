import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { LocalDatabaseService } from './../shared/services/local-database/local-database.service';
import { appRoutes } from './../app-routing.module';
import { environment } from './../../environments/environment';

const collectionName = 'profile';
const reservedUsernames = appRoutes.map(route => route.path);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any = {};

  constructor(private db: LocalDatabaseService,
              public snackBar: MatSnackBar,
              private http: Http) { }

  ngOnInit() {
    this.loadProfile();
  }

  private isReservedUsername(username) {
    return reservedUsernames.indexOf(username) >= 0;
  }

  loadProfile() {
    this.db.collection(collectionName)
    .document(environment.USER_DOCUMENT_ID)
    .subscribe((profile) => {
      if (profile && profile.id) {
        this.profile = profile;
      }
    });
  }

  openSnackBar(msg) {
    this.snackBar.open(msg, 'Close', {duration: 0, extraClasses: ['warn-snackbar']});
  }

  save() {
    if (!this.profile.id) {
      this.profile.id = environment.USER_DOCUMENT_ID;
      this.db.collection(collectionName).create(this.profile);
    } else {
      this.db.collection(collectionName).update(this.profile);
    }
  }

  test() {
    console.log('test');
    const endpoint = 'addMessage';
    this.http.get('https://us-central1-we-profile-96cff.cloudfunctions.net/addMessage')
    .subscribe((res) => {
      console.log('retorno test', res);
    }, (err) => {
      console.error('ERRO retorno test', err);
    });
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
