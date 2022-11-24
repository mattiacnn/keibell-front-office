import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountKioskSlideComponent } from './components/account-kiosk-slide/account-kiosk-slide.component';
import {TranslateModule} from "@ngx-translate/core";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";
import {NzInputModule} from "ng-zorro-antd/input";
import { AccountKioskDetailComponent } from './pages/account-kiosk-detail/account-kiosk-detail.component';
import {AccountKiosksRoutingModule} from "./account-kiosks-routing.module";
import {NzFormModule} from "ng-zorro-antd/form";
import { AccountKioskModalCreateComponent } from './components/account-kiosk-modal-create/account-kiosk-modal-create.component';
import {NzModalModule} from "ng-zorro-antd/modal";



@NgModule({
  declarations: [
    AccountKioskSlideComponent,
    AccountKioskDetailComponent,
    AccountKioskModalCreateComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NzSpinModule,
    NzDrawerModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountKiosksRoutingModule,
    NzModalModule,
  ],
  exports: [
    AccountKioskSlideComponent,
    AccountKioskModalCreateComponent,
  ]
})
export class AccountKiosksModule { }
