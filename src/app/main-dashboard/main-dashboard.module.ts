import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CUSTOM
import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { MainDashboardComponent } from 'src/app/main-dashboard/pages/main-dashboard.component';
import { ReservationsSlideComponent } from './components/reservations-slide/reservations-slide.component';
import { GuestComingSlideComponent } from './components/guest-coming-slide/guest-coming-slide.component';

// Synfusion
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import {
  ChartModule,
  AccumulationChartModule,
  CategoryService
} from '@syncfusion/ej2-angular-charts';

// ng-zorro
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  declarations: [
    MainDashboardComponent,
    GuestComingSlideComponent,
    ReservationsSlideComponent
  ],
  imports: [
    CommonModule,
    MainDashboardRoutingModule,
    // Syncfusion
    ChartModule,
    AccumulationChartModule,
    SwitchModule,
    // ng-zorro
    NzDrawerModule,
    NzTableModule,
    NzDividerModule,
    NzInputModule,
    NzAvatarModule,
    NzTabsModule,
    NzButtonModule,
    NzSelectModule,
    NzListModule
  ],
  providers: [
    // Syncfusion
    CategoryService
  ]
})
export class MainDashboardModule {}
