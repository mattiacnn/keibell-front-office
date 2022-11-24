import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysRoutingModule } from './keys-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { KeysComponent } from './pages/keys.component';
import { KeysDetailComponent } from './pages/key-detail/key-detail.component';

// Translate
import { TranslateModule } from '@ngx-translate/core';

// Modules
import { TableModule } from 'src/app/common/table/table.module';

// Ng Zorro
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzModalModule } from 'ng-zorro-antd/modal'

// Syncfusion
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'



@NgModule({
  declarations: [
    KeysComponent,
    KeysDetailComponent
  ],
  imports: [
    KeysRoutingModule,
    CommonModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzTabsModule,
    NzDrawerModule,
    NzIconModule,
    NzModalModule,
    ButtonModule,
    TableModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class KeysModule { }
