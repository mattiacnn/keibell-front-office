import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCustomerSlideComponent } from './components/property-customer-slide/property-customer-slide.component';
import {TranslateModule} from "@ngx-translate/core";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzInputModule} from "ng-zorro-antd/input";



@NgModule({
  declarations: [
    PropertyCustomerSlideComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NzDrawerModule,
    FormsModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzInputModule,
  ],
  exports: [
    PropertyCustomerSlideComponent
  ]
})
export class PropertyCustomersModule { }
