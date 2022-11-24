import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

// Components
import {AccountKioskDetailComponent} from "./pages/account-kiosk-detail/account-kiosk-detail.component";
import {AccountKioskResolver} from "../resolver/account-kiosk.resolver";

// Resolvers


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'detail/:id',
        component: AccountKioskDetailComponent,
        resolve: {
          accountKiosk: AccountKioskResolver,
        }
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class AccountKiosksRoutingModule {
}
