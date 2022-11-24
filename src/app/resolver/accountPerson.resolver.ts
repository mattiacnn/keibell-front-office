import {Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {
  lastValueFrom,
  forkJoin,
} from 'rxjs';
import {BackendService} from 'src/app/services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AccountPersonResolver implements Resolve<any> {

  constructor(
    private readonly backendService: BackendService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id as string;
    const accountId = route.params.accountId as string;
    if (id && accountId) {
      const request = this.backendService.getAccountPersons(accountId, id);
      const response: any = await lastValueFrom(request);
      return response;
    }
    return false;
  }


}
