// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { AccountsRoutingModule } from './accounts-routing.module';
import { TableModule } from 'src/app/common/table/table.module';
import { AccountPersonsModule } from 'src/app/account-persons/account-persons.module';
import { AccountPropertiesModule } from 'src/app/account-properties/account-properties.module';
import { AccountKiosksModule } from "../account-kioks/account-kiosks.module";

// Components
import { AccountsBrowserComponent } from './pages/accounts-browser/accounts-browser.component';
import { AccountDetailComponent } from './pages/account-detail/account-detail.component';

// Translate
import { TranslateModule } from '@ngx-translate/core';

// Ng Zorro
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

// Syncfusion
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AccountSlideComponent } from './components/account-slide/account-slide.component';
import { AccountModalCreateComponent } from './components/account-modal-create/account-modal-create.component';


@NgModule({
  declarations: [
    AccountsBrowserComponent,
    AccountDetailComponent,
    AccountSlideComponent,
    AccountModalCreateComponent,
  ],
  imports: [
    TranslateModule,
    TableModule,
    CommonModule,
    AccountsRoutingModule,
    NzSpinModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ButtonModule,
    NzTabsModule,
    NzDrawerModule,
    NzIconModule,
    NzModalModule,
    AccountPersonsModule,
    AccountPropertiesModule,
    AccountKiosksModule,
  ],
  exports: [
  ]
})
export class AccountsModule { }
