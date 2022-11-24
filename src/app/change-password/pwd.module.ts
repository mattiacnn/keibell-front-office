import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateUserComponent } from './pages/activate-user/activate-user.component';
import {PwdRoutingModule} from "./pwd-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {ModalInfoModule} from "src/app/common/modal-info/modal-info.module";



@NgModule({
  declarations: [
    ActivateUserComponent
  ],
  imports: [
    CommonModule,
    PwdRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    ButtonModule,
    NzSpinModule,
    ModalInfoModule,
  ]
})
export class PwdModule { }
