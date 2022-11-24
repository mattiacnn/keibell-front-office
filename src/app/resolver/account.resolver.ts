import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {
  lastValueFrom,
  forkJoin,
 } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AccountResolver implements Resolve<any> {
  constructor(
    private readonly backendService: BackendService
  ) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id as string;
    if (id) {
      const request = this.backendService.getAccounts(id);
      const response: any = await lastValueFrom(request);
      const account = response;
      if (!account) {
        return null;
      }
      account.body.id = id;
      return account;
    } else {
      const request: any = this.backendService.getAccounts();
      const response: any = await lastValueFrom(request);
      return response ? response : null;
    }
  }
}
