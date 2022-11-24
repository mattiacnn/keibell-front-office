import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {
  ReservationsBrowserComponent
} from "src/app/reservations/pages/reservations-browser/reservations-browser.component";
import {AccountResolver} from "../resolver/account.resolver";
import {ReservationDetailComponent} from "./pages/reservation-detail/reservation-detail.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'browser',
        component: ReservationsBrowserComponent,
        resolve: {
          accountList: AccountResolver,
        }
      },
      {
        path: 'account/:accountId/property/:propertyId/detail/:id',
        component: ReservationDetailComponent,
      },
      {
        path: '**',
        redirectTo: 'browser'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class ReservationsRoutingModule {
}
