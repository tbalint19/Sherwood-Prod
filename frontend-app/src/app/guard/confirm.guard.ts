import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable()
export class ConfirmGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage['auth-token'].includes('Bearer ')) {
      return true;
    }
    this.router.navigate(['confirm']);
    return false;
  }
}
