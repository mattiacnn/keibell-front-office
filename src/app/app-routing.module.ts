import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'pwd',
    loadChildren: () => import('src/app/change-password/pwd.module').then(m => m.PwdModule),
  },
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'reservation',
        loadChildren: () => import('src/app/reservations/reservations.module').then(m => m.ReservationsModule),
      },
      {
        path: 'kiosk',
        loadChildren: () => import('src/app/kiosks/kiosk.module').then(m => m.KioskModule),
      },
      {
        path: 'account',
        loadChildren: () => import('src/app/accounts/accounts.module').then(m => m.AccountsModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('src/app/main-dashboard/main-dashboard.module').then(
            m => m.MainDashboardModule
          )
      },
      {
        path: 'keys',
        loadChildren: () => import('src/app/keys/keys.module').then(m => m.KeysModule),
      },
      {
        path: 'conversations',
        loadChildren: () =>
          import('src/app/conversations/ conversations.module').then(
            m => m.ConversationsModule
          )
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
