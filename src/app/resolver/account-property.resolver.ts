import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {lastValueFrom, Observable, of} from 'rxjs';
import {BackendService} from "../services/backend.service";

@Injectable({
  providedIn: 'root'
})
export class AccountPropertyResolver implements Resolve<boolean> {

  constructor(
    private readonly backendService: BackendService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id as string;
    const accountId = route.params.accountId as string;
    if (id && accountId) {
      const request = this.backendService.getAccountProperties(accountId, id);
      const response: any = await lastValueFrom(request);
      return response;
    }
    return false;
  }

}
