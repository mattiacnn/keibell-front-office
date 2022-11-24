// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// NG ZORRO
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

// Syncfusion
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

// Components
import { TableComponent } from './table.component';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    NzTableModule,
    CommonModule,
    ButtonModule,
    NzIconModule,
    NzSelectModule,
    FormsModule,
    NzSpinModule,
    TranslateModule,
    CheckBoxModule,
  ],
  exports: [
    TableComponent,
  ]
})
export class TableModule { }
