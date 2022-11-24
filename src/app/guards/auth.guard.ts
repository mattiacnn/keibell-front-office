import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  canActivateChild(): boolean {
    if (!this.authService.user) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
