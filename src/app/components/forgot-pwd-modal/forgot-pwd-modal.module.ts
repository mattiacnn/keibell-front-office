import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPwdModalComponent } from './forgot-pwd-modal.component';
import {TranslateModule} from "@ngx-translate/core";
import {ModalInfoModule} from "../../common/modal-info/modal-info.module";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";



@NgModule({
  declarations: [
    ForgotPwdModalComponent
  ],
  exports: [
    ForgotPwdModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ModalInfoModule,
    NzModalModule,
    NzSpinModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class ForgotPwdModalModule { }
