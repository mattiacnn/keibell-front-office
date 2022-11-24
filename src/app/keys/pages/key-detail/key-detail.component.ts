import { Component, OnInit, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableComponent, IButtonsHeaders } from 'src/app/common/table/table.component';

@Component({
  selector: 'app-key-detail',
  templateUrl: './key-detail.component.html',
  styleUrls: ['./key-detail.component.css']
})
export class KeysDetailComponent implements OnInit {
  loading = false;
  key ={
    name: '#FWEF3',
  }
  formGroup: FormGroup;
  personsList: any[] = [];
  buttonsPersonsTableEventEmmiter = new EventEmitter();
  buttonsHeaderPersonsTab: IButtonsHeaders[] = [
    {
      type: 'inviteEmployee',
      nzTypeIcon: 'user-add',
      cssClass: 'e-primary',
      eventEmitter: this.buttonsPersonsTableEventEmmiter,
    },
    {
      type: 'deleteItemsSelected',
      nzTypeIcon: 'delete',
      cssClass: 'e-danger',
      eventEmitter: this.buttonsPersonsTableEventEmmiter,
      needCheckItem: true,
    }
  ];
  headersPersonsTab = [
    {
      name: 'ACCOUNT.DETAIL.PERSONS_TAB.NAME_TH',
      variable: 'name'
    }, {
      name: 'ACCOUNT.DETAIL.PERSONS_TAB.SURNAME_TH',
      variable: 'surname'
    }, {
      name: 'ACCOUNT.DETAIL.PERSONS_TAB.EMAIL_TH',
      variable: 'email'
    }
  ];

  constructor () {}

  onCancelClick (): void {}
  onAcceptClickUpdate (): void {}
  onClickPersonTable (event: any): void {}
  updatePaginationEventPersons (event: any): void {}
  ngOnInit (): void {}
}
