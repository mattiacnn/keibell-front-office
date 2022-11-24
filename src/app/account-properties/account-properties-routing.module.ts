import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

// Components
import {AccountPropertyDetailComponent} from "./pages/account-property-detail/account-property-detail.component";

// Resolvers
import {AccountPropertyResolver} from "../resolver/account-property.resolver";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'detail/:id',
        component: AccountPropertyDetailComponent,
        resolve: {
          accountProperty: AccountPropertyResolver,
        }
      },
      {
        path: ':propertyId/resource',
        loadChildren: () => import('src/app/property-resources/property-resources.module').then(m => m.PropertyResourcesModule),
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class AccountPropertiesRouting {
}
