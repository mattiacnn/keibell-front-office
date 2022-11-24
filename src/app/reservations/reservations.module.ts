import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { ReservationsRoutingModule } from './reservations-routing.module';

// Components
import { ReservationsBrowserComponent } from './pages/reservations-browser/reservations-browser.component';

// Synfusion
import { ToastAllModule } from '@syncfusion/ej2-angular-notifications';
import { DropDownButtonAllModule } from '@syncfusion/ej2-angular-splitbuttons';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule, CheckBoxAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import {NzSelectModule} from "ng-zorro-antd/select";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {ReservationSlideComponent} from "./components/reservation-slide/reservation-slide.component";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzInputModule} from "ng-zorro-antd/input";
import { ReservationScheduleComponent } from './components/reservation-schedule/reservation-schedule.component';
import { ReservationDetailComponent } from './pages/reservation-detail/reservation-detail.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzFormModule} from "ng-zorro-antd/form";
import {TableModule} from "../common/table/table.module";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzListModule} from "ng-zorro-antd/list";
import {NzAvatarModule} from "ng-zorro-antd/avatar";

@NgModule({
  declarations: [
    ReservationsBrowserComponent,
    ReservationSlideComponent,
    ReservationScheduleComponent,
    ReservationDetailComponent,
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    // Syncfusion
    ScheduleAllModule,
    RecurrenceEditorAllModule,
    ToastAllModule,
    DropDownButtonAllModule,
    TreeViewModule,
    DropDownListAllModule,
    MultiSelectAllModule,
    MaskedTextBoxModule,
    UploaderAllModule,
    ToolbarAllModule,
    ContextMenuAllModule,
    ButtonAllModule,
    CheckBoxAllModule,
    SwitchAllModule,
    DatePickerAllModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    NumericTextBoxAllModule,
    TextBoxAllModule,
    NzSelectModule,
    TranslateModule,
    FormsModule,
    NzSpinModule,
    NzDrawerModule,
    ReactiveFormsModule,
    NzInputModule,
    NzTabsModule,
    NzFormModule,
    TableModule,
    NzModalModule,
    NzSelectModule,
    NzTableModule,
    NzListModule,
    NzAvatarModule,
  ],
  exports: [
    ReservationSlideComponent,
  ]
})
export class ReservationsModule { }
