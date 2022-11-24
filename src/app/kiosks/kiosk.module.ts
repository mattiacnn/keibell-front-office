import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { KioskBrowserComponent } from './pages/kiosk-browser/kiosk-browser.component';
import {TranslateModule} from "@ngx-translate/core";
import {TableModule} from "../common/table/table.module";
import { KioskActivateModalComponent } from './components/kiosk-activate-modal/kiosk-activate-modal.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'browserActivation',
        component: KioskBrowserComponent
      },
      {
        path: '**',
        redirectTo: 'browser'
      }
    ]
  }
]

@NgModule({
  declarations: [
    KioskBrowserComponent,
    KioskActivateModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzInputModule,
    NzSpinModule,
    ButtonModule,
    TableModule,
    NzSelectModule,
  ],
  exports: [
    KioskActivateModalComponent,
  ],
})
export class KioskModule { }
