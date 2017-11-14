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
      if (user) {
        this.db.collection('profile')
        .document(user.uid)
        .subscribe((profile) => {
          console.log('user já tem profile', profile);
          if (profile) {
            this.profileConfigured.next(this.isProfileConfigured(user, profile));
          }
        });
      }
    });
  }

  canActivate() {
    return this.profileConfigured;
  }

  isProfileConfigured(user, profile) {
    if (user.logged) {
      if (profile.exists) {
        return true;
      } else {
        this.router.navigate(['profile']);
        return false;
      }
    } else {
      return false;
    }
  }
}
