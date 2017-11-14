import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../../../auth/shared/auth-service/auth.service';
import { LocalDatabaseService } from './../../../shared/services/local-database/local-database.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ConfiguredProfileGuardService implements CanActivate {

  public profileConfigured: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private auth: AuthService, private db: LocalDatabaseService, private router: Router) {
    console.log('ConfiguredProfileGuardService started');
    this.auth.user.subscribe(user => {
      if (user && user.auth && user.uid) {
        this.db.collection('profile')
        .document(user.uid)
        .subscribe((profile) => {
          if (profile) {
            this.profileConfigured.next(this.isProfileConfigured(user, profile));
          } else {
            this.router.navigate(['profile']);
            this.profileConfigured.next(false);
          }
        });
      }
    });
  }

  canActivate() {
    return this.profileConfigured;
  }

  isProfileConfigured(user, profile) {
    if (profile.exists) {
      return true;
    } else {
      this.router.navigate(['profile']);
      return false;
    }
  }
}
