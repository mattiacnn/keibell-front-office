// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Components
import { AccountPropertySlideComponent } from './components/account-property-slide/account-property-slide.component';

// Custom Modules
import { AccountPropertiesRouting } from './account-properties-routing.module';

// NgZorro
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from "ng-zorro-antd/select";

// Syncfusion
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

// Translate
import { TranslateModule } from '@ngx-translate/core';
import { AccountPropertyModalCreateComponent } from './components/account-property-modal-create/account-property-modal-create.component';
import {AccountPropertyDetailComponent} from "./pages/account-property-detail/account-property-detail.component";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {TableModule} from "../common/table/table.module";
import {PropertyCustomersModule} from "../property-customers/property-customers.module";
import {ReservationsModule} from "../reservations/reservations.module";
import {PropertyResourcesModule} from "../property-resources/property-resources.module";

@NgModule({
  declarations: [
    AccountPropertySlideComponent,
    AccountPropertyModalCreateComponent,
    AccountPropertyDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzSpinModule,
    ButtonModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzTabsModule,
    AccountPropertiesRouting,
    TranslateModule,
    NzFormModule,
    NzModalModule,
    TableModule,
    PropertyCustomersModule,
    ReservationsModule,
    PropertyResourcesModule,
  ],
  exports: [
    AccountPropertySlideComponent,
    AccountPropertyModalCreateComponent,
  ]
})
export class AccountPropertiesModule { }
