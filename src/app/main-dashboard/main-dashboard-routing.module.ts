import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from 'src/app/main-dashboard/pages/main-dashboard.component';


const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'browser',
              component: MainDashboardComponent
          },
          {
              path: '**',
              redirectTo: 'browser'
          }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainDashboardRoutingModule { }
