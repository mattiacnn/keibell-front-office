import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountResolver } from "../resolver/account.resolver";
import { AccountDetailComponent } from "./pages/account-detail/account-detail.component";
import { AccountsBrowserComponent } from "./pages/accounts-browser/accounts-browser.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':accountId/person',
        loadChildren: () => import('src/app/account-persons/account-persons.module').then(m => m.AccountPersonsModule),
      },
      {
        path: ':accountId/property',
        loadChildren: () => import('src/app/account-properties/account-properties.module').then(m => m.AccountPropertiesModule),
      },
      {
        path: ':accountId/kiosk',
        loadChildren: () => import('src/app/account-kioks/account-kiosks-routing.module').then(m => m.AccountKiosksRoutingModule),
      },
      {
        path: 'browser',
        component: AccountsBrowserComponent
      },
      {
        path: 'detail/:id',
        component: AccountDetailComponent,
        resolve: {
          account: AccountResolver,
        }
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
export class AccountsRoutingModule { }
