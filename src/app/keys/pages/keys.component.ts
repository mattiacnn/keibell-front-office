import { Component, OnInit, EventEmitter } from '@angular/core'
import {
  IButtonsHeaders,
  TableComponent
} from 'src/app/common/table/table.component'

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {
  loading = false
  dataTable = [
    {
      name: '#FWEF3',
    }
  ]
  headersTable = [
    {
      name: 'ACCOUNT.BROWSER.TABLE.NAME_TH',
      variable: 'name'
    }
  ]
  buttonsTableEventEmitter = new EventEmitter()
  buttonsHeaderTab: IButtonsHeaders[] = [
    {
      type: 'createItem',
      nzTypeIcon: 'plus-square',
      cssClass: 'e-primary',
      eventEmitter: this.buttonsTableEventEmitter
    },
    {
      type: 'deleteItemsSelected',
      nzTypeIcon: 'delete',
      cssClass: 'e-danger',
      eventEmitter: this.buttonsTableEventEmitter,
      needCheckItem: true
    }
  ]

  constructor () {}

  onClickItem (item) {
    console.log(item)
  }

  modifyItemEvent () {}

  createItemEvent () {}

  updatePaginationEvent (event) {}

  ngOnInit (): void {}
}
