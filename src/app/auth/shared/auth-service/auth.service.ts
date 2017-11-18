import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from './../../../user/user.model';
import { JsonLocalStorage } from './../../../shared/services/local-database/local-database.service';
import { LocalFirebaseService } from './../../../shared/services/local-firebase/local-firebase.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  public user: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  private _user: User = new User();
  redirectUrl: string;

  constructor(
    private router: Router,
    private localFirebase: LocalFirebaseService
  ) {
    console.log('AuthService started');
    this.subscribeToUser();
    this.subscribeToStorage();
    this.subscribeToNgFire();
  }

  private subscribeToUser() {
    this.user.subscribe((user: User) => {
      if (user) {
        if (JsonLocalStorage.set('user', user)) {
          this._user = user;
        }
      }
    });
  }

  private subscribeToNgFire() {
    this.localFirebase.authStatus.subscribe((user) => {
      this.updateUser({user});
    });
  }

  private subscribeToStorage() {
    const user = JsonLocalStorage.get('user');
    this.user.next(user);
  }

  private handleLoginError = (err) => {
    return err;
  }

  private handleLoginSuccess = (authResponse) => {
    this.updateUser(authResponse);
    this.router.navigate([this.redirectUrl ? this.redirectUrl : '/']);
  }

  private updateUser = (authResponse) => {
    const user = this._user || new User();
    user.auth = authResponse.user;
    user.logged = authResponse.user ? true : false;
    user.name = authResponse.user.displayName;
    user.picture = authResponse.user.photoURL;
    user.uid = authResponse.user.uid;
    user.date = firebase.database.ServerValue.TIMESTAMP;
    this.user.next(user);
  }

  loginGoogle = () => {
    return this.login(new firebase.auth.GoogleAuthProvider());
  }

  loginFacebook = () => {
    return this.login(new firebase.auth.FacebookAuthProvider());
  }

  loginGithub = () => {
    return this.login(new firebase.auth.GithubAuthProvider());
  }

  loginTwitter = () => {
    return this.login(new firebase.auth.TwitterAuthProvider());
  }

  private login = (provider) => {
    return firebase.auth().signInWithPopup(provider)
    .then(this.handleLoginSuccess, this.handleLoginError)
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // Do something
      console.error('Login error', error);
    });
  }

  logout = () => {
    firebase.auth().signOut()
    .then(() => {
      this.user.next(new User());
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // Do something
      console.error('Logout error', error);
    });
  }

  getUser = () => {
    return this._user.auth ? this._user : false;
  }

  isLoggedIn = () => {
    return this._user.logged ? this._user : false;
  }

  isAdmin = () => {
    return this._user.auth ? this._user : false;
  }

  isCustomer = () => {
    return this._user.auth ? this._user : false;
  }

  isDeveloper = () => {
    return this._user.auth ? this._user : false;
  }

  isStaff = () => {
    return this._user.auth ? this._user : false;
  }

  fillAuthor = (obj: any) => {
    const user = this._user;
    obj.author = {
      name: user.name,
      picture: user.auth.auth.photoURL,
      uid: user.auth.auth.uid,
      date: firebase.database.ServerValue.TIMESTAMP
    };
    return obj;
  }

}
