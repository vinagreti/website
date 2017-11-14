import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './../../../auth/shared/auth-service/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoggedGuardService implements CanActivate {

  public loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private auth: AuthService) {
    console.log('LoggedGuardService started');
    this.auth.user.subscribe(user => {
      if (user) {
        this.loginStatus.next(user.logged);
      }
    });
  }

  canActivate() {
    return this.loginStatus;
  }
}
