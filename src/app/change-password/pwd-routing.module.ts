import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ActivateUserComponent} from "./pages/activate-user/activate-user.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'changePassword',
        component: ActivateUserComponent,
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class PwdRoutingModule { }
