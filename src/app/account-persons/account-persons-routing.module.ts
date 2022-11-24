import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { AccountPersonDetailComponent } from "./pages/account-person-detail/account-person-detail.component";

// Resolvers
import { AccountPersonResolver } from "../resolver/accountPerson.resolver";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'detail/:id',
        component: AccountPersonDetailComponent,
        resolve: {
          accountPerson: AccountPersonResolver,
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
export class AccountPersonsRoutingModule { }
