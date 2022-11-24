import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInfoComponent } from './modal-info.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzIconModule} from "ng-zorro-antd/icon";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    ModalInfoComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzIconModule,
    TranslateModule
  ],
  exports: [
    ModalInfoComponent
  ]
})
export class ModalInfoModule { }
