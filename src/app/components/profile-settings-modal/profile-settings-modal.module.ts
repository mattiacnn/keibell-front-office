import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsModalComponent } from './profile-settings-modal.component';
import {TranslateModule} from "@ngx-translate/core";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ModalInfoModule} from "../../common/modal-info/modal-info.module";



@NgModule({
  declarations: [
    ProfileSettingsModalComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ModalInfoModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzSpinModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
  ],
  exports: [
    ProfileSettingsModalComponent,
  ]
})
export class ProfileSettingsModalModule { }
