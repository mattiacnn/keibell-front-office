import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { KeysComponent } from 'src/app/keys/pages/keys.component'
import { KeysDetailComponent } from 'src/app/keys/pages/key-detail/key-detail.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'browser',
        component: KeysComponent
      },
      {
        path: 'detail',
        component: KeysDetailComponent
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
export class KeysRoutingModule {}
