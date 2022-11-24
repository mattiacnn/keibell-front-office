import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './login-modal.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";
import {ModalInfoModule} from "../../common/modal-info/modal-info.module";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {ForgotPwdModalModule} from "../forgot-pwd-modal/forgot-pwd-modal.module";



@NgModule({
  declarations: [
    LoginModalComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    ButtonModule,
    ModalInfoModule,
    NzSpinModule,
    ForgotPwdModalModule
  ],
  exports: [
    LoginModalComponent
  ]
})
export class LoginModalModule { }
