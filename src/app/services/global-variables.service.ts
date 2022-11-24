import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  isVisibleSidebar = true;
  hideSidebar = false;
  hideLogin = false;
  reservationBrowserStatus: any;

  constructor() { }
}
