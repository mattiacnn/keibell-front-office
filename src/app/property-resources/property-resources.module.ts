import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyResourceDetailComponent } from './pages/property-resource-detail/property-resource-detail.component';
import {RouterModule, Routes} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import { PropertyResourcesSlideComponent } from './components/property-resources-slide/property-resources-slide.component';
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzModalModule} from "ng-zorro-antd/modal";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'detail/:id',
        component: PropertyResourceDetailComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    PropertyResourceDetailComponent,
    PropertyResourcesSlideComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    NzDrawerModule,
    NzInputModule,
    NzSpinModule,
    NzIconModule,
    NzFormModule,
    NzModalModule,
  ],
  exports: [
    PropertyResourcesSlideComponent,
  ]
})
export class PropertyResourcesModule { }
