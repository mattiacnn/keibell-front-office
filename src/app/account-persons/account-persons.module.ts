// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AccountPersonSlideComponent } from './components/account-person-slide/account-person-slide.component';
import { AccountPersonModalCreateComponent } from './components/account-person-modal-create/account-person-modal-create.component';

// Ng Zorro
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';

// Syncfusion
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

// Modules
import { AccountPersonsRoutingModule } from './account-persons-routing.module';

// Translate
import { TranslateModule } from '@ngx-translate/core';
import { AccountPersonDetailComponent } from './pages/account-person-detail/account-person-detail.component';
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";


@NgModule({
  declarations: [
    AccountPersonSlideComponent,
    AccountPersonDetailComponent,
    AccountPersonModalCreateComponent,
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
    AccountPersonsRoutingModule,
    TranslateModule,
    NzFormModule,
    NzModalModule,
    NzTagModule,
    NzSelectModule,
    NzCheckboxModule,
  ],
  exports: [
    AccountPersonSlideComponent,
    AccountPersonModalCreateComponent,
  ]
})
export class AccountPersonsModule { }
