import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {firstValueFrom, forkJoin} from "rxjs";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user;
  k_store = {};

  constructor(
    private readonly router: Router,
    private readonly backendService: BackendService,
  ) {
  }

  logout() {
    this.router.navigate(['']);
    sessionStorage.removeItem('jwt');
    this.user = null;
    this.k_store = {};
  }

  async checkLogin(): Promise<void> {
    try {
      const requestUserByToken = this.backendService.getUserByToken();
      const responseUserByToken: any = await firstValueFrom(requestUserByToken);
      this.user = responseUserByToken.body;
    } catch (e) {

    }
    await this.getProfileSettings();
  }

  async getProfileSettings(): Promise<void> {
    try {
      const requestProfileSettings = this.backendService.getKeyStore('profileSettings');
      const responseProfileSettings: any = await firstValueFrom(requestProfileSettings);
      this.k_store = {
        profileSettings: responseProfileSettings.body
      };
    } catch (e) {

    }
  }
}
